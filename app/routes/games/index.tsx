import type { Game } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

type LoaderData = { randomGame: Game };

export function ErrorBoundary() {
  return <div className="error-container">I did a whoopsies.</div>;
}

export const loader: LoaderFunction = async () => {
  const count = await db.game.count();
  const randomRowNumber = Math.floor(Math.random() * count);
  const [randomGame] = await db.game.findMany({
    take: 1,
    skip: randomRowNumber,
  });
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
