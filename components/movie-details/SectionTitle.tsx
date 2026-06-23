import { SectionTitle as CommonSectionTitle } from "@/components/common/SectionTitle";

export function SectionTitle({ title }: { title: string }) {
  return <CommonSectionTitle title={title} size="md" underlineWidth="w-32" />;
}
