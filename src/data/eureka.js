// Verified from the official Eureka! (E-Cell IIT Bombay) site — ecell.in/eureka — Aug 2026.
// This campus page covers the ABES Engineering College, Ghaziabad round of EUREKA '26.

export const STATS = [
  { value: "300+", label: "Mentors" },
  { value: "INR 2Cr+", label: "Prizes" },
  { value: "29th", label: "Edition" },
  { value: "50+", label: "VC Firms" },
];

export const TIMELINE = [
  {
    date: "July 10",
    title: "Applications Open",
    desc: "Submit your startup idea and team information on the official Eureka! portal.",
  },
  {
    date: "Aug 14–18",
    title: "Questionnaire Deadline",
    desc: "Last date to register and edit your business-model questionnaire.",
  },
  {
    date: "Sept 5 – Oct 3",
    title: "Zonal Round",
    desc: "Get 1-on-1 mentorship and pitch offline at your nearest zonal — this is the round happening at ABES!",
  },
  {
    date: "Oct 17–20",
    title: "VC Round",
    desc: "Shortlisted teams pitch to 50+ leading Venture Capital firms.",
  },
  {
    date: "December",
    title: "Finals & Demo Day",
    desc: "Refine through workshops, then compete live at the Grand Finals and Demo Day.",
  },
];

export const TRACKS = [
  "Business",
  "Social",
  "PAN IIT",
  "AI & Deeptech",
  "HealthCare",
  "Cooling Solutions",
  "Logistics & Supply Chain",
  "Energy & Sustainability",
];

// Options shown in the registration form's Track dropdown — same 8 official
// tracks plus "Others" as a catch-all, without changing the public "8
// Tracks" display grid on the Tracks section.
export const FORM_TRACK_OPTIONS = [...TRACKS, "Others"];

export const REWARDS = [
  {
    title: "Eureka! GCC",
    desc: "Selected startups pitch at Eureka! GCC — organized with Gulf Islamic Investments (GII), connecting founders with investors across the GCC region.",
  },
  {
    title: "TigerLaunch",
    desc: "Top-performing startups earn a sponsored spot to represent India at the TigerLaunch finals, hosted at Princeton University.",
  },
];

export const FAQS = [
  {
    q: "Do I compulsorily need a team or co-founder?",
    a: "Eureka! overall allows single participation too — but for this ABES campus registration specifically, the official registration form requires a team of 2 to 4 members. Round up a co-founder or two before you register here.",
  },
  {
    q: "How will my startup be judged?",
    a: "Judging follows the official Eureka! 2026 criteria, based entirely on your submitted business-model questionnaire — no extra documents are considered.",
  },
  {
    q: "Can I take part if I participated last year?",
    a: "Yes, as long as you weren't a winner. You'll need to register with a new idea.",
  },
  {
    q: "Can I apply to multiple tracks?",
    a: "Yes — you can enter different ideas across tracks, but you can't submit the same business model to more than one track.",
  },
  {
    q: "What's the last date to register?",
    a: "The last date for registration and to edit your questionnaire is 18th August, 2026 — don't wait till the last moment!",
  },
  {
    q: "Is my pitch kept confidential?",
    a: "Presentations are closed-room — only your team and the judges are present. Judges don't sign NDAs, so refer to the official Terms & Conditions for the confidentiality policy.",
  },
  {
    q: "Do I need to pay a registration fee?",
    a: "Yes — scan the QR code in the registration section, pay via UPI, and enter the transaction ID / UTR number in the form so we can verify your payment.",
  },
];

// Registration form backend — switched from Web3Forms to Forminit because
// Web3Forms' free plan doesn't support file attachments (payment
// screenshot), while Forminit's free plan does. Screenshots are capped at
// 100KB client-side to stretch Forminit's 100MB free storage across as
// many registrations as possible. Submissions land in the inbox of
// whichever Forminit account owns this form ID.
export const FORMINIT_FORM_ID = "ptuiur7w4bp";

export const EVENT_INFO = {
  college: "ABES Engineering College, Ghaziabad",
  editionLabel: "EUREKA '26",
  fullName: "Eureka! — Zonal Round",
  contactEmail: "eureka26@ecell.in",
  dateNote: "Zonal Round Window: Sept 5 – Oct 3, 2026",
  venueNote: "Venue & exact slot to be announced on campus",
};

// Team size is fixed to 2–4 members to match the official campus
// registration form (Microsoft Forms) — no solo entries for this round.
export const TEAM_SIZES = [2, 3, 4];

// Ordinal labels for each member slot beyond the leader, matching the
// wording used in the official registration form exactly.
export const MEMBER_ORDINALS = ["Second", "Third", "Fourth"];

export const PAYMENT_INFO = {
  qrImage: "/payment-qr.jpg",
  note: "Scan the QR code above (E-Cell, GPay) and pay the registration fee via any UPI app, then enter the transaction ID (UTR number) below so we can verify it. Keep a screenshot handy in case we need it for confirmation.",
};
