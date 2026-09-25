"use client";

import { useEffect } from "react";
import { Preloader } from "@/components/preloader/Preloader";
import { Navbar } from "@/components/navigation/Navbar";
import { Hero } from "@/components/hero/Hero";
import { AboutSection } from "@/components/about/AboutSection";
import { ResearchSection } from "@/components/research/ResearchSection";
import { FeaturedProjects } from "@/components/projects/FeaturedProjects";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { EducationTimeline } from "@/components/education/EducationTimeline";
import { SkillsToolkit } from "@/components/skills/SkillsToolkit";
import { LeadershipSection } from "@/components/leadership/LeadershipSection";
import { AwardsSection } from "@/components/awards/AwardsSection";
import { ContactSection } from "@/components/contact/ContactSection";
import { Footer } from "@/components/footer/Footer";
import { CursorFollower } from "@/components/animation/CursorFollower";
import { ScrollProgress } from "@/components/animation/Reveal";

export default function Home() {
  useEffect(() => {
    // Lock scroll during preloader, then unlock.
    const start = Date.now();
    document.body.style.overflow = "hidden";
    const release = () => {
      const elapsed = Date.now() - start;
      const wait = Math.max(0, 2000 - elapsed);
      setTimeout(() => {
        document.body.style.overflow = "";
      }, wait);
    };
    release();
  }, []);

  return (
    <>
      <Preloader />
      <ScrollProgress />
      <CursorFollower />
      <Navbar />
      <main className="relative">
        <Hero />
        <AboutSection />
        <ResearchSection />
        <FeaturedProjects />
        <ExperienceTimeline />
        <EducationTimeline />
        <SkillsToolkit />
        <LeadershipSection />
        <AwardsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
