import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import "./Contact.css";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef(null);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".contact__animate",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, ease: "power2.out",
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" } }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact__inner">
        <div className="contact__text contact__animate">
          <p className="eyebrow">Let's Connect</p>
          <h2>Let's Build Something Great Together</h2>
          <p className="contact__sub">
            Open to full-time roles, freelance projects, and collaborations.
            I respond within 24 hours — let's make something amazing!
          </p>
          <div className="contact__links">
            <a href="mailto:mamathadeeksha1061@gmail.com"><FaEnvelope /> mamathadeeksha1061@gmail.com</a>
            <a href="tel:+919731950523"><FaPhone /> +91 97319 50523</a>
            <a href="https://linkedin.com" target="_blank"><FaLinkedin /> LinkedIn Profile</a>
            <a href="https://github.com/MamathaCoder" target="_blank"><FaGithub /> github.com/MamathaCoder</a>
            <a href="#"><FaMapMarkerAlt /> Bengaluru, Karnataka</a>
          </div>
        </div>

        <form className="contact__form contact__animate" onSubmit={handleSubmit}>
          {submitted ? (
            <div className="contact__success">Message sent! I'll get back to you within 24 hours. 🚀</div>
          ) : (
            <>
              <div className="contact__row">
                <input type="text" placeholder="Your name" required />
                <input type="email" placeholder="Email address" required />
              </div>
              <input type="text" placeholder="Subject / Role you're hiring for" required />
              <textarea rows="5" placeholder="Tell me about the opportunity or project..." required />
              <button type="submit" className="submit-btn">Send Message →</button>
            </>
          )}
        </form>
      </div>

      <footer className="footer">
        <div className="footer__inner">
          <span>© {new Date().getFullYear()} Mamatha H · All rights reserved.</span>
          <div className="footer__links">
            <a href="#hero">Home</a>
            <a href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>
    </section>
  );
}
