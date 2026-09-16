import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaReact, FaPython, FaJava, FaNodeJs, FaDatabase } from "react-icons/fa";
import { SiMysql, SiExpress } from "react-icons/si";
import profile from "../assets/profile.png";
import "./About.css";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
      tl.from(".about-left", { y: -120, opacity: 0, duration: 1.4, ease: "power3.out" })
        .from(".about-right > *", { x: 60, opacity: 0, stagger: 0.15, duration: 0.6 }, "-=0.8")
        .from(".tech", { y: 40, opacity: 0, scale: 0.8, stagger: 0.12, duration: 0.5, ease: "back.out(1.7)" }, "-=0.2")
        .call(() => {
          gsap.to(imageRef.current, {
            rotation: 4, duration: 2.5, repeat: -1, yoyo: true,
            ease: "sine.inOut", transformOrigin: "50% 0%",
          });
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about" id="about" ref={sectionRef}>
      <div className="about-container">
        <div className="about-left">
          <div className="hanger">
            <div className="hook"></div>
            <div className="rope rope-left"></div>
            <div className="rope rope-right"></div>
            <div className="image-card" ref={imageRef}>
              <img src={profile} alt="Mamatha H" />
            </div>
          </div>
        </div>

        <div className="about-right">
          <p className="about-eyebrow">About Me</p>
          <h1>Hello! 👋</h1>
          <p>
            Hi, I'm <strong>Mamatha H</strong>, an MCA graduate and Full Stack Developer
            based in Bengaluru, India. I'm passionate about crafting clean, scalable
            software solutions and currently teaching Python to the next generation of developers at 10000 Coders.
          </p>
          <p style={{ marginTop: "1rem", color: "rgba(0,0,0,0.65)" }}>
            I hold an MCA (CGPA 8.06) from Kristu Jayanti College and a BCA (CGPA 8.35) from Vagdevi Vilas College, Bengaluru.
          </p>
          <div className="tech-stack">
            {[
              { icon: <FaReact />, label: "React" },
              { icon: <FaNodeJs />, label: "Node.js" },
              { icon: <FaPython />, label: "Python" },
              { icon: <FaJava />, label: "Java" },
              { icon: <SiMysql />, label: "MySQL" },
            ].map(({ icon, label }) => (
              <div className="tech" key={label}>
                {icon}<span>{label}</span>
              </div>
            ))}
          </div>

          <div className="certifications">
            <p className="cert-heading">Certifications</p>
            <ul>
              <li>AWS Cloud Foundations</li>
              <li>Microsoft Azure Fundamentals</li>
              <li>Java Programming Masterclass</li>
              <li>Prompt Engineering (IBM)</li>
              <li>Python for Beginners (Infosys Springboard)</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="curve"></div>
      <span className="star star1">✦</span>
      <span className="star star2">✦</span>
    </section>
  );
}
