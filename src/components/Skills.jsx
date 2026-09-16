import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Skills.css";

gsap.registerPlugin(ScrollTrigger);

const skillData = [
  { title: "Languages", skills: [{ name: "Java", level: 88 }, { name: "Python", level: 88 }, { name: "JavaScript", level: 85 }] },
  { title: "Frontend", skills: [{ name: "React.js", level: 85 }, { name: "HTML5 / CSS3", level: 92 }, { name: "Bootstrap", level: 80 }] },
  { title: "Backend", skills: [{ name: "Node.js", level: 80 }, { name: "Express.js", level: 78 }, { name: "REST APIs", level: 88 }] },
  { title: "Core Java", skills: [{ name: "OOPs", level: 90 }, { name: "Collections", level: 85 }, { name: "JDBC", level: 80 }, { name: "Exception Handling", level: 85 }] },
  { title: "Database & Cloud", skills: [{ name: "MySQL", level: 82 }, { name: "SQL", level: 85 }, { name: "AWS", level: 70 }, { name: "Azure", level: 68 }] },
  { title: "Tools & Data", skills: [{ name: "Git & GitHub", level: 88 }, { name: "Postman", level: 85 }, { name: "VS Code", level: 95 }, { name: "Power BI", level: 75 }] },
  { title: "Soft Skills", skills: [{ name: "Teaching / Mentoring", level: 92 }, { name: "Problem Solving", level: 88 }, { name: "Communication", level: 85 }] },
];

export default function Skills() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header text (tag / title / subtitle) — one small chained animation
      gsap.from([".skill-tag", ".skills-title", ".skills-subtitle"], {
        y: -30, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
      });

      // Skill cards animate independently so a hiccup in the header
      // animation can never leave the cards permanently invisible.
      gsap.from(".skill-card", {
        y: 60, opacity: 0, stagger: 0.1, duration: 0.6, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none", once: true },
        onComplete: () => gsap.set(".skill-card", { clearProps: "all" }),
      });

      gsap.from(".progress-bar", {
        width: 0, duration: 1, stagger: 0.04, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none", once: true },
      });
    }, sectionRef);

    // Safety net: if for any reason the scroll animation never fires
    // (e.g. the section is already on screen, or a timing edge case),
    // force everything visible after a short delay so content is never
    // permanently stuck at opacity 0.
    const fallback = setTimeout(() => {
      gsap.set(".skill-card, .skill-tag, .skills-title, .skills-subtitle", { clearProps: "all" });
    }, 2500);

    return () => { ctx.revert(); clearTimeout(fallback); };
  }, []);

  return (
    <section className="skills" id="skills" ref={sectionRef}>
      <span className="skill-tag">Technical Skills</span>
      <h2 className="skills-title">MY SKILLSET</h2>
      <p className="skills-subtitle">
        A comprehensive overview of my programming languages, frameworks, databases and tools.
      </p>
      <div className="skills-container">
        {skillData.map((cat, i) => (
          <div className="skill-card" key={i}>
            <h3>{cat.title}</h3>
            {cat.skills.map((s, j) => (
              <div className="skill" key={j}>
                <div className="skill-info"><span>{s.name}</span><span>{s.level}%</span></div>
                <div className="progress"><div className="progress-bar" style={{ width: `${s.level}%` }} /></div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}
