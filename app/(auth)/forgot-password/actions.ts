"use server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface ForgotPasswordPayload {
  email: string;
}

export type ActionResult =
  | { ok: true; error: null }
  | { ok: false; error: string };

export async function forgotPasswordAction(
  payload: ForgotPasswordPayload,
): Promise<ActionResult> {
  try {
    const res = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => ({}))) as { message?: string };
      return { ok: false, error: data.message ?? "Could not send reset link" };
    }

    return { ok: true, error: null };
  } catch {
    return { ok: false, error: "Network error. Please try again." };
  }
}
