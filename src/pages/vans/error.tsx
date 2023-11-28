import { useRouteError } from "react-router-dom";

interface ThrownError {
  message: string;
  statusCode: number;
  statusText: string;
}
export default function VansError() {
  const error = useRouteError() as ThrownError;
  return (
    <>
      <h1>Error: {error.message}</h1>
      <pre>
        {error.statusCode} - {error.statusText}
      </pre>
    </>
  );
}
