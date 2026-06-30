import { navigation, footer } from "@/data/site-content";

export const routes = {
  home: "/",
  whyWhiteWhale: "/why-white-whale",
  technology: "/technology",
  digitalReports: "/digital-reports",
  howItWorks: "/how-it-works",
  pricing: "/pricing",
  verifyCertification: "/verify-certification",
  dealerProgram: "/dealer-program",
  submitCards: "/submit-cards",
  login: "/login",
  sampleReport: "/sample-report",
  faq: "/faq",
  terms: "/terms",
  privacy: "/privacy",
} as const;

export { navigation, footer };
