import type { Game } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData, useParams } from "@remix-run/react";
import { db } from "~/utils/db.server";

type LoaderData = { game: Game };

export function ErrorBoundary() {
  const { gameId } = useParams();
  return (
    <div className="error-container">{`There was an error loading joke by the id ${gameId}. Sorry.`}</div>
  );
}

export const loader: LoaderFunction = async ({ params }) => {
  const game = await db.game.findUnique({
    where: { id: params.gameId },
  });

  if (!game) {
    throw new Error("Game not found");
  }

  const data: LoaderData = { game };

  return json(data);
};

export default function GameRoute() {
  const data = useLoaderData<LoaderData>();
  return (
    <div>
      <p>It's one of games</p>
      <p>{data.game.content}</p>
      <Link to=".">{data.game.name} Permalink</Link>
    </div>
  );
}
