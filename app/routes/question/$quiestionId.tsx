import type { Question } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/utils/db.server";

type LoaderData = { question: Question };

export const loader: LoaderFunction = async ({ request, params }) => {
	const question = await db.question.findUnique({
		where: { id: params.questionId },
	});

	if (!question) {
		throw new Response('What a question! Not found.', {
			status: 404,
		});
	}

	const data: LoaderData = { question };

	return json(data);
};


export default function QuestionRoute() {
	const data = useLoaderData<LoaderData>();
	return <div>{data.question.title}</div>;
}