import { redirect } from "react-router-dom";

export async function requireAuth() {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    const res = redirect(`/login?message=You must log in first`);

    // @ts-expect-error body is readonly
    res.body = true;
    throw res;
  }

  return null;
}
