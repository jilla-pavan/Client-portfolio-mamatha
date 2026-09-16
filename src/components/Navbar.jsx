import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./Navbar.css";

export default function Navbar() {
  const navRef = useRef();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".navbar > *", { y: -60, opacity: 0, stagger: 0.15, duration: 1, ease: "power4.out" });
    });
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => { ctx.revert(); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`} ref={navRef}>
      <div className="navbar-inner">
        <div className="logo">Mamatha<span>.dev</span></div>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button className="hire-btn" onClick={() => window.lenis?.scrollTo(document.getElementById("contact"))}>
          Hire Me
        </button>
      </div>
    </nav>
  );
}
