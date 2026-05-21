import { fullUrl } from "@/lib/seo-config";

/** FAQ content mirrored from EV Charging page for JSON-LD. */
export const EV_CHARGING_FAQ = [
  {
    question: "Is Level 1 ‘enough’ forever?",
    answer:
      "It can be enough for low miles and long plug-in windows. Many owners still move to Level 2 for speed and peace of mind, especially in winter or with two EVs.",
  },
  {
    question: "Wall charger vs NEMA outlet?",
    answer:
      "A hardwired wall unit can look cleaner and add features (scheduling, metering). A 240V outlet plus a portable cord can be flexible if you move. Your electrician can price both.",
  },
  {
    question: "Indoor vs outdoor install?",
    answer:
      "Outdoor-rated equipment exists; weather and cable routing matter. Installers handle enclosures and code requirements every day.",
  },
  {
    question: "Will charging hurt my battery?",
    answer:
      "Modern cars manage charging carefully. Daily charging to a comfortable level (not always 100%) is normal; check your owner’s manual for the brand’s simple guidance.",
  },
  {
    question: "Why is public charging more expensive?",
    answer:
      "Stations pay for equipment, maintenance, and demand charges. You are buying convenience and speed, not the same economics as your garage.",
  },
] as const;

export function EvChargingFaqStructuredData() {
  const json = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: EV_CHARGING_FAQ.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }}
    />
  );
}
