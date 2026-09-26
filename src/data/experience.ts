/**
 * Experience timeline data — Verified from CV.
 * Includes teaching, leadership, and organizational experience.
 * Edit this file to update experience entries.
 */

export interface Experience {
  id: string;
  period: string;
  role: string;
  organization: string;
  description: string;
  highlights?: string[];
  tags?: string[];
  current?: boolean;
}

export const experience: Experience[] = [
  {
    id: "exp-ta",
    period: "2026 — PRESENT",
    role: "Undergraduate Teaching Assistant",
    organization: "IIUC — Department of CSE",
    description:
      "Support laboratory instruction and student guidance for artificial intelligence and database management courses. Assist with supervision, technical troubleshooting, and assessment.",
    highlights: [
      "AI Lab — guiding students through search, logic, and learning algorithms",
      "DBMS Lab — supporting SQL queries, schema design, and normalization",
      "Assessments and technical troubleshooting support",
    ],
    tags: ["CSE-3636 — AI Lab", "CSE-2424 — DBMS Lab"],
    current: true,
  },
  {
    id: "exp-welfare",
    period: "OCT 2025 — AUG 2026",
    role: "Social Welfare Secretary",
    organization: "IIUC Computer Club",
    description:
      "Coordinated community service and social welfare programs, encouraged student participation, and supported humanitarian and awareness initiatives across the campus community.",
    highlights: [
      "Coordinated community service programs",
      "Encouraged student participation in humanitarian initiatives",
      "Promoted social awareness campaigns",
    ],
    tags: ["Leadership", "Community", "Coordination"],
  },
  {
    id: "exp-research-sec",
    period: "MAR 2024 — MAR 2026",
    role: "Science & Research Secretary",
    organization: "Sukchari Young Society",
    description:
      "Supported research initiatives, educational programs, and community development. Promoted scientific thinking and knowledge sharing among youth in the local community.",
    highlights: [
      "Supported research and educational programs",
      "Promoted scientific thinking and knowledge sharing",
      "Community development initiatives",
    ],
    tags: ["Research", "Education", "Community"],
  },
  {
    id: "exp-member",
    period: "OCT 2023 — MAR 2024",
    role: "General Member",
    organization: "Sukchari Young Society",
    description:
      "Participated in community programs and supported educational and development initiatives as an active general member.",
    tags: ["Community", "Volunteering"],
  },
  {
    id: "exp-bncc",
    period: "JUN 2020 — DEC 2020",
    role: "BNCC Cadet — Navy Wing",
    organization: "Hazera-Taju Degree College",
    description:
      "Trained in leadership, discipline, teamwork, and responsibility through the Bangladesh National Cadet Corps Navy Wing program.",
    tags: ["Leadership", "Discipline", "Teamwork"],
  },
  {
    id: "exp-scouts",
    period: "MAY 2018 — JAN 2019",
    role: "Senior Patrol Leader",
    organization: "Scouts",
    description:
      "Led a patrol of scouts, organized community service activities, and developed leadership and teamwork skills through outdoor and service-oriented programs.",
    tags: ["Leadership", "Teamwork", "Community Service"],
  },
];
