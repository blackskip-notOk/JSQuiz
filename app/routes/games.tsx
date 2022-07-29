import type { LinksFunction } from "@remix-run/node";
import { Outlet, Link } from "@remix-run/react";

import stylesUrl from "~/styles/games.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};
// to='.' - refresh this page
export default function GamesRoute() {
  return (
    <div className="games-layout">
      <header className="games-header">
        <div className="container">
          <h1 className="home-link">
            <Link to="/" title="Remix games" aria-label="Remix games">
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
        </div>
      </header>
      <main className="games-main">
        <div className="container">
          <div className="games-list">
            <Link to=".">Get a random joke</Link>
            <p>Here are a few more games to check out:</p>
            <ul>
              <li>
                <Link to="some-joke-id">Hippo</Link>
              </li>
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="games-outlet">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
