/** California EV rebate copy for the homepage Rebates modal — edit here only. */

export const rebatesModalMeta = {
  title: "California EV Rebates",
  subtitle: "Explore major EV incentives that may help lower your total cost.",
  disclaimer:
    "Incentives can change and may depend on ZIP code, utility territory, income, vehicle eligibility, and purchase date. Verify current eligibility before relying on any rebate.",
  footerNote: "Ask Evo Motors which incentives may apply to your area.",
  eligibilityUrl: "https://driveclean.ca.gov/search-incentives",
  eligibilityLabel: "Check Eligibility",
} as const;

export type RebateProgramBlock = {
  heading: string;
  lines: readonly string[];
};

export type RebateUtilitySection = {
  utilityTitle: string;
  blocks: readonly RebateProgramBlock[];
};

export const rebateUtilitySections: readonly RebateUtilitySection[] = [
  {
    utilityTitle: "PG&E",
    blocks: [
      {
        heading: "Pre-Owned EV Rebate",
        lines: [
          "$1,000 standard rebate",
          "Up to $4,000 for income-qualified customers",
          "Apply within 180 days of purchase or lease",
        ],
      },
      {
        heading: "Residential charging rebate",
        lines: [
          "Standard option may cover up to 50% of eligible charger cost",
          "Income-eligible households may qualify for up to $5,000 toward eligible charging equipment/installation",
        ],
      },
    ],
  },
  {
    utilityTitle: "Southern California Edison (SCE)",
    blocks: [
      {
        heading: "Pre-Owned EV Rebate",
        lines: [
          "$1,000 standard rebate",
          "Up to $4,000 for income-qualified customers",
          "Apply within 180 days",
        ],
      },
      {
        heading: "Charge Ready Home",
        lines: [
          "Eligible customers may receive up to $4,200 for qualifying home charging-related upgrades",
        ],
      },
    ],
  },
  {
    utilityTitle: "SDG&E",
    blocks: [
      {
        heading: "Pre-Owned EV Rebate",
        lines: [
          "$1,000 standard rebate",
          "Up to $4,000 for income-qualified customers",
          "Apply within 180 days",
        ],
      },
    ],
  },
] as const;

export const rebateCaliforniaNote = {
  title: "California note",
  lines: [
    "California’s older CVRP statewide rebate is closed to new applications.",
    "For current location-based incentives, customers should verify by ZIP code and utility.",
  ],
} as const;
