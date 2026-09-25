/**
 * Projects data — Featured work showcase.
 *
 * Project 01 (DiaXAI-Stack) is verified from CV.
 * Projects 02–04 are intentionally empty editable placeholders.
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
      "An explainable AI framework for diabetes prediction using leakage-free stacking ensemble learning with dual threshold optimization. The framework combines multiple base learners through a stacking meta-learner while preserving explainability through per-feature attribution and dual threshold calibration for clinically actionable risk stratification.",
    year: "2026",
    status: "Accepted for presentation and publication at ICCA 2026",
    technologies: ["Ensemble Learning", "Stacking", "Explainable AI", "Predictive Modeling"],
    topics: [
      "Explainable AI",
      "Ensemble Learning",
      "Healthcare Analytics",
      "Leakage-Free ML",
      "Dual Threshold Optimization",
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
    subtitle: "Coming Soon",
    category: "Upcoming",
    description:
      "This slot is reserved for an upcoming featured project. Details will be added here once the work is ready to be shared publicly.",
    year: "—",
    status: "Pending",
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
    subtitle: "Coming Soon",
    category: "Upcoming",
    description:
      "This slot is reserved for an upcoming featured project. Details will be added here once the work is ready to be shared publicly.",
    year: "—",
    status: "Pending",
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
    subtitle: "Coming Soon",
    category: "Upcoming",
    description:
      "This slot is reserved for an upcoming featured project. Details will be added here once the work is ready to be shared publicly.",
    year: "—",
    status: "Pending",
    technologies: [],
    topics: [],
    href: undefined,
    placeholder: true,
  },
];
