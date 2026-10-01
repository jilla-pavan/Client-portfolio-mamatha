import { useEffect, useState } from "react";
import { PiArrowUpRightLight } from "react-icons/pi";
import { profile, sections } from "../data/content";
import "./Masthead.css";

export default function Masthead() {
  const [current, setCurrent] = useState("hero");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const ids = ["hero", "work", "about", "experience", "toolkit", "method", "contact"];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setCurrent(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const bar = document.querySelector(".masthead__progress");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      setScrolled(window.scrollY > 40);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("menu-open", open);
    if (open) window.lenis?.stop();
    else window.lenis?.start();
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={`masthead${scrolled ? " is-scrolled" : ""}`}>
        <div className="masthead__bar wrap">
          <a href="#hero" className="logo" onClick={() => setOpen(false)}>
            <span className="logo__name">Mamatha H<i>.</i></span>
            <small>Full-stack developer</small>
          </a>

          <nav className="masthead__nav" aria-label="Primary">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className={current === s.id ? "is-on" : ""}>
                {s.label}
              </a>
            ))}
          </nav>

          <a className="btn btn--fill masthead__cta" href="#contact" data-magnetic>
            Hire me <PiArrowUpRightLight aria-hidden="true" />
          </a>

          <button
            className="burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="menu"
            onClick={() => setOpen((o) => !o)}
          >
            <i />
            <i />
          </button>
        </div>
        <div className="masthead__progress" aria-hidden="true" />
      </header>

      <div id="menu" className={`menu${open ? " is-open" : ""}`} aria-hidden={!open}>
        <nav className="menu__nav wrap" aria-label="Mobile">
          {sections.map((s, i) => (
            <a key={s.id} href={`#${s.id}`} onClick={() => setOpen(false)} tabIndex={open ? 0 : -1} style={{ "--i": i }}>
              {s.label}
            </a>
          ))}
        </nav>
        <div className="menu__foot wrap">
          <a className="btn btn--fill" href={`mailto:${profile.email}`} tabIndex={open ? 0 : -1}>
            Email Mamatha <PiArrowUpRightLight aria-hidden="true" />
          </a>
          <span>{profile.location}</span>
        </div>
      </div>
    </>
  );
}
