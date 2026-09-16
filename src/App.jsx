import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Process from "./components/Process";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, smoothWheel: true });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);

    // Intercept in-page anchor clicks (nav links, "View My Work", etc.)
    // and hand them to Lenis, otherwise Lenis's own render loop fights
    // the browser's native instant jump and the click appears to do nothing.
    const handleAnchorClick = (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const id = anchor.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: 0, duration: 1.2 });
    };
    document.addEventListener("click", handleAnchorClick);
    window.lenis = lenis;

    // Recalculate ScrollTrigger start/end positions once everything
    // (fonts, images, layout) has actually settled — otherwise triggers
    // computed too early can end up misaligned with real content.
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 1000);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.removeEventListener("load", refresh);
      clearTimeout(t);
      window.lenis = null;
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Experience />
      <Skills />
      <Process />
      <Projects />
      <Contact />
    </>
  );
}

export default App;
