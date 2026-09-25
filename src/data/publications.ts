/**
 * Publications data — Verified from CV.
 * Edit this file to add new publications as they are accepted.
 */

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  conference: string;
  year: string;
  status: string;
  topics: string[];
  abstract: string;
  href?: string; // Add paper URL when available
}

export const publications: Publication[] = [
  {
    id: "pub-diaxai",
    title:
      "DiaXAI-Stack: An Explainable AI Framework for Diabetes Prediction Using Leakage-Free Stacking Ensemble Learning with Dual Threshold Optimization",
    authors: ["Md. Amzad Hosen Pinso", "et al."],
    conference: "ICCA 2026 — International Conference on Computer Applications",
    year: "2026",
    status: "Accepted for Presentation and Publication",
    topics: [
      "Explainable AI",
      "Stacking Ensemble Learning",
      "Healthcare Analytics",
      "Diabetes Prediction",
      "Leakage-Free Machine Learning",
      "Dual Threshold Optimization",
    ],
    abstract:
      "A leakage-free stacking ensemble framework for diabetes prediction that combines diverse base learners through a meta-learner, with dual threshold optimization that calibrates risk stratification for clinical decision support while preserving per-feature explainability.",
    href: undefined,
  },
];
