import type { LinksFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import stylesUrl from "~/styles/index.css";

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: stylesUrl }];
};

export default function IndexRoute() {
    return (
        <div className="container">
          <div className="content">
            <h1>
              JavaScript <span>Quiz</span>
            </h1>
            <nav>
              <ul>
                <li>
                  <Link to="games">Watch previous games results</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      );
}
