import type { ActionFunctionArgs, LoaderFunctionArgs } from "react-router-dom";
import {
  useLoaderData,
  Form,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { login } from "../../utils/api";

export function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  return searchParams.get("message");
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    await login({ email, password });
    window.localStorage.setItem("loggedIn", "true");

    const { searchParams } = new URL(request.url);
    const response = redirect(searchParams.get("redirectTo") || "/host");
    // @ts-expect-error body is readonly
    response.body = true;

    return response;
  } catch (error) {
    const thrownError = error as Error;
    return { message: thrownError.message };
  }
}

export default function Login() {
  const message = useLoaderData() as ReturnType<typeof loader>;
  const error = useActionData() as { message: string } | undefined;
  const navigation = useNavigation();

  const isSubmitting =
    navigation.state === "loading" || navigation.state === "submitting";

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message ? <h3 className="red">{message}</h3> : null}
      {error ? <h3 className="red">{error.message}</h3> : null}
      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={isSubmitting} style={{ cursor: "pointer" }}>
          {isSubmitting ? "Logging in...." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
