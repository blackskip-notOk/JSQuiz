import { LiveReload } from "@remix-run/react";

export default function App() {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <title>Magenta: Welcome to JS Quiz</title>
      </head>
      <body>
        Hello world
        <LiveReload />
      </body>
    </html>
  );
}