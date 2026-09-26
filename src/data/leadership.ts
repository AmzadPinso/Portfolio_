/**
 * Leadership & organizational experience data — Verified from CV.
 * Edit this file to update leadership entries.
 */

export interface Leadership {
  id: string;
  role: string;
  organization: string;
  period: string;
  focus: string[];
  description: string;
}

export const leadership: Leadership[] = [
  {
    id: "lead-cc",
    role: "Social Welfare Secretary",
    organization: "IIUC Computer Club",
    period: "OCT 2025 — AUG 2026",
    focus: ["Community Service", "Social Awareness", "Humanitarian Initiatives"],
    description:
      "Coordinated community service and social welfare programs, encouraged student participation, and supported humanitarian initiatives across campus.",
  },
  {
    id: "lead-sys-research",
    role: "Science & Research Secretary",
    organization: "Sukchari Young Society",
    period: "MAR 2024 — MAR 2026",
    focus: ["Research", "Education", "Knowledge Sharing"],
    description:
      "Supported research initiatives, educational programs, and community development. Promoted scientific thinking and knowledge sharing.",
  },
  {
    id: "lead-bncc",
    role: "BNCC Cadet — Navy Wing",
    organization: "Hazera-Taju Degree College",
    period: "JUN 2020 — DEC 2020",
    focus: ["Leadership", "Discipline", "Teamwork"],
    description:
      "Trained in leadership, discipline, teamwork, and responsibility through the Bangladesh National Cadet Corps Navy Wing program.",
  },
  {
    id: "lead-scouts",
    role: "Senior Patrol Leader",
    organization: "Scouts",
    period: "MAY 2018 — JAN 2019",
    focus: ["Leadership", "Teamwork", "Community Service"],
    description:
      "Led a patrol of scouts and organized community service activities, developing leadership and teamwork skills.",
  },
];
