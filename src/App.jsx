import { useEffect } from "react";
import Lenis from "lenis";
import { setupMotion, gsap, ScrollTrigger } from "./motion";
import { skills } from "./data/content";

import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import Masthead from "./components/Masthead";
import Hero from "./components/Hero";
import Marquee from "./components/Marquee";
import Work from "./components/Work";
import About from "./components/About";
import Stats from "./components/Stats";
import Experience from "./components/Experience";
import Toolkit from "./components/Toolkit";
import Method from "./components/Method";
import Contact from "./components/Contact";

const reduceMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const bandA = ["React", "Node.js", "Python", "Java", "MySQL", "Express", "REST APIs"];
const bandB = skills.flatMap((s) => s.items).filter((s) => !bandA.includes(s)).slice(0, 8);

export default function App() {
  useEffect(() => {
    const lenis = reduceMotion() ? null : new Lenis({ duration: 1.2, smoothWheel: true });
    const raf = (time) => lenis?.raf(time * 1000);
    if (lenis) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    // Route in-page anchors through Lenis so its loop doesn't fight the native jump.
    const onClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href").slice(1);
      const target = id ? document.getElementById(id) : document.body;
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target, { duration: 1.4 });
      else target.scrollIntoView();
      history.replaceState(null, "", id ? `#${id}` : " ");
    };
    document.addEventListener("click", onClick);
    window.lenis = lenis;

    // Split headings only once the real fonts are in, so line breaks are final.
    let cleanupMotion = () => {};
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (cancelled) return;
      cleanupMotion = setupMotion();
      ScrollTrigger.refresh();
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);

    return () => {
      cancelled = true;
      cleanupMotion();
      document.removeEventListener("click", onClick);
      window.removeEventListener("load", refresh);
      window.lenis = null;
      if (lenis) {
        gsap.ticker.remove(raf);
        lenis.destroy();
      }
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#work">Skip to work</a>
      <Preloader />
      <Cursor />
      <Masthead />
      <main>
        <Hero />
        <div className="marquees" aria-label="Technologies">
          <Marquee items={bandA} />
          <Marquee items={bandB} outline reverse />
        </div>
        <Work />
        <About />
        <Stats />
        <Experience />
        <Toolkit />
        <Method />
      </main>
      <Contact />
    </>
  );
}
