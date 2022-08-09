import { Link, Form } from '@remix-run/react';
import type { Game } from '@prisma/client';

export function GameDisplay({
	game,
	isOwner,
	canDelete = true,
}: {
	game: Pick<Game, 'content' | 'name'>;
	isOwner: boolean;
	canDelete?: boolean;
}) {
	return (
		<div>
			<p>Here's your hilarious game:</p>
			<p>{game.content}</p>
			<Link to='.'>{game.name} Permalink</Link>
			{isOwner ? (
				<Form method='post'>
					<input type='hidden' name='_method' value='delete' />
					<button type='submit' className='button' disabled={!canDelete}>
						Delete
					</button>
				</Form>
			) : null}
		</div>
	);
}
