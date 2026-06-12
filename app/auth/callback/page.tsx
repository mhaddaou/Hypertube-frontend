"use client";

import { Suspense, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

interface OAuthUserData {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  profilePicture: string | null;
  language?: string;
}

function decodeUserData(encoded: string): OAuthUserData | null {
  try {
    const json = atob(encoded);
    return JSON.parse(json) as OAuthUserData;
  } catch {
    return null;
  }
}

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const accessToken = searchParams.get("access_token");
    const refreshToken = searchParams.get("refresh_token");
    const userDataParam = searchParams.get("user_data");

    if (!accessToken || !refreshToken || !userDataParam) {
      toast.error("Authentication failed. Missing tokens.");
      router.replace("/signin");
      return;
    }

    const userData = decodeUserData(userDataParam);
    if (!userData) {
      toast.error("Authentication failed. Invalid user data.");
      router.replace("/signin");
      return;
    }

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
    localStorage.setItem("user_data", JSON.stringify(userData));

    toast.success(`Welcome, ${userData.username}!`);
    router.replace("/");
  }, [router, searchParams]);

  return (
    <div className="flex min-h-screen items-center justify-center text-primary-text">
      <p className="text-sm">Signing you in…</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-primary-text">
          <p className="text-sm">Signing you in…</p>
        </div>
      }
    >
      <CallbackHandler />
    </Suspense>
  );
}
