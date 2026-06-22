export function SectionTitle({
  title,
  size = "lg",
  underlineWidth = "w-28",
}: {
  title: string;
  size?: "md" | "lg";
  underlineWidth?: string;
}) {
  const titleClass =
    size === "lg"
      ? "font-serif text-3xl font-bold italic text-white sm:text-4xl"
      : "font-serif text-2xl font-bold italic text-white sm:text-3xl";
  const underlineHeight = size === "lg" ? "h-1" : "h-0.5";

  return (
    <div>
      <h2 className={titleClass}>{title}</h2>
      <div className={`mt-2 ${underlineHeight} ${underlineWidth} rounded-full bg-[#ff9f00]`} />
    </div>
  );
}
