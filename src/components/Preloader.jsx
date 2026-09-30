import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { finishIntro } from "../intro";
import "./Preloader.css";

const reduce = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function Preloader() {
  const root = useRef(null);
  const count = useRef(null);
  const [gone, setGone] = useState(() => reduce());

  useEffect(() => {
    if (gone) {
      finishIntro();
      return;
    }
    document.documentElement.classList.add("is-loading");
    const counter = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        document.documentElement.classList.remove("is-loading");
        setGone(true);
      },
    });
    tl.from(".preloader__name span", { yPercent: 110, duration: 0.9, stagger: 0.04, ease: "expo.out" })
      .to(counter, {
        v: 100,
        duration: 1.4,
        ease: "power2.inOut",
        onUpdate: () => {
          if (count.current) count.current.textContent = String(Math.round(counter.v)).padStart(3, "0");
        },
      }, 0)
      .to(".preloader__bar i", { scaleX: 1, duration: 1.4, ease: "power2.inOut" }, 0)
      .to(".preloader__inner", { yPercent: -30, autoAlpha: 0, duration: 0.6, ease: "power3.in" }, "+=0.1")
      .add(finishIntro, "-=0.1")
      .to(root.current, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "-=0.2");
    return () => tl.kill();
  }, [gone]);

  if (gone) return null;

  return (
    <div className="preloader" ref={root} aria-hidden="true">
      <div className="preloader__inner">
        <p className="preloader__name display">
          {"Mamatha H.".split("").map((c, i) => (
            <span key={i}>{c === " " ? " " : c}</span>
          ))}
        </p>
        <div className="preloader__row">
          <span className="preloader__role">Full-stack developer — Portfolio</span>
          <span className="preloader__count" ref={count}>000</span>
        </div>
        <div className="preloader__bar"><i /></div>
      </div>
    </div>
  );
}
