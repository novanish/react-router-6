import { Van } from "../pages/vans";

export async function getVans() {
  const response = await fetch("/api/vans");

  if (!response.ok)
    throw {
      message: "Failed to fetch vans",
      statusCode: response.status,
      statusText: response.statusText,
    };

  const data = (await response.json()).vans as Van[];

  return data;
}
