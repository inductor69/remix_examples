import type { LinksFunction, LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useState } from "react";
import { Form, Link, Outlet, useLoaderData } from "@remix-run/react";
import stylesUrl from "~/styles/jokes.css";
import { db } from "~/utils/db.server";
import { getUser } from "~/utils/session.server";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: stylesUrl },
];

export const loader = async ({ request }: LoaderArgs) => {
  const user = await getUser(request);
  const users = await db.user.findMany({
    select: { id: true, username: true },
    orderBy: { username: "asc" },
  });

  const jokes = await db.joke.findMany({
    orderBy: { createdAt: "desc" },
    select: { id: true, name: true, jokesterId: true },
    take: 5,
  });

  return json({ jokes, user, users });
};

export default function JokesRoute() {
  const data = useLoaderData<typeof loader>();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  const filteredJokes = selectedUser
    ? data.jokes.filter((joke) => joke.jokesterId === selectedUser)
    : data.jokes;

  console.log(filteredJokes, 'dataas');
  return (
    <div className="jokes-layout">
      <header className="jokes-header">
        <div className="container">
        <h1 className="home-link">
            <Link to="/" title="Remix Jokes" aria-label="Remix Jokes">
              <span className="logo">🤪</span>
              <span className="logo-medium">J🤪KES</span>
            </Link>
          </h1>
          {data.user ? (
            <div className="user-info">
              <span>{`Hi ${data.user.username}`}</span>
              <Form action="/logout" method="post">
                <button type="submit" className="button">
                  Logout
                </button>
              </Form>
            </div>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
      </header>
      <main className="jokes-main">
        <div className="container">
          <div className="jokes-list">
          <div className="user-select-wrapper">
  <label htmlFor="user-select" className="user-select-label">Select a user:</label>
  <div className="select-container">
    <select
      id="user-select"
      value={selectedUser || ""}
      onChange={(e) => setSelectedUser(e.target.value || null)}
      className="user-select"
    >
      <option value="">All users</option>
      {data.users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.username}
        </option>
      ))}
    </select>
  </div>
</div>

            <Link to=".">Get a random joke</Link>
            <p>Here are a few more jokes to check out:</p>
            <ul>
              {filteredJokes.length > 0 ? (
                filteredJokes.map(({ id, name, jokesterId }) => (
                  <li key={id}>
                    <Link prefetch="intent" to={`/jokes/${id}`}>
                      {name}
                    </Link>
                  </li>
                ))
              ) : (
                <li>No jokes found</li>
              )}
            </ul>
            <Link to="new" className="button">
              Add your own
            </Link>
          </div>
          <div className="jokes-outlet">
            <Outlet />
          </div>
        </div>
      </main>
      <footer className="jokes-footer">
        <div className="container">
          <Link reloadDocument to="/jokes.rss">
            RSS
          </Link>
        </div>
      </footer>
    </div>
  );
}