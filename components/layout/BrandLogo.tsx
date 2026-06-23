import Link from "next/link";

export function BrandLogo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex shrink-0 items-center gap-2" aria-label="H-Tube home">
      <span className="relative grid h-6 w-8 place-items-center rounded-sm border border-white/80">
        <span className="absolute -left-1 top-1/2 h-3 w-1 -translate-y-1/2 rounded-sm bg-white/90" />
        <span className="h-3 w-4 rounded-[2px] bg-[#ff9f00]" />
        <span className="absolute inset-x-1 top-1 border-t border-dotted border-white/80" />
        <span className="absolute inset-x-1 bottom-1 border-t border-dotted border-white/80" />
      </span>
      <span className="font-serif text-2xl font-bold italic leading-none tracking-tight text-white">
        H-Tube
      </span>
    </Link>
  );
}
