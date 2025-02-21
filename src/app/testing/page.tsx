import { cookies } from "next/headers";

export default async function App() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testing`, {
    credentials: "include",
    headers: { Cookie: (await cookies()).toString() },
  });
  const data = await res.json();

  return <div>{data && <div>{data.user.email}</div>}</div>;
}
