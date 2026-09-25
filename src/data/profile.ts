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
  department: string;
  researchFocus: string[];
  interest: { name: string; description: string };
}

export const profile: Profile = {
  name: "Amzad Pinso",
  firstName: "Amzad",
  lastName: "Pinso",
  role: "Computer Science & Engineering",
  subRole: "Teaching Assistant • AI & Research Enthusiast",
  location: "Chattogram, Bangladesh",
  email: "contact.amzadpinso@gmail.com",
  phone: "+8801537290195",
  phoneDisplay: "(+880) 01537290195",
  linkedin: "https://www.linkedin.com/in/amzad-pinso",
  cv: "/pdf/cv.pdf",
  image: "/images/me/me.jpg",
  statement:
    "Building intelligent systems, exploring explainable AI, and turning research ideas into practical technology.",
  bio: "Computer Science & Engineering undergraduate at International Islamic University Chittagong (IIUC) and undergraduate teaching assistant supporting artificial intelligence and database laboratory courses.",
  longBio:
    "I work at the intersection of computer science, intelligent systems, research, and teaching. As a CSE undergraduate at IIUC, I support AI and DBMS laboratory courses while pursuing research in Explainable AI, ensemble learning, and healthcare analytics. My focus is on building models that are not only accurate but also interpretable and trustworthy for real-world clinical decision-making.",
  semester: "7th Semester",
  cgpa: "3.66 / 4.00",
  university: "IIUC",
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
