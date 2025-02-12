import { cookies } from "next/headers";

export default async function App() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/auth/test/userinfo`,
      {
        credentials: "include",
        headers: { Cookie: (await cookies()).toString() },
      }
    );
    const data = await res.json();
    console.log(data);
  } catch (e) {
    console.error(e, "aldaa");
  }
  return <div>aaa</div>;
}
