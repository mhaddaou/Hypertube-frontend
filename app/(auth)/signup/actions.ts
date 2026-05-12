"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface RegisterPayload {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
}

export interface RegisterResult {
  access_token: string;
  refresh_token: string;
  user_data: { id: string; username: string };
}

export type ActionResult<T> =
  | { data: T; error: null }
  | { data: null; error: string };

export async function register(
  payload: RegisterPayload
): Promise<ActionResult<RegisterResult>> {
  try {
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { data: null, error: data.message ?? "Registration failed" };
    }

    return { data, error: null };
  } catch {
    return { data: null, error: "Network error. Please try again." };
  }
}
