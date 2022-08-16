import type { FC } from "react"
import type { QuestionProps } from "./types"

export const Question: FC<QuestionProps> = ({ question }) => {
    return (
        <li key={question.id}>
            <div>{question.theme}</div>
            <div>{question.title}</div>
			<div>{question.content}</div>
			<input id={question.id} type='checkbox' name={question.title} value={question.id} />
		</li>
    )
}