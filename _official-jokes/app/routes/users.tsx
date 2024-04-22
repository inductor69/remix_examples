// import { json } from "@remix-run/node";
// import { Link, Outlet, useLoaderData } from "@remix-run/react";
// import { db } from "~/utils/db.server";

// export const loader = async ({ request }) => {
//   const users = await db.user.findMany({
//     select: { id: true, username: true },
//     orderBy: { username: "asc" },
//   });

//   return json({ users });
// };

// export default function UsersRoute() {
//   const data = useLoaderData();

//   return (
//     <div className="centered-container">
//       <h1>Select a User</h1>
//       <ul>
//         {data.users.map((user) => (
//           <li key={user.id}>
//             <Link to={`/users/${user.id}`}>{user.username}</Link>
//           </li>
//         ))}
//       </ul>
//       <Outlet />
//     </div>
//   );
// }
