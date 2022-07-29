import { LiveReload, Outlet } from "@remix-run/react";

export default function App() {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <title>Magenta: Welcome to JS Quiz</title>
      </head>
      <body>
        <Outlet />
        <LiveReload />
      </body>
    </html>
  );
}