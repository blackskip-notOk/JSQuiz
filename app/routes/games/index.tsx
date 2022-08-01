import type { Game } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useCatch, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

type LoaderData = { randomGame: Game };

export const loader: LoaderFunction = async () => {
  const count = await db.game.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomGame] = await db.game.findMany({
    take: 1,
    skip: randomRowNumber,
  });
  if (!randomGame) {
    throw new Response("No random game found", {
      status: 404,
    });
  }
  const data: LoaderData = { randomGame };
  return json(data);
};

export default function GamesIndexRoute() {
  const data = useLoaderData<LoaderData>();

  return (
    <div>
      <p>It's random Game:</p>
      <p>{data.randomGame.content}</p>
      <Link
        to={data.randomGame.id}
      >{`"${data.randomGame.name}" Permalink`}</Link>{" "}
    </div>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  if (caught.status === 404) {
    return (
      <div className="error-container">
        There are no games to display.
      </div>
    );
  }
  throw new Error(
    `Unexpected caught response with status: ${caught.status}`
  );
}

export function ErrorBoundary() {
  return <div className="error-container">I did a whoopsies.</div>;
}
