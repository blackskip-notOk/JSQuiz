import type { Game } from "@prisma/client"
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

type LoaderData = { game: Game };

export const loader: LoaderFunction = async ({ params }) => {
    const game = await db.game.findUnique({
        where: { id: params.gameId },
    });

    if (!game) {
        throw new Error("Game not found");
    }

    const data: LoaderData = { game }

    return json(data);
};

export default function GameRoute() {
    const data = useLoaderData<LoaderData>();
    return (
        <div>
            <p>It's one of games</p>
            <p>{data.game.content}</p>
            <Link to='.'>{data.game.name} Permalink</Link>
        </div>
    )
}