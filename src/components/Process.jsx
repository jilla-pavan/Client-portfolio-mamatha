import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Process.css";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { num: "01", title: "Learn", desc: "I continuously learn new technologies and keep my skills up to date with the latest frameworks and best practices.", color: "#ff2525", rotate: "7deg", pos: "research" },
  { num: "02", title: "Design", desc: "Creating clean, intuitive interfaces and scalable architecture before writing a single line of code.", color: "#111827", rotate: "-5deg", pos: "design" },
  { num: "03", title: "Build", desc: "Writing clean, maintainable code using React, Node.js, Python and Java to bring ideas to life.", color: "#111827", rotate: "5deg", pos: "build" },
  { num: "04", title: "Deploy", desc: "Delivering fast, reliable applications on AWS or Netlify with CI/CD pipelines and version control.", color: "#ff2525", rotate: "-5deg", pos: "deploy" },
];

export default function Process() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".process-title", { y: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } });
      gsap.from(".process-card", { scale: 0.8, opacity: 0, stagger: 0.25, duration: 1, ease: "power3.out", scrollTrigger: { trigger: sectionRef.current, start: "top 70%" } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="process" ref={sectionRef}>
      <div className="process-left">
        <span className="badge">My Process</span>
        <h1 className="process-title">Here's how I<br />turn ideas into<br />real-world<br />applications</h1>
        <p>I follow a structured, creative approach to turn concepts into robust full-stack applications that solve real problems.</p>
      </div>
      <div className="process-right">
        <svg className="process-path" viewBox="0 0 600 900">
          <path d="M450 50 C560 120 520 190 420 250 S180 340 190 420 S480 540 420 640 S180 760 200 860" fill="none" stroke="#ccc" strokeWidth="3" strokeLinecap="round" strokeDasharray="8 10" />
        </svg>
        {steps.map((s) => (
          <div key={s.num} className={`process-card ${s.pos}`} style={{ background: s.color, transform: `rotate(${s.rotate})` }}>
            <span>{s.num}</span>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
