/**
 * Public business / NAP data for footer, contact, schema, and homepage.
 * Override phone, hours, and maps via env — see .env.example.
 */

export type BusinessHoursSlot = {
  days: readonly string[];
  opens: string;
  closes: string;
};

const DEFAULT_HOURS: BusinessHoursSlot[] = [
  { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
  { days: ["Saturday"], opens: "10:00", closes: "16:00" },
];

function formatHoursDisplay(slots: BusinessHoursSlot[]): string {
  return slots
    .map((slot) => {
      const dayLabel =
        slot.days.length === 1
          ? slot.days[0]
          : slot.days.length === 5 && slot.days[0] === "Monday" && slot.days[4] === "Friday"
            ? "Mon–Fri"
            : slot.days.join(", ");
      const open = formatTime12(slot.opens);
      const close = formatTime12(slot.closes);
      return `${dayLabel} ${open}–${close}`;
    })
    .join(" · ");
}

function formatTime12(hhmm: string): string {
  const [hStr, mStr] = hhmm.split(":");
  const h = parseInt(hStr ?? "0", 10);
  const m = mStr ?? "00";
  const period = h >= 12 ? "pm" : "am";
  const h12 = h % 12 || 12;
  return m === "00" ? `${h12}${period}` : `${h12}:${m}${period}`;
}

export const PUBLIC_BUSINESS_INFO = {
  contactName: "Ronald",
  email: "ron@evomotorsinc.com",
  phone: process.env.NEXT_PUBLIC_BUSINESS_PHONE ?? "",
  phoneTel: process.env.NEXT_PUBLIC_BUSINESS_PHONE_TEL ?? "",
  addressLine1: "3575 San Pablo Dam Rd, 2nd Floor",
  cityStateZip: "El Sobrante, CA 94803",
  dealerLicenseDisplay: "CA Dealer Lic. #81921",
  googleMapsUrl: process.env.NEXT_PUBLIC_GOOGLE_MAPS_URL ?? "",
  googleBusinessProfileUrl: process.env.NEXT_PUBLIC_GBP_URL ?? "",
  geo: {
    latitude: parseFloat(process.env.NEXT_PUBLIC_GEO_LAT ?? "37.9681"),
    longitude: parseFloat(process.env.NEXT_PUBLIC_GEO_LNG ?? "-122.2952"),
  },
  hours: DEFAULT_HOURS,
  hoursDisplay:
    process.env.NEXT_PUBLIC_BUSINESS_HOURS_DISPLAY ?? formatHoursDisplay(DEFAULT_HOURS),
  inventoryEmptyHeading: "Inventory coming soon",
  inventoryEmptyBody:
    "Contact Ronald for current availability or request a specific vehicle.",
} as const;
