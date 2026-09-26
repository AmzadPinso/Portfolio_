/**
 * Projects data — Research & Technical Work listing.
 *
 * Project 01 (DiaXAI-Stack) is verified from CV — accepted at ICCA 2026.
 * Projects 02-04 are intentionally empty editable placeholders.
 * Replace the placeholder content with real project information
 * when available. Do NOT fabricate project titles or descriptions.
 */

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle?: string;
  category: string;
  description: string;
  year?: string;
  status?: string;
  technologies: string[];
  topics?: string[];
  href?: string;
  image?: string;
  accent?: string;
  featured?: boolean;
  placeholder?: boolean;
}

export const projects: Project[] = [
  {
    id: "proj-diaxai",
    number: "01",
    title: "DiaXAI-Stack",
    subtitle: "Explainable AI for Diabetes Prediction",
    category: "Research / Explainable AI / Healthcare Analytics",
    description:
      "A research framework I built to study whether diabetes prediction can be made both accurate and clinically trustworthy. I designed a leakage-free stacking ensemble that combines diverse base learners through a meta-learner, then paired it with a dual-threshold calibration scheme to support clinically actionable risk stratification. The work sits at the intersection of ensemble learning, explainable AI, and healthcare analytics — the throughline of my current research direction. Accepted for presentation and publication at ICCA 2026.",
    year: "2026",
    status: "Accepted for presentation and publication at ICCA 2026",
    technologies: [
      "Ensemble Learning",
      "Stacking",
      "Explainable AI",
      "Predictive Modeling",
    ],
    topics: [
      "Explainable AI",
      "Ensemble Learning",
      "Healthcare Analytics",
      "Leakage-Free ML",
      "Dual Threshold Optimization",
      "Interpretable ML",
    ],
    href: undefined, // Add paper URL when available
    featured: true,
  },
  // ─────────────────────────────────────────────────────────────
  // Replace Project 02 with real project information when available.
  // Do not fabricate details — leave the placeholder content intact
  // until you have a verified project to feature here.
  // ─────────────────────────────────────────────────────────────
  {
    id: "proj-02",
    number: "02",
    title: "Project 02",
    subtitle: "In Progress",
    category: "Upcoming",
    description:
      "Additional research and technical explorations are in progress. Details will be added here as results are verified and prepared for sharing.",
    year: "—",
    status: "In Progress",
    technologies: [],
    topics: [],
    href: undefined,
    placeholder: true,
  },
  // ─────────────────────────────────────────────────────────────
  // Replace Project 03 with real project information when available.
  // ─────────────────────────────────────────────────────────────
  {
    id: "proj-03",
    number: "03",
    title: "Project 03",
    subtitle: "In Progress",
    category: "Upcoming",
    description:
      "Additional research and technical explorations are in progress. Details will be added here as results are verified and prepared for sharing.",
    year: "—",
    status: "In Progress",
    technologies: [],
    topics: [],
    href: undefined,
    placeholder: true,
  },
  // ─────────────────────────────────────────────────────────────
  // Replace Project 04 with real project information when available.
  // ─────────────────────────────────────────────────────────────
  {
    id: "proj-04",
    number: "04",
    title: "Project 04",
    subtitle: "In Progress",
    category: "Upcoming",
    description:
      "Additional research and technical explorations are in progress. Details will be added here as results are verified and prepared for sharing.",
    year: "—",
    status: "In Progress",
    technologies: [],
    topics: [],
    href: undefined,
    placeholder: true,
  },
];
