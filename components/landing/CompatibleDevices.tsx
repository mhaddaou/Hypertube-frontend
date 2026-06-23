import { SectionHeading } from "./SectionHeading";

type Device = {
  title: string;
  subtitle?: string;
  icon: "tv" | "laptop" | "phone";
};

const devices: Device[] = [
  { title: "Smart TV", icon: "tv" },
  { title: "Laptop", subtitle: "Desktop Computer", icon: "laptop" },
  { title: "Tablet", subtitle: "Smartphone", icon: "phone" },
];

function DeviceIcon({ type }: { type: Device["icon"] }) {
  if (type === "tv") {
    return (
      <svg aria-hidden="true" className="h-16 w-20" viewBox="0 0 96 72" fill="none">
        <rect x="10" y="8" width="76" height="46" rx="4" stroke="currentColor" strokeWidth="4" />
        <path d="M48 54v10M34 64h28" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
    );
  }

  if (type === "laptop") {
    return (
      <svg aria-hidden="true" className="h-16 w-20" viewBox="0 0 96 72" fill="none">
        <rect x="22" y="10" width="52" height="38" rx="3" stroke="currentColor" strokeWidth="4" />
        <path d="M12 58h72l-7 6H19l-7-6Z" stroke="currentColor" strokeWidth="4" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" className="h-16 w-20" viewBox="0 0 96 72" fill="none">
      <rect x="35" y="8" width="26" height="56" rx="4" stroke="currentColor" strokeWidth="4" />
      <path d="M45 15h6M47 56h2" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function CompatibleDevices() {
  return (
    <section className="bg-[#22252b] py-14 sm:py-[4.5rem]">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-12">
        <div className="mb-8">
          <SectionHeading title="Compatible Devices" />
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
          {devices.map((device) => (
            <article
              key={device.title}
              className="flex min-h-48 flex-col items-center justify-center rounded-lg bg-black p-7 text-center text-[#ff9f00] shadow-xl shadow-black/35 transition duration-300 hover:-translate-y-1 hover:shadow-[0_0_24px_rgba(255,159,0,0.16)]"
            >
              <DeviceIcon type={device.icon} />
              <h3 className="mt-6 text-sm font-bold italic text-white">{device.title}</h3>
              {device.subtitle ? (
                <p className="mt-1 text-sm font-bold italic text-white">{device.subtitle}</p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
