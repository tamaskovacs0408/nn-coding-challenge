const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${path}`;

  const response = await fetch(url, {
    method: options.method || "GET",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY || "",
    },
    body: options.body,
  })

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}