import Image from "next/image";
import Link from "next/link";

export function BrandLogo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="flex shrink-0 items-center" aria-label="H-Tube home">
      <Image src="/icons/logo.svg" alt="H-Tube" width={99} height={32} priority />
    </Link>
  );
}
