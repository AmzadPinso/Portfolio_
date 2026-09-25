/**
 * Education timeline data — Verified from CV.
 * Edit this file to update education entries.
 */

export interface Education {
  id: string;
  degree: string;
  institution: string;
  location: string;
  start: string;
  end: string;
  result: string;
  resultLabel: string;
  description?: string;
  current?: boolean;
}

export const education: Education[] = [
  {
    id: "edu-bsc",
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "International Islamic University Chittagong",
    location: "Chattogram, Bangladesh",
    start: "2023",
    end: "Present",
    result: "3.66 / 4.00",
    resultLabel: "CGPA",
    description:
      "Currently in the 7th semester, focusing on artificial intelligence, machine learning, and software engineering coursework. Supporting laboratory courses as an undergraduate teaching assistant.",
    current: true,
  },
  {
    id: "edu-hsc",
    degree: "Higher Secondary Certificate — Science",
    institution: "Hazera-Taju Degree College",
    location: "Chattogram, Bangladesh",
    start: "2019",
    end: "2021",
    result: "5.00 / 5.00",
    resultLabel: "GPA",
    description:
      "Completed higher secondary education in the science group with a perfect GPA.",
  },
  {
    id: "edu-ssc",
    degree: "Secondary School Certificate — Science",
    institution: "Sukchari High School",
    location: "Chattogram, Bangladesh",
    start: "2014",
    end: "2019",
    result: "4.94 / 5.00",
    resultLabel: "GPA",
    description:
      "Completed secondary education with distinction in the science group.",
  },
];
