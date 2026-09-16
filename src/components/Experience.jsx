import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Experience.css";

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    role: "Python Trainer",
    company: "10000 Coders",
    period: "Jun 2025 – Present",
    points: [
      "Deliver Python programming training and coding practice sessions.",
      "Teach Python fundamentals, OOPs, problem solving, and interview preparation.",
      "Mentor students through assessments, projects, and mock interviews.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Sherpa Vector (Chanakya AI)",
    period: "Jan 2025 – May 2025",
    points: [
      "Developed a Fleet Management System using React.js, Node.js, and MySQL.",
      "Built REST APIs and integrated frontend and backend modules.",
      "Implemented authentication, file uploads, and database operations.",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from([".exp-tag", ".exp-title"], {
        y: -30, opacity: 0, stagger: 0.15, duration: 0.8, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%", toggleActions: "play none none none" },
      });

      gsap.from(".exp-card", {
        x: -60, opacity: 0, stagger: 0.2, duration: 0.7, ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none", once: true },
        onComplete: () => gsap.set(".exp-card", { clearProps: "all" }),
      });

      gsap.from(".exp-line", {
        scaleY: 0, transformOrigin: "top", duration: 1.2, ease: "power2.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", toggleActions: "play none none none", once: true },
      });
    }, sectionRef);

    const fallback = setTimeout(() => {
      gsap.set(".exp-card, .exp-tag, .exp-title, .exp-line", { clearProps: "all" });
    }, 2500);

    return () => { ctx.revert(); clearTimeout(fallback); };
  }, []);

  return (
    <section className="experience" id="experience" ref={sectionRef}>
      <span className="exp-tag">Career So Far</span>
      <h2 className="exp-title">EXPERIENCE</h2>

      <div className="exp-timeline">
        <div className="exp-line" />
        {experienceData.map((exp, i) => (
          <div className="exp-card" key={i}>
            <div className="exp-dot" />
            <div className="exp-content">
              <span className="exp-period">{exp.period}</span>
              <h3>{exp.role}</h3>
              <p className="exp-company">{exp.company}</p>
              <ul>
                {exp.points.map((pt, j) => (
                  <li key={j}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
