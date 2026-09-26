/**
 * Profile data — Authoritative source for personal information.
 * Edit this file to update name, contact, role, location, etc.
 */

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  subRole: string;
  tagline: string;
  location: string;
  email: string;
  phone: string;
  phoneDisplay: string;
  linkedin: string;
  cv: string;
  image: string;
  statement: string;
  bio: string;
  longBio: string;
  semester: string;
  cgpa: string;
  university: string;
  universityShort: string;
  department: string;
  researchFocus: string[];
  interest: { name: string; description: string };
}

export const profile: Profile = {
  name: "Amzad Pinso",
  firstName: "Amzad",
  lastName: "Pinso",
  role: "Computer Science & Engineering Student",
  subRole: "Undergraduate Teaching Assistant",
  tagline: "AI · Research · Teaching",
  location: "Chattogram, Bangladesh",
  email: "contact.amzadpinso@gmail.com",
  phone: "+8801537290195",
  phoneDisplay: "(+880) 01537290195",
  linkedin: "https://www.linkedin.com/in/amzad-pinso",
  cv: "/pdf/cv.pdf",
  image: "/images/me/me.jpg",
  statement:
    "Exploring intelligent systems, explainable AI, healthcare analytics, and software engineering while learning through research, teaching, and technical projects.",
  bio: "Computer Science & Engineering undergraduate at IIUC and undergraduate teaching assistant supporting AI and DBMS laboratory courses.",
  longBio:
    "As a CSE undergraduate at IIUC, I support AI and DBMS laboratory courses while pursuing research in explainable AI, ensemble learning, and healthcare analytics — studying models that are accurate, interpretable, and clinically trustworthy. Beyond coursework and teaching, I am learning through technical projects, reading, and writing, with a focus on what makes intelligent systems reliable enough to use in real-world decisions.",
  semester: "7th Semester",
  cgpa: "3.66 / 4.00",
  university: "IIUC",
  universityShort: "IIUC",
  department: "Department of Computer Science & Engineering",
  researchFocus: [
    "Explainable AI",
    "Ensemble Learning",
    "Healthcare Analytics",
    "Machine Learning",
    "Predictive Modeling",
    "Data Science",
    "Software Engineering",
  ],
  interest: {
    name: "Chess",
    description: "Strategic thinking and problem solving.",
  },
};

export const navLinks = [
  { label: "About", href: "#about", number: "01" },
  { label: "Research", href: "#research", number: "02" },
  { label: "Projects", href: "#projects", number: "03" },
  { label: "Experience", href: "#experience", number: "04" },
  { label: "Education", href: "#education", number: "06" },
  { label: "Skills", href: "#skills", number: "07" },
  { label: "Contact", href: "#contact", number: "10" },
] as const;
