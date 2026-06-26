"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { resolveAvatarUrl } from "@/lib/avatar";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function readProfilePicture(): string | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user_data");
  if (!raw) return null;
  try {
    return (JSON.parse(raw) as { profilePicture?: string | null }).profilePicture ?? null;
  } catch {
    return null;
  }
}

export function AuthenticatedNavbar() {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [avatar, setAvatar] = useState(() => resolveAvatarUrl(readProfilePicture()));

  useEffect(() => {
    setAvatar(resolveAvatarUrl(readProfilePicture()));
  }, []);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);

    const accessToken = localStorage.getItem("access_token");

    try {
      if (accessToken) {
        await fetch(`${API_URL}/api/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
        });
      }
    } catch {
      // Even if the network call fails, still clear local state below.
    }

    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_data");

    toast.success("Logged out");
    router.replace("/signin");
  }

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b border-white/5">
      <Link href="/" className="flex items-center">
        <Image src="/icons/logo.svg" alt="HyperTube" width={100} height={40} />
      </Link>

      <div className="flex items-center gap-5">
        <button
          type="button"
          className="cursor-pointer text-primary-text hover:text-primary transition-colors"
          aria-label="Search"
        >
          <Image src="/icons/search.svg" alt="Search" width={20} height={20} />
        </button>
        <button
          type="button"
          className="cursor-pointer text-primary-text hover:text-primary transition-colors"
          aria-label="Favorite"
        >
          <Image src="/icons/favorite.svg" alt="Favorite" width={20} height={20} />
        </button>
        <button
          type="button"
          aria-label="Avatar"
          className="cursor-pointer w-9 h-9 rounded-full overflow-hidden border border-primary/60"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={avatar} alt="avatar" className="w-full h-full object-cover" />
        </button>
        <Button
          variant="outline"
          onClick={handleLogout}
          loading={loggingOut}
          className="cursor-pointer border-primary text-primary bg-transparent hover:bg-primary/10 gap-2"
        >
          <LogOut size={16} />
          Logout
        </Button>
      </div>
    </header>
  );
}
