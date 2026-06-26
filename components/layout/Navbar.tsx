"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, X } from "lucide-react";
import { toast } from "sonner";

import { BrandLogo } from "./BrandLogo";
import { Button } from "@/components/ui/button";
import { resolveAvatarUrl } from "@/lib/avatar";

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

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const publicNavItems = ["Home", "Movies", "Series"];

const navButtonClass = "border-primary text-primary bg-transparent hover:bg-primary/10";

function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return <Image src="/icons/searchland.svg" alt="" width={16} height={16} className={className} />;
}

function SearchInput() {
  const [value, setValue] = useState("");

  return (
    <label className="flex h-9 w-full items-center gap-2 rounded-md border border-white/20 bg-transparent px-3 text-sm text-white/70 shadow-inner backdrop-blur-md">
      <SearchIcon className="h-3.5 w-3.5" />
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Search"
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50"
      />
      {value ? (
        <button
          type="button"
          onClick={() => setValue("")}
          aria-label="Clear search"
          className="shrink-0 cursor-pointer text-primary"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      ) : null}
    </label>
  );
}

function PublicNav() {
  return (
    <>
      <div className="hidden min-w-0 flex-1 items-center justify-center gap-10 md:flex">
        <div className="w-full max-w-[280px]">
          <SearchInput />
        </div>

        <nav aria-label="Main navigation" className="flex items-center gap-8 text-sm">
          {publicNavItems.map((navItem) => {
            const isActive = navItem === "Home";

            return (
              <Link
                key={navItem}
                href="#"
                className={`relative pb-2 text-white/70 transition hover:text-white ${
                  isActive ? "text-white" : ""
                }`}
              >
                {navItem}
                {isActive ? (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[linear-gradient(90deg,#B6AFAF_33%,#FB9722_89%)]" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Button
          variant="outline"
          render={<Link href="#" />}
          nativeButton={false}
          className={navButtonClass}
        >
          Sign in
        </Button>
        <Button
          render={<Link href="#" />}
          nativeButton={false}
          className="bg-primary text-black hover:bg-primary/80"
        >
          Register
        </Button>
      </div>
    </>
  );
}

function AuthNav() {
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
    <div className="flex items-center gap-2 sm:gap-3">
      <Button
        variant="outline"
        size="icon-lg"
        className={`rounded-full ${navButtonClass}`}
        aria-label="Search"
      >
        <SearchIcon className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        size="icon-lg"
        className={`rounded-full ${navButtonClass}`}
        aria-label="Watchlist"
      >
        <Image src="/icons/favorite.svg" alt="" width={18} height={18} />
      </Button>
      <div className="relative h-9 w-9 overflow-hidden rounded-full border border-primary/60">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={avatar} alt="User avatar" className="h-full w-full object-cover" />
      </div>
      <Button
        variant="outline"
        onClick={handleLogout}
        loading={loggingOut}
        className={`gap-2 ${navButtonClass}`}
      >
        <LogOut size={16} />
        Logout
      </Button>
    </div>
  );
}

export function Navbar({
  variant = "public",
  position = "absolute",
}: {
  variant?: "public" | "authenticated";
  position?: "absolute" | "static";
}) {
  return (
    <header
      className={
        position === "absolute"
          ? "absolute left-0 right-0 top-0 z-30"
          : "relative z-30 border-b border-white/5"
      }
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-4 py-4 sm:px-6 lg:px-12">
        <BrandLogo />
        {variant === "public" ? <PublicNav /> : <AuthNav />}
      </div>

      {variant === "public" ? (
        <div className="mx-auto flex w-full max-w-7xl px-4 sm:px-6 md:hidden">
          <SearchInput />
        </div>
      ) : null}
    </header>
  );
}
