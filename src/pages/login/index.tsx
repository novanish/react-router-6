import { useState } from "react";
import {
  useLoaderData,
  type LoaderFunctionArgs,
  useNavigate,
} from "react-router-dom";
import { login } from "../../utils/api";

export function loader({ request }: LoaderFunctionArgs) {
  const { searchParams } = new URL(request.url);
  return searchParams.get("message");
}

export default function Login() {
  const message = useLoaderData() as ReturnType<typeof loader>;
  const navigate = useNavigate();
  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState<{ message: string } | null>(null);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    login(loginFormData)
      .then((data) => {
        console.log(data);
        navigate("/host", { replace: true });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setStatus("idle");
      });
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const isSubmitting = status === "submitting";

  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message ? <h3 className="red">{message}</h3> : null}
      {error ? <h3 className="red">{error.message}</h3> : null}
      <form onSubmit={handleSubmit} className="login-form">
        <input
          name="email"
          onChange={handleChange}
          type="email"
          placeholder="Email address"
          value={loginFormData.email}
        />
        <input
          name="password"
          onChange={handleChange}
          type="password"
          placeholder="Password"
          value={loginFormData.password}
        />
        <button disabled={isSubmitting}>
          {isSubmitting ? "Logging in...." : "Log in"}
        </button>
      </form>
    </div>
  );
}
