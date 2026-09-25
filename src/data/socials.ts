/**
 * Social links data — Verified contact information.
 * Edit this file to update social links.
 */

export interface SocialLink {
  label: string;
  href: string;
  type: "email" | "phone" | "linkedin" | "cv" | "external";
}

export const socials: SocialLink[] = [
  {
    label: "Email",
    href: "mailto:contact.amzadpinso@gmail.com",
    type: "email",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/amzad-pinso",
    type: "linkedin",
  },
  {
    label: "Phone",
    href: "tel:+8801537290195",
    type: "phone",
  },
  {
    label: "CV",
    href: "/pdf/cv.pdf",
    type: "cv",
  },
];
