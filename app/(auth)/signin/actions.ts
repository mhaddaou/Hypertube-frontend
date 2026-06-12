"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginUserData {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  language: string;
}

export interface LoginResult {
  access_token: string;
  refresh_token: string;
  user_data: LoginUserData;
}

export type ActionResult<T> =
  | { data: T; error: null }
  | { data: null; error: string };

export async function loginAction(
  payload: LoginPayload
): Promise<ActionResult<LoginResult>> {
  try {
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      return { data: null, error: data.message ?? "Login failed" };
    }

    return { data, error: null };
  } catch {
    return { data: null, error: "Network error. Please try again." };
  }
}
