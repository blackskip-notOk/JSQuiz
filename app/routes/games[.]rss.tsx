import type { LoaderFunction } from '@remix-run/node';

import { db } from '~/utils/db.server';

function escapeCdata(s: string) {
	return s.replace(/\]\]>/g, ']]]]><![CDATA[>');
}

function escapeHtml(s: string) {
	return s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#039;');
}

export const loader: LoaderFunction = async ({ request }) => {
	const games = await db.game.findMany({
		take: 100,
		orderBy: { createdAt: 'desc' },
		include: { player: { select: { username: true } } },
	});

	const host = request.headers.get('X-Forwarded-Host') ?? request.headers.get('host');
	if (!host) {
		throw new Error('Could not determine domain URL.');
	}
	const protocol = host.includes('localhost') ? 'http' : 'https';
	const domain = `${protocol}://${host}`;
	const gamesUrl = `${domain}/games`;

	const rssString = `
    <rss xmlns:blogChannel="${gamesUrl}" version="2.0">
      <channel>
        <title>JS Quiz</title>
        <link>${gamesUrl}</link>
        <description>JavaScript Quiz game</description>
        <language>ru</language>
        <generator>Someone from Magenta-technology</generator>
        <ttl>40</ttl>
        ${games
					.map((game) =>
						`
            <item>
              <title><![CDATA[${escapeCdata(game.name)}]]></title>
              <description><![CDATA[A game called ${escapeHtml(game.name)}]]></description>
              <author><![CDATA[${escapeCdata(game.player.username)}]]></author>
              <pubDate>${game.createdAt.toUTCString()}</pubDate>
              <link>${gamesUrl}/${game.id}</link>
              <guid>${gamesUrl}/${game.id}</guid>
            </item>
          `.trim(),
					)
					.join('\n')}
      </channel>
    </rss>
  `.trim();

	return new Response(rssString, {
		headers: {
			'Cache-Control': `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
			'Content-Type': 'application/xml',
			'Content-Length': String(Buffer.byteLength(rssString)),
		},
	});
};
