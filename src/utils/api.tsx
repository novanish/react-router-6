import { Van } from "../pages/vans";

export async function getVans(id: string): Promise<Van>;
export async function getVans(id?: string): Promise<Van[]>;
export async function getVans(id?: string): Promise<Van | Van[]> {
  const url = id ? `/api/vans/${id}` : "/api/vans";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      statusCode: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}

export async function getHostVans(id: string): Promise<Van>;
export async function getHostVans(id?: string): Promise<Van[]>;
export async function getHostVans(id?: string) {
  const url = id ? `/api/host/vans/${id}` : "/api/host/vans";
  const res = await fetch(url);
  if (!res.ok) {
    throw {
      message: "Failed to fetch vans",
      statusText: res.statusText,
      status: res.status,
    };
  }
  const data = await res.json();
  return data.vans;
}

interface UserInfo {
  email: string;
  password: string;
}
export async function login(userInfo: UserInfo) {
  const response = await fetch("api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userInfo),
  });

  const data = await response.json();

  if (!response.ok) {
    throw {
      message: data.message,
      statusText: response.statusText,
      status: response.status,
    };
  }

  return data as { token: string };
}
