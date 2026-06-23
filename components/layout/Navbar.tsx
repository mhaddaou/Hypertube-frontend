import Image from "next/image";
import Link from "next/link";

import { BrandLogo } from "./BrandLogo";

const publicNavItems = ["Home", "Movies", "Series"];

function SearchIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} fill="none" viewBox="0 0 24 24">
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-4-4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" />
    </svg>
  );
}

function BookmarkIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M6 4.8C6 3.8 6.8 3 7.8 3h8.4c1 0 1.8.8 1.8 1.8V21l-6-3.5L6 21V4.8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      />
    </svg>
  );
}

function SearchInput() {
  return (
    <label className="flex h-9 w-full items-center gap-2 rounded-md border border-white/10 bg-black/25 px-3 text-sm text-white/70 shadow-inner backdrop-blur-md">
      <SearchIcon className="h-3.5 w-3.5 text-white/60" />
      <input
        type="search"
        placeholder="Search"
        className="w-full bg-transparent text-sm text-white outline-none placeholder:text-white/50"
      />
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
                  <span className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#ff9f00]" />
                ) : null}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <Link
          href="#"
          className="rounded-full border border-white/55 bg-black/10 px-4 py-2 text-xs font-medium text-white transition hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
        >
          Sign in
        </Link>
        <Link
          href="#"
          className="rounded-full bg-[#ff9f00] px-4 py-2 text-xs font-bold text-black shadow-[0_8px_22px_rgba(255,159,0,0.28)] transition hover:-translate-y-0.5 hover:bg-[#ffb12a]"
        >
          Register
        </Link>
      </div>
    </>
  );
}

function AuthNav() {
  return (
    <div className="flex items-center gap-2 text-[#ff9f00] sm:gap-3">
      <button
        type="button"
        className="grid h-9 w-9 place-items-center rounded-full border border-[#ff9f00]/45 bg-black/25 backdrop-blur-sm transition hover:bg-[#ff9f00]/10"
        aria-label="Search"
      >
        <SearchIcon className="h-5 w-5" />
      </button>
      <button
        type="button"
        className="grid h-9 w-9 place-items-center rounded-full border border-[#ff9f00]/45 bg-black/25 backdrop-blur-sm transition hover:bg-[#ff9f00]/10"
        aria-label="Watchlist"
      >
        <BookmarkIcon />
      </button>
      <div className="relative h-9 w-9 overflow-hidden rounded-full border border-white/20">
        <Image src="/globe.svg" alt="User avatar" fill sizes="36px" className="object-cover invert" />
      </div>
      <button
        type="button"
        className="hidden rounded-md border border-[#ff9f00] bg-black/20 px-5 py-2 text-xs font-bold text-[#ff9f00] transition hover:bg-[#ff9f00] hover:text-black sm:inline-flex"
      >
        Logout
      </button>
    </div>
  );
}

export function Navbar({ variant = "public" }: { variant?: "public" | "authenticated" }) {
  return (
    <header className="absolute left-0 right-0 top-0 z-30">
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
