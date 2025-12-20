const BASE_URL = process.env.API_URL || "http://localhost:3001";
const API_KEY =  process.env.API_KEY || "";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const url = `${BASE_URL}${path}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers ?? {}),
      ...(API_KEY ? { 'x-api-key': API_KEY}: {})
    },
  });

  if (!response.ok) {
    throw new Error(`Request failed with status: ${response.status}`);
  }

  if (response.status === 204) return null;
  return response.json();
}