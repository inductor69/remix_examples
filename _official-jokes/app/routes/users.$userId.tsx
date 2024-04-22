// import { json } from "@remix-run/node";
// import { Link, useParams, useLoaderData } from "@remix-run/react";
// import { db } from "~/utils/db.server";

// export const loader = async ({ params, request }) => {
//   const userId = params.userId;
//   const page = new URL(request.url).searchParams.get("page") || "1";
//   const take = 2; // Number of jokes per page
//   const skip = (parseInt(page) - 1) * take;

//   const user = await db.user.findUnique({
//     where: { id: userId },
//     select: { username: true },
//   });

//   const totalCount = await db.joke.count({ where: { jokesterId: userId } });
//   const jokes = await db.joke.findMany({
//     where: { jokesterId: userId },
//     orderBy: { createdAt: "desc" },
//     take,
//     skip,
//   });

//   return json({ user, jokes, totalCount });
// };

// export default function UserJokesRoute() {
//   const { userId } = useParams();
//   const data = useLoaderData();
//   const isLoading = data.jokes == null;

//   return (
//     <div>
//       <div>
//         <h2>Jokes of {data.user.username}</h2>
//         {isLoading ? (
//           <p>Loading...</p>
//         ) : data.jokes.length === 0 ? (
//           <p>No jokes found.</p>
//         ) : (
//           <>
//             <ul>
//               {data.jokes.map((joke) => (
//                 <li key={joke.id}>{joke.content}</li>
//               ))}
//             </ul>
//             {/* Pagination links */}
//             {Math.ceil(data.totalCount / 2) > 1 && (
//               <div className="pagination">
//                 {Array.from({ length: Math.ceil(data.totalCount / 2) }, (_, index) => (
//                   <Link key={index} to={`/users/${userId}?page=${index + 1}`} className="page-link">
//                     {index + 1}
//                   </Link>
//                 ))}
//               </div>
//             )}
//           </>
//         )}
//         <Link to="/jokes/new" className="button">
//           Add a New Joke
//         </Link>
//       </div>
//     </div>
//   );
// }
