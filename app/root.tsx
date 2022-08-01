import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  useCatch,
} from "@remix-run/react";

import globalStylesUrl from "./styles/global.css";
import globalMediumStylesUrl from "./styles/global-medium.css";
import globalLargeStylesUrl from "./styles/global-large.css";
import type { LinksFunction, MetaFunction } from "@remix-run/node";
import type { ReactNode } from "react";

export const links: LinksFunction = () => {
  return [
    {
      rel: "stylesheet",
      href: globalStylesUrl,
    },
    {
      rel: "stylesheet",
      href: globalMediumStylesUrl,
      media: "print, (min-width: 640px)",
    },
    {
      rel: "stylesheet",
      href: globalLargeStylesUrl,
      media: "screen and (min-width: 1024px)",
    },
  ];
};

export const meta: MetaFunction = () => {
  const description = `Learn JavaScript and made a good conversation at the same time!`;
  return {
    charset: "utf-8",
    description,
    keywords: "HTML, CSS, JavaScript",
    // "twitter:image": "https://remix-jokes.lol/social.png",
    // "twitter:card": "summary_large_image",
    "twitter:creator": "@GmIlbabanov",
    "twitter:site": "@GmIlbabanov",
    "twitter:title": "JS Quiz",
    "twitter:description": description,
  };
};

function Document({
  children,
  title = "Welcome to JS Quiz!",
}: {
  children: ReactNode;
  title?: string;
}) {
  return (
    <html lang="ru">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <title>{title}</title>
        <Links />
      </head>
      <body>
        {children}
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export function CatchBoundary() {
  const caught = useCatch();

  return (
    <Document title={`${caught.status} ${caught.statusText}`}>
      <div className="error-container">
        <h1>
          {caught.status} {caught.statusText}
        </h1>
      </div>
    </Document>
  );
}

export function ErrorBoundary({ error }: { error: Error }) {
  console.error(error);

  return (
    <Document title="Uh-oh!">
      <div className="error-container">
        <h1>App Error</h1>
        <pre>{error.message}</pre>
      </div>
    </Document>
  );
}
