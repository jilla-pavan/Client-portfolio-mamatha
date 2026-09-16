import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import "./Hero.css";

export default function Hero() {
  const introVideoRef = useRef(null);
  const [introPlaying, setIntroPlaying] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".left > *", { y: 60, opacity: 0, stagger: 0.18, duration: 1, ease: "power4.out" });
      gsap.from(".social-icons > *", { x: -80, opacity: 0, stagger: 0.15, duration: 1.5, ease: "power4.out" });
      gsap.from(".right > *", { opacity: 0, scale: 0.6, duration: 1.5, ease: "power4.out" });
    });
    return () => ctx.revert();
  }, []);

  const toggleIntro = () => {
    const v = introVideoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setIntroPlaying(true);
    } else {
      v.pause();
      setIntroPlaying(false);
    }
  };

  return (
    <section className="hero" id="hero">
      {/* Fixed social icons */}
      <div className="social-icons">
        <div><a href="https://github.com/MamathaCoder" target="_blank"><FaGithub /></a></div>
        <div><a href="https://linkedin.com" target="_blank"><FaLinkedin /></a></div>
        <div><a href="mailto:mamathadeeksha1061@gmail.com"><FaEnvelope /></a></div>
      </div>

      {/* Dark overlay */}
      <div className="overlay" />

      {/* Content */}
      <div className="hero-content">
        <div className="left">
          <p className="intro">Hi, I'm</p>
          <h1>
            Mamatha H
            <span>Full Stack Developer</span>
          </h1>
          <p>
            I build scalable full-stack web applications with React.js, Node.js,
            and MySQL — from REST APIs and databases to clean, responsive UIs.
          </p>
          <div className="buttons">
            <button className="primary" onClick={() => window.lenis?.scrollTo(document.getElementById("projects"))}>
              View My Work
            </button>
            <button className="secondary" onClick={() => window.lenis?.scrollTo(document.getElementById("contact"))}>
              Contact Me
            </button>
            <a className="resume" href="/resume.pdf" download>
              Download Resume
            </a>
          </div>
        </div>

        <div className="right">
          <div className="hero-intro-card">
            <video
              ref={introVideoRef}
              className="hero-intro-video"
              playsInline
              controls={introPlaying}
              onPlay={() => setIntroPlaying(true)}
              onPause={() => setIntroPlaying(false)}
              onEnded={() => setIntroPlaying(false)}
            >
              <source src="/videos/intro-talk.mp4" type="video/mp4" />
            </video>
            {!introPlaying && (
              <button className="hero-intro-play" onClick={toggleIntro} aria-label="Play introduction video">
                ▶
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="scroll">Scroll ↓</div>
    </section>
  );
}
