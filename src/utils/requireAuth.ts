import { redirect } from "react-router-dom";

export async function requireAuth(request: Request) {
  const isLoggedIn = window.localStorage.getItem("loggedIn") === "true";

  if (!isLoggedIn) {
    const { pathname, searchParams } = new URL(request.url);
    // const searchParams = new URLSearchParams([
    //   ["redirectTo", pathname],
    //   ["message", "You must log in first"],
    // ]);
    searchParams.set("redirectTo", pathname);
    searchParams.set("message", "You must log in first");

    const res = redirect(`/login?${searchParams}`);

    // @ts-expect-error body is readonly
    res.body = true;
    throw res;
  }

  return null;
}
