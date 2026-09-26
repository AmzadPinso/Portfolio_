/**
 * Skills / Toolkit data — Verified from CV.
 *
 * NOTE: Do NOT add React, Next.js, Node.js, Python, TensorFlow, PyTorch, AWS, Docker, etc.
 * unless they are explicitly added to the CV. The portfolio is built with
 * Next.js + TypeScript, but that does not imply those are CV-verified skills.
 *
 * Edit this file to update skill categories and items.
 */

export interface SkillItem {
  name: string;
  description?: string;
}

export interface SkillCategory {
  id: string;
  label: string;
  number: string;
  items: SkillItem[];
}

export const skills: SkillCategory[] = [
  {
    id: "programming",
    label: "Programming",
    number: "01",
    items: [
      { name: "C", description: "Systems programming fundamentals and data structures." },
      { name: "C++", description: "Object-oriented programming and STL." },
      { name: "Java", description: "Object-oriented design and application development." },
    ],
  },
  {
    id: "databases",
    label: "Databases",
    number: "02",
    items: [
      { name: "SQL", description: "Relational database querying and schema design." },
    ],
  },
  {
    id: "web",
    label: "Web",
    number: "03",
    items: [
      { name: "HTML", description: "Semantic markup and document structure." },
      { name: "CSS", description: "Styling, layout, and responsive design." },
    ],
  },
  {
    id: "research",
    label: "Research",
    number: "04",
    items: [
      { name: "Literature Review", description: "Surveying and synthesizing related work." },
      { name: "Scientific Writing", description: "Authoring research papers and technical reports." },
      { name: "Research Methodology", description: "Designing experiments and evaluation protocols." },
    ],
  },
  {
    id: "analytical",
    label: "Analytical",
    number: "05",
    items: [
      { name: "Analytical Thinking", description: "Breaking down complex problems systematically." },
      { name: "Problem Solving", description: "Designing solutions and validating approaches." },
    ],
  },
  {
    id: "professional",
    label: "Professional",
    number: "06",
    items: [
      { name: "Leadership", description: "Leading teams and initiatives." },
      { name: "Team Management", description: "Coordinating people and responsibilities." },
      { name: "Communication", description: "Clear written and verbal communication." },
      { name: "Organization", description: "Planning and structuring work." },
      { name: "Time Management", description: "Prioritization and execution under deadlines." },
    ],
  },
];
