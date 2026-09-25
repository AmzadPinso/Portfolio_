/**
 * Awards data — Verified from CV.
 * Edit this file to update award entries.
 */

export interface Award {
  id: string;
  number: string;
  title: string;
  context: string;
  year: string;
  description: string;
}

export const awards: Award[] = [
  {
    id: "award-carrom",
    number: "01",
    title: "Carrom Champion",
    context: "CSE Sport Week — IIUC Computer Club",
    year: "2024",
    description: "Captained the championship-winning team in the CSE Sport Week carrom tournament.",
  },
  {
    id: "award-science",
    number: "02",
    title: "Science Fest Champion",
    context: "Lohagara Upazila Science Fest",
    year: "2018",
    description:
      "Led the winning team at the upazila-level National Government Science Fest.",
  },
  {
    id: "award-speech",
    number: "03",
    title: "Runner-Up — Speech Competition",
    context: "Lohagara Upazila",
    year: "2018",
    description: "Recognized as runner-up in the upazila-level speech competition.",
  },
];
