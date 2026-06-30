/**
 * White Whale — centralized marketing copy & metadata.
 * Edit text here once; pages read from this file.
 */

export const brand = {
  name: "White Whale",
  tagline: "Consistent Grading. Transparent Results.",
  footerDescription: "Premium card grading for serious collectors.",
} as const;

export const navigation = {
  items: [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Technology", href: "/technology" },
    { label: "Digital Reports", href: "/digital-reports" },
    { label: "Verify Certification", href: "/verify-certification" },
    { label: "Dealer Program", href: "/dealer-program" },
  ],
  submitCards: { label: "Submit Cards", href: "/submit-cards" },
  login: { label: "Login", href: "/login" },
} as const;

export const footer = {
  navigation: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Pricing", href: "/pricing" },
    { label: "Technology", href: "/technology" },
    { label: "Digital Reports", href: "/digital-reports" },
    { label: "Why White Whale", href: "/why-white-whale" },
  ],
  links: [
    { label: "Dealer Program", href: "/dealer-program" },
    { label: "Verify Certification", href: "/verify-certification" },
    { label: "FAQ", href: "/faq" },
    { label: "Terms", href: "/terms" },
    { label: "Privacy", href: "/privacy" },
  ],
} as const;

export const certificationSearch = {
  label: "Certification Number",
  placeholder: "Certification Number",
  button: "Verify",
  emptyError: "Please enter a certification number.",
  notFoundTitle: "Certification not found.",
  notFoundDescription:
    "We couldn't locate a certification matching that number. Please verify the certification number and try again.",
  searchAgain: "Search again",
} as const;

export const verifyChecklist = [
  "Card Details",
  "Grade",
  "Subgrades",
  "Certification Number",
  "Grading Date",
  "Associated Images",
] as const;

export const sampleCardImages = {
  front: "/images/front.png",
  back: "/images/back.png",
  frontAlt: "Front of Victor Wembanyama Panini Prizm rookie card",
  backAlt: "Back of Victor Wembanyama Panini Prizm rookie card",
  frontLabel: "Front",
  backLabel: "Back",
} as const;

/** Rotating showcase sets for Collectors section flip cards (2 flips per set, then next) */
export const showcaseCardSets = [
  {
    id: "basketball",
    label: "Basketball",
    grade: "9.0",
    front: "/images/front.png",
    back: "/images/back.png",
    frontAlt: "Basketball card front",
    backAlt: "Basketball card back",
  },
  {
    id: "hockey",
    label: "Hockey",
    grade: "8.5",
    front: "/images/HOCKEY%20FRONT.png",
    back: "/images/HOCKEY%20BACK.png",
    frontAlt: "Hockey card front",
    backAlt: "Hockey card back",
  },
  {
    id: "football",
    label: "Football",
    grade: "9.5",
    front: "/images/football%20front.png",
    back: "/images/football%20back.png",
    frontAlt: "Football card front",
    backAlt: "Football card back",
  },
  {
    id: "baseball",
    label: "Baseball",
    grade: "10",
    front: "/images/BASEBALL%20FRONT.png",
    back: "/images/BASEBALL%20BACK.png",
    frontAlt: "Baseball card front",
    backAlt: "Baseball card back",
  },
  {
    id: "pokemon",
    label: "Pokémon",
    grade: "9.0",
    front: "/images/POKEMON%20FRONT.png",
    back: "/images/POKEMON%20BACK.png",
    frontAlt: "Pokémon card front",
    backAlt: "Pokémon card back",
  },
  {
    id: "yugioh",
    label: "Yu-Gi-Oh!",
    grade: "8.0",
    front: "/images/yu%20gi%20oh%20front.png",
    back: "/images/yu%20gi%20oh%20back%20.png",
    frontAlt: "Yu-Gi-Oh! card front",
    backAlt: "Yu-Gi-Oh! card back",
  },
  {
    id: "magic",
    label: "Magic",
    grade: "9.5",
    front: "/images/magic%20front.png",
    back: "/images/magic%20back.png",
    frontAlt: "Magic: The Gathering card front",
    backAlt: "Magic: The Gathering card back",
  },
] as const;

export type ShowcaseCardSet = (typeof showcaseCardSets)[number];

export const home = {
  meta: {
    title: "Consistent Grading. Transparent Results.",
    description:
      "Premium card grading with digital reports, certification verification, and a target 72-hour turnaround. $10 per card.",
  },
  hero: {
    titleLine1: "Consistent Grading.",
    titleLine2: "Transparent Results.",
    titleAccent: "Transparent Results.",
    description:
      "The grading company built around the problems collectors face.",
    subtext:
      "Get fast, affordable card grading with digital reports, certification verification, and a target 72-hour turnaround.",
    primaryCta: "Submit Cards",
    secondaryCta: "How It Works",
  },
  trustBullets: [
    "Consistent Grading",
    "Transparent Results",
    "72-Hour Turnaround Target",
    "$10 Per Card",
  ],
  metrics: [
    { label: "Per Card", value: "$10" },
    { label: "Turnaround", value: "72 Hr", change: "Target after receipt" },
    { label: "Reports", value: "Included", change: "Digital grading reports" },
    { label: "Verification", value: "Online", change: "Certification lookup" },
  ],
  collectorsDeserveBetter: {
    title: "Collectors Deserve Better",
    paragraphs: [
      "Card grading serves as a cornerstone of the collectibles industry. An established, trusted grade instills confidence between buyers and sellers, safeguards high-value assets, and preserves long-term market value.",
      "While essential, the traditional grading process often presents clear challenges for collectors:",
    ],
    painPoints: [
      {
        title: "Prolonged Inefficiencies",
        description: "Extended turnaround times that stall market liquidity.",
      },
      {
        title: "Opaque Practices",
        description: "Limited visibility into how final grades are determined.",
      },
      {
        title: "Ambiguous Standards",
        description: "Results that can be difficult to interpret or justify.",
      },
      {
        title: "Prohibitive Pricing",
        description:
          "High submission fees that erode profit margins and restrict accessibility.",
      },
    ],
    closing:
      "White Whale was engineered to solve these pain points. We are redefining the industry by delivering a streamlined, expedited, cost-effective, and fully transparent grading experience.",
  },
  pillars: {
    title: "The White Whale Standard",
    subtitle: "Four commitments behind every graded card.",
    items: [
      {
        title: "Consistency",
        description:
          "White Whale combines advanced imaging technology, standardized grading workflows, detailed reporting, and certification verification to help create a more consistent grading experience.",
      },
      {
        title: "Transparency",
        description:
          "Every graded card includes a digital report designed to provide greater visibility into the factors that influenced the final result.",
      },
      {
        title: "Speed",
        description:
          "Our goal is to deliver grading results within 72 hours of card receipt.",
      },
      {
        title: "Simplicity",
        description: "One service. One price.\n$10 per card.",
      },
      {
        title: "Price",
        description:
          "$10 per card. $20 per card to include subgrades.",
      },
    ],
  },
  howItWorks: {
    eyebrow: "Process",
    title: "How It Works",
    description:
      "Every card follows the same workflow from submission to certification.",
    steps: [
      {
        title: "Submit Your Cards",
        description:
          "Create an account and ship your cards to begin the grading process.",
      },
      {
        title: "Card Identification & Imaging",
        description:
          "Cards are verified, imaged, and prepared using controlled capture systems.",
      },
      {
        title: "Grading & Report Generation",
        description:
          "Each card is evaluated and receives a digital grading report.",
      },
      {
        title: "Slabbing & Return Shipment",
        description:
          "Cards are encapsulated and returned to you with certification.",
      },
    ],
    cta: "View Full Process",
  },
  moreThanGrade: {
    title: "More Than A Grade",
    intro: "Every White Whale graded card includes:",
    description:
      "Because understanding the result can be just as valuable as the result itself.",
    checklist: [
      "Final Grade",
      "Subgrades",
      "Digital Report",
      "Certification Verification",
      "High-Resolution Images",
      "Permanent Digital Record",
    ],
    cta: "View Sample Report",
  },
  finalCta: {
    title: "Ready To Grade?",
    description:
      "Whether you're submitting one card or an entire collection, White Whale is designed to make grading streamlined, faster, and more transparent.",
    button: "Submit Cards",
  },
} as const;

export const howItWorksPage = {
  meta: {
    title: "How It Works",
    description:
      "Every card follows the same workflow from submission to certification. Learn how White Whale grades your cards.",
  },
  hero: {
    title: "How It Works",
    description:
      "Every card follows the same workflow from submission to certification.",
  },
  steps: [
    {
      title: "Submit Your Cards",
      description: "Create an account and start a submission.",
    },
    {
      title: "Cards Received",
      description: "Cards are received and entered into the grading workflow.",
    },
    {
      title: "Card Identification",
      description:
        "Card information is verified by the customer and by White Whale and then prepared for processing.",
    },
    {
      title: "Imaging & Evaluation",
      description:
        "Cards are imaged and evaluated using White Whale's state of the art advanced imaging technology.",
    },
    {
      title: "Report & Certification",
      description: "Digital reports and certification records are generated.",
    },
    {
      title: "Slabbing & Return Shipment",
      description: "Cards are encapsulated and returned to the customer.",
    },
  ],
  cta: {
    title: "Start Your Submission",
    description: "Ready to grade your cards? Begin your submission in minutes.",
    button: "Start Submission",
  },
} as const;

export const pricingPage = {
  meta: {
    title: "Pricing",
    description:
      "Simple pricing at $10 per card with a target 72-hour turnaround. No premium tiers or hidden upgrades.",
  },
  hero: {
    title: "Simple Pricing",
    description:
      "One service. One price. Built for collectors who want fast, transparent grading without complicated tiers.",
  },
  price: {
    label: "Per Card",
    amount: "$10 Per Card",
    turnaround: "Target 72-Hour Turnaround",
    note: "$20 per card to include subgrades.",
  },
  included: {
    title: "Included With Every Submission",
    subtitle: "Everything you need for a complete grading experience.",
    items: [
      "Grading",
      "Encapsulation",
      "Digital Report",
      "Certification Verification",
      "High-Resolution Images",
      "Online Status Tracking",
    ],
  },
  simplicity: [
    "No premium tiers.",
    "No hidden upgrades.",
    "No complicated pricing structures.",
  ],
  cta: {
    title: "Start grading today",
    description: "$10 per card. Everything included.",
    button: "Submit Cards",
  },
} as const;

export const verifyPage = {
  meta: {
    title: "Verify Certification",
    description:
      "Verify every White Whale graded card using its unique certification number linked to a permanent digital record.",
  },
  hero: {
    title: "Verify Every Card",
    description:
      "Every White Whale graded card receives a unique certification number linked to a permanent digital record.",
  },
  collectorsCanVerify: {
    title: "Collectors can instantly verify:",
  },
  buyersSellers: {
    title: "Built For Buyers And Sellers",
    description:
      "Verification helps create confidence throughout the marketplace. Whether you're buying, selling, or reviewing your collection, certification records remain accessible online.",
    tagline: "Because trust should never require guesswork.",
  },
  cta: {
    button: "Verify A Card",
  },
} as const;

export const whyWhiteWhalePage = {
  meta: {
    title: "Why White Whale",
    description:
      "White Whale was created because collectors deserve a better grading experience — built around consistency, transparency, speed, and affordability.",
  },
  hero: {
    title: "Built to Fix the Shortfalls of Legacy Grading.",
    description:
      "White Whale was created because collectors deserve a better grading experience.",
  },
  intro: [
    "White Whale was not created because the hobby needed another grading company. White Whale was created because collectors deserve a better grading experience.",
    "For years, collectors have accepted long turnaround times, limited visibility into the grading process, and increasing prices.",
    "We believe grading can be better.",
  ],
  exists: {
    title: "Our goal is simple:",
    description:
      "Create a grading experience built around consistency, transparency, speed, and affordability.",
  },
  beliefs: {
    title: "What We Believe",
    items: [
      {
        title: "Collectors should understand their grades.",
        description:
          "Digital reports provide visibility into the condition information behind every result.",
      },
      {
        title: "Collectors should be able to verify their grades.",
        description: "Every certification is linked to a permanent online record.",
      },
      {
        title: "Collectors should not wait months for results.",
        description: "We target a 72-hour turnaround after cards are received.",
      },
      {
        title: "Collectors should have access to transparent grading records.",
        description:
          "One service. One price. No hidden tiers or complicated structures.",
      },
    ],
  },
  difference: {
    title: "The White Whale Difference",
    description:
      "Technology supports consistency. Digital reports support transparency. Certification verification supports trust. Together they create a grading experience designed for the modern collector.",
  },
  cta: {
    title: "Experience the difference",
    description: "Join collectors who expect more from their grading partner.",
    button: "Submit Cards",
  },
} as const;

export const technologyPage = {
  meta: {
    title: "Technology",
    description:
      "White Whale combines advanced imaging, standardized workflows, detailed reporting, and certification verification for a consistent grading experience.",
  },
  hero: {
    title: "Consistency Starts With The Process",
    description:
      "White Whale combines advanced imaging technology, standardized grading workflows, detailed reporting, and certification verification to help create a more consistent and transparent grading experience.",
  },
  coreTechnology: {
    title: "Core Technology Explanation",
    principles: [
      "Every card follows the same evaluation process.",
      "Every card is captured using the same imaging environment.",
      "Every card is evaluated using the same grading framework.",
    ],
    items: [
      {
        title: "Standardized evaluation",
        description:
          "Every card follows the same documented workflow from intake to certification.",
      },
      {
        title: "Controlled imaging",
        description:
          "Every card is captured using the same imaging environment.",
      },
      {
        title: "Consistent framework",
        description:
          "Every card is evaluated using the same grading framework.",
      },
    ],
  },
  imaging: {
    title: "Advanced Imaging",
    description:
      "Cards are imaged using controlled capture systems designed to document condition with consistency and repeatability.",
    checklist: [
      "Centering",
      "Corners",
      "Edges",
      "Surface Quality",
      "Print Defects",
      "Whitening",
      "Scratches",
    ],
  },
  whyTech: {
    title: "Why Technology Matters",
    paragraphs: [
      "Technology does not replace grading.",
      "Technology helps support consistency.",
      "The objective is not automation for the sake of automation.",
      "The objective is creating a grading experience collectors can trust.",
    ],
  },
  cta: {
    title: "See what every report includes",
    description:
      "Digital grading reports give collectors the context behind every certification.",
    button: "View Digital Reports",
  },
} as const;

export const digitalReportsPage = {
  meta: {
    title: "Digital Reports",
    description:
      "Every White Whale graded card includes a Digital Grading Report with subgrades, images, and condition analysis.",
  },
  hero: {
    title: "More Than A Label",
    description: "Every White Whale graded card includes a Digital Grading Report.",
  },
  overview:
    "Reports are designed to help collectors better understand the condition of their card and the information behind the final grade.",
  included: {
    title: "Reports May Include",
    items: [
      "Final Grade",
      "Subgrades",
      "High-Resolution Images",
      "Certification Information",
      "Condition Analysis",
      "Permanent Digital Record",
    ],
  },
  preview: {
    eyebrow: "Preview",
    title: "Report Preview",
    description:
      "A sample of how White Whale presents grading information to collectors.",
    cta: "View Sample Report",
  },
  collectors: {
    title: "Built For Collectors",
    description:
      "Whether you're buying, selling, insuring, or collecting, access to additional information creates confidence. Transparency should be part of the grading experience from the beginning.",
  },
  cta: {
    title: "Get your cards graded",
    description:
      "Every submission includes a full digital grading report at no extra cost.",
    button: "Submit Cards",
  },
} as const;

export const dealerProgramPage = {
  meta: {
    title: "Dealer Program",
    description:
      "White Whale dealer solutions for card shops, breakers, marketplace sellers, and professional submitters.",
  },
  hero: {
    title: "Built For High-Volume Submitters",
    description:
      "White Whale offers dealer solutions designed for card shops, breakers, marketplace sellers, and professional submitters.",
  },
  overview: {
    title: "Dealer Overview",
    description:
      "White Whale offers dealer solutions designed for card shops, breakers, marketplace sellers, and professional submitters who need volume pricing, dedicated support, and efficient bulk workflows.",
  },
  benefits: {
    title: "Dealer Benefits",
    items: [
      "Volume Pricing",
      "Dedicated Support",
      "Submission Tracking",
      "Bulk Workflows",
      "Fast Turnaround",
      "Certification Verification",
    ],
  },
  tagline:
    "Designed to help growing card businesses operate more efficiently.",
  application: {
    title: "Dealer Application",
    description: "Tell us about your business and we'll be in touch.",
    submitButton: "Apply For Dealer Program",
  },
} as const;

export const submitCardsPage = {
  meta: {
    title: "Submit Cards",
    description:
      "Start your White Whale card grading submission. Create an account, enter card information, and ship your cards for grading.",
  },
  hero: {
    title: "Submit Your Cards",
    description:
      "Begin your grading submission in a few simple steps. Create an account or sign in to get started.",
  },
  flow: {
    title: "Submission Flow",
    description: "Every submission follows the same clear path from account to confirmation.",
  },
  steps: [
    {
      title: "Create Account / Login",
      description: "Sign in or create your White Whale account to begin.",
    },
    {
      title: "Create Submission",
      description: "Start a new submission and select your grading preferences.",
    },
    {
      title: "Enter Card Information",
      description: "Add each card with set, year, and identification details.",
    },
    {
      title: "Shipping Instructions",
      description: "Follow secure packing and shipping guidelines to send your cards.",
    },
    {
      title: "Checkout",
      description: "Review your submission and complete payment.",
    },
    {
      title: "Confirmation Page",
      description: "Receive confirmation and track your submission status.",
    },
  ],
  included: {
    title: "Included With Every Submission",
    items: [
      "Grading & encapsulation",
      "Digital grading report",
      "Certification verification",
      "High-resolution images",
      "$10 per card",
    ],
  },
  paymentMethods: [
    "Credit / Debit Card",
    "PayPal",
    "Apple Pay",
    "Google Pay",
  ],
  cta: "Start Submission",
  notice:
    "This is a public preview of the submission experience. Checkout and account features are not active yet.",
} as const;

export const privacyPage = {
  meta: {
    title: "Privacy Policy",
    description:
      "How White Whale collects, uses, and protects your information when you submit cards, create an account, or use our grading services.",
  },
  hero: {
    eyebrow: "Legal",
    title: "Privacy Policy",
    description:
      "Your privacy matters. This policy explains what information we collect, how we use it, and the choices you have.",
  },
  lastUpdated: "June 24, 2026",
  footerNote:
    "This policy may be updated from time to time. Material changes will be posted on this page with a revised last-updated date.",
  sections: [
    {
      title: "Overview",
      paragraphs: [
        'White Whale ("we," "us," or "our") provides trading card grading, encapsulation, digital reports, and certification verification services. This Privacy Policy describes how we handle personal information when you visit our website, create an account, submit cards for grading, verify certifications, or contact our team.',
        "By using our services, you agree to the collection and use of information in accordance with this policy.",
      ],
    },
    {
      title: "Information We Collect",
      paragraphs: ["We may collect the following categories of information:"],
      list: [
        "Account information such as your name, email address, phone number, and login credentials.",
        "Submission and order details including shipping addresses, card descriptions, declared values, and payment information processed through our payment providers.",
        "Grading and certification data including grades, subgrades, certification numbers, imaging records, and digital report content linked to your submissions.",
        "Communications you send to us through contact forms, support requests, or dealer program applications.",
        "Technical data such as IP address, browser type, device information, and usage data collected through cookies and similar technologies.",
      ],
    },
    {
      title: "How We Use Your Information",
      paragraphs: ["We use collected information to:"],
      list: [
        "Process card submissions, grading workflows, encapsulation, and return shipments.",
        "Generate digital grading reports and maintain online certification records.",
        "Operate certification verification tools available to collectors and buyers.",
        "Communicate about submissions, turnaround status, account activity, and service updates.",
        "Improve our website, grading systems, security, and customer experience.",
        "Comply with legal obligations and enforce our Terms of Service.",
      ],
    },
    {
      title: "Card Images & Grading Records",
      paragraphs: [
        "High-resolution images captured during the grading process may be stored as part of your digital grading report and certification record. These records may be accessible through certification verification using the assigned certification number.",
        "We retain grading data to support authentication, dispute resolution, and the long-term integrity of certification records.",
      ],
    },
    {
      title: "Sharing of Information",
      paragraphs: [
        "We do not sell your personal information. We may share information with trusted service providers who help us operate our business, such as payment processors, shipping carriers, hosting providers, and email delivery services. These providers are permitted to use your information only as needed to perform services on our behalf.",
        "We may also disclose information when required by law, to protect our rights, or in connection with a business transaction such as a merger or acquisition.",
      ],
    },
    {
      title: "Data Retention",
      paragraphs: [
        "We retain account and submission information for as long as your account is active or as needed to provide services, comply with legal obligations, resolve disputes, and enforce our agreements.",
        "Certification and grading records may be retained indefinitely to support verification and collector confidence in graded items.",
      ],
    },
    {
      title: "Security",
      paragraphs: [
        "We implement reasonable administrative, technical, and organizational safeguards designed to protect your information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
      ],
    },
    {
      title: "Your Choices & Rights",
      paragraphs: ["Depending on your location, you may have the right to:"],
      list: [
        "Access, correct, or request deletion of certain personal information.",
        "Opt out of non-essential marketing communications.",
        "Request information about how your data is used.",
      ],
    },
    {
      title: "Cookies",
      paragraphs: [
        "We use cookies and similar technologies to remember preferences such as theme settings, maintain sessions, and understand how visitors use our website. You can control cookies through your browser settings, though some features may not function properly if cookies are disabled.",
      ],
    },
    {
      title: "Children's Privacy",
      paragraphs: [
        "Our services are not directed to children under 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us personal information, please contact us so we can take appropriate action.",
      ],
    },
    {
      title: "Contact Us",
      paragraphs: [
        "If you have questions about this Privacy Policy or our data practices, contact us through our Contact page or by emailing privacy@whitewhalegrading.com.",
      ],
    },
  ],
} as const;

export const termsPage = {
  meta: {
    title: "Terms of Service",
    description:
      "Terms and conditions governing use of White Whale grading services, submissions, digital reports, and certification verification.",
  },
  hero: {
    eyebrow: "Legal",
    title: "Terms of Service",
    description:
      "Please read these terms carefully before submitting cards or using White Whale services.",
  },
  lastUpdated: "June 24, 2026",
  footerNote:
    "These Terms of Service constitute a binding agreement between you and White Whale. Continued use of our services after changes are posted constitutes acceptance of the revised terms.",
  sections: [
    {
      title: "Agreement to Terms",
      paragraphs: [
        'These Terms of Service ("Terms") govern your access to and use of the White Whale website, account portal, submission services, digital grading reports, certification verification tools, and related offerings (collectively, the "Services").',
        "By creating an account, submitting cards, or using our Services, you agree to these Terms. If you do not agree, do not use the Services.",
      ],
    },
    {
      title: "Grading Services",
      paragraphs: [
        "White Whale provides card grading, encapsulation, certification, and digital reporting services for collectible trading cards. Grades represent our professional opinion of a card's condition at the time of evaluation based on our published standards and imaging workflows.",
        "Grading involves subjective judgment. While we strive for consistency, White Whale does not guarantee that a grade will match another grading company's result or that a card's market value will increase after grading.",
      ],
    },
    {
      title: "Submissions & Shipping",
      paragraphs: ["When you submit cards for grading, you agree that:"],
      list: [
        "You are the lawful owner of submitted items or are authorized to submit them.",
        "You will follow our packing and shipping instructions to reduce the risk of damage in transit.",
        "You are responsible for inbound shipping costs and any applicable insurance unless otherwise stated.",
        "White Whale is not responsible for loss or damage caused by carriers, improper packaging, or events outside our reasonable control while cards are in transit to or from our facility.",
      ],
    },
    {
      title: "Pricing & Payment",
      paragraphs: [
        "Current pricing is published on our Pricing page. Unless otherwise stated, launch pricing is $10 per standard graded card. Subgrades and additional services may be offered at separate published rates.",
        "Payment is due at the time of submission or checkout as indicated during the submission process. We reserve the right to update pricing with reasonable notice on our website.",
      ],
    },
    {
      title: "Turnaround Times",
      paragraphs: [
        "White Whale targets a 72-hour turnaround after cards are received and entered into the grading workflow. Turnaround times are estimates only and may vary due to submission volume, holidays, shipping delays, quality control holds, or other operational factors.",
      ],
    },
    {
      title: "Digital Reports & Certification",
      paragraphs: [
        "Each graded card may receive a unique certification number and a digital grading report containing condition information, images, and related metadata. Certification records may be made available through our online verification tools.",
        "You may not alter, falsify, or misrepresent certification numbers, labels, slabs, or digital report content. Misuse of certification data may result in account suspension and revocation of certification validity.",
      ],
    },
    {
      title: "Accounts",
      paragraphs: [
        "You are responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Notify us promptly of any unauthorized access or security concern.",
        "We may suspend or terminate accounts that violate these Terms, engage in fraud, abuse our systems, or create legal or operational risk.",
      ],
    },
    {
      title: "Prohibited Conduct",
      paragraphs: ["You agree not to:"],
      list: [
        "Submit counterfeit, stolen, or misrepresented items.",
        "Attempt to interfere with website security, verification systems, or grading infrastructure.",
        "Use the Services for unlawful purposes or in violation of applicable laws.",
        "Scrape, copy, or redistribute site content or certification data without permission.",
      ],
    },
    {
      title: "Intellectual Property",
      paragraphs: [
        "All website content, branding, software, imaging workflows, report formats, and related materials are owned by White Whale or its licensors and are protected by intellectual property laws. You may not reproduce or exploit our materials without prior written consent.",
        "You retain ownership of your submitted cards. You grant White Whale a limited license to image, grade, encapsulate, store, and display submission-related content as needed to provide the Services and maintain certification records.",
      ],
    },
    {
      title: "Disclaimer of Warranties",
      paragraphs: [
        'The Services are provided on an "as is" and "as available" basis to the fullest extent permitted by law. White Whale disclaims all warranties, express or implied, including implied warranties of merchantability, fitness for a particular purpose, and non-infringement.',
      ],
    },
    {
      title: "Limitation of Liability",
      paragraphs: [
        "To the fullest extent permitted by law, White Whale shall not be liable for indirect, incidental, special, consequential, or punitive damages, or for lost profits, lost value, or loss of data arising from your use of the Services.",
        "Our total liability for any claim relating to the Services shall not exceed the amount you paid to White Whale for the specific submission giving rise to the claim during the twelve months preceding the event.",
      ],
    },
    {
      title: "Disputes & Governing Law",
      paragraphs: [
        "These Terms are governed by the laws of the State of Delaware, without regard to conflict-of-law principles, except where prohibited by applicable law.",
        "Before initiating formal proceedings, you agree to contact us and attempt to resolve disputes informally in good faith.",
      ],
    },
    {
      title: "Changes to These Terms",
      paragraphs: [
        "We may update these Terms from time to time. Updated terms will be posted on this page with a revised last-updated date. Material changes may also be communicated through the website or by email where appropriate.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        "Questions about these Terms may be directed through our Contact page or by emailing legal@whitewhalegrading.com.",
      ],
    },
  ],
} as const;
