import type { Game } from "@prisma/client";
import type {
  ActionFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData, useParams } from "@remix-run/react";
import { GameDisplay } from "~/components/game";
import { db } from "~/utils/db.server";
import { getUserId, requireUserId } from "~/utils/getUser";

export const meta: MetaFunction = ({
  data,
}: {
  data: LoaderData | undefined;
}) => {
  if (!data) {
    return {
      title: "No Game",
      description: "No game found",
    };
  }
  return {
    title: `"${data.game.name}" game`,
    description: `Enjoy the "${data.game.name}" game and much more`,
  };
};

type LoaderData = { game: Game; isOwner: boolean };

export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await getUserId(request);
  const game = await db.game.findUnique({
    where: { id: params.gameId },
  });

  if (!game) {
    throw new Response("What a game! Not found.", {
      status: 404,
    });
  }

  const data: LoaderData = { game, isOwner: userId === game.playerId };

  return json(data);
};

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  if (form.get("_method") !== "delete") {
    throw new Response(`The _method ${form.get("_method")} is not supported`, {
      status: 400,
    });
  }
  const userId = await requireUserId(request);
  const game = await db.game.findUnique({
    where: { id: params.gameId },
  });
  if (!game) {
    throw new Response("Can't delete what does not exist", {
      status: 404,
    });
  }
  if (game.playerId !== userId) {
    throw new Response("Pssh, nice try. That's not your game", {
      status: 401,
    });
  }
  await db.game.delete({ where: { id: params.gameId } });
  return redirect("/games");
};

export default function GameRoute() {
  const data = useLoaderData<LoaderData>();
  return <GameDisplay game={data.game} isOwner={data.isOwner} />;
}

export function CatchBoundary() {
  const caught = useCatch();
  const params = useParams();
  switch (caught.status) {
    case 400: {
      return (
        <div className="error-container">
          What you're trying to do is not allowed.
        </div>
      );
    }
    case 404: {
      return (
        <div className="error-container">
          Huh? What the heck is {params.gameId}?
        </div>
      );
    }
    case 401: {
      return (
        <div className="error-container">
          Sorry, but {params.gameId} is not your game.
        </div>
      );
    }
    default: {
      throw new Error(`Unhandled error: ${caught.status}`);
    }
  }
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  const { gameId } = useParams();
  return (
    <div className="error-container">{`There was an error loading joke by the id ${gameId}. Sorry.`}</div>
  );
}
