import Image from "next/image";
import Link from "next/link";

import { BrandLogo } from "./BrandLogo";

function GithubIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5A11.5 11.5 0 0 0 8.36 22.9c.58.11.79-.25.79-.56v-2.02c-3.2.7-3.88-1.37-3.88-1.37-.53-1.34-1.29-1.7-1.29-1.7-1.05-.72.08-.71.08-.71 1.17.08 1.78 1.2 1.78 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.25-1.28-5.25-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.04 0 0 .98-.31 3.18 1.18a10.96 10.96 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.39-5.27 5.68.42.36.79 1.08.79 2.17v3.03c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg aria-hidden="true" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.98 3.5a2.48 2.48 0 1 1 0 4.96 2.48 2.48 0 0 1 0-4.96ZM3 9.4h3.96V21H3V9.4Zm6.2 0H13v1.58h.06c.53-1 1.83-2.06 3.76-2.06 4.02 0 4.76 2.65 4.76 6.1V21h-3.96v-5.3c0-1.26-.02-2.88-1.76-2.88-1.76 0-2.03 1.37-2.03 2.79V21H9.2V9.4Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#1f2228] px-4 py-10 sm:px-6 sm:py-12 lg:px-12">
      <div className="pointer-events-none absolute -bottom-28 -left-28 h-64 w-64 rounded-full border-[28px] border-white/10" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 h-44 w-44 rounded-full border-[18px] border-white/10" />

      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-[1fr_260px] md:items-start">
          <div>
            <BrandLogo />
            <p className="mt-5 max-w-md text-sm leading-6 text-white/75">
              HyperTube brings movie discovery, watchlists, and playback into a
              focused dark streaming experience.
            </p>
          </div>

          <div className="relative mx-auto h-40 w-40 overflow-hidden rounded-full bg-black/20 md:mx-0 md:justify-self-end">
            <Image
              src="/globe.svg"
              alt="Decorative globe"
              fill
              sizes="176px"
              className="object-cover opacity-80 invert"
            />
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/90 to-transparent" />
          </div>
        </div>

        <div className="mt-10 h-px w-full bg-[#ff9f00]" />

        <div className="mt-7 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="text-sm text-white/80">Follow us</span>
            <Link href="#" aria-label="GitHub" className="text-white/80 transition hover:text-[#ff9f00]">
              <GithubIcon />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-white/80 transition hover:text-[#ff9f00]">
              <LinkedInIcon />
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="#"
              className="rounded-full border border-[#ff9f00] px-5 py-2 text-xs font-semibold text-white transition hover:-translate-y-0.5 hover:bg-white/10"
            >
              Sign in
            </Link>
            <Link
              href="#"
              className="rounded-full bg-[#ff9f00] px-5 py-2 text-xs font-bold text-black transition hover:-translate-y-0.5 hover:bg-[#ffb12a]"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
