import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./Cursor.css";

// Gold ring cursor with a trailing lag, labels over media, and magnetic buttons.
// Only on devices with a precise pointer.
export default function Cursor() {
  const ring = useRef(null);
  const label = useRef(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    document.documentElement.classList.add("has-cursor");

    const el = ring.current;
    const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3.out" });

    const move = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e) => {
      const media = e.target.closest("[data-cursor]");
      const link = e.target.closest("a, button, input, textarea, label");
      el.classList.toggle("is-media", !!media);
      el.classList.toggle("is-link", !media && !!link);
      if (label.current) label.current.textContent = media ? media.dataset.cursor : "";
    };
    const leave = () => el.classList.add("is-hidden");
    const enter = () => el.classList.remove("is-hidden");

    // Magnetic pull on [data-magnetic]
    const magnets = [...document.querySelectorAll("[data-magnetic]")];
    const handlers = magnets.map((m) => {
      const mx = gsap.quickTo(m, "x", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const my = gsap.quickTo(m, "y", { duration: 0.6, ease: "elastic.out(1, 0.4)" });
      const onMove = (e) => {
        const r = m.getBoundingClientRect();
        mx((e.clientX - (r.left + r.width / 2)) * 0.3);
        my((e.clientY - (r.top + r.height / 2)) * 0.3);
      };
      const onLeave = () => {
        mx(0);
        my(0);
      };
      m.addEventListener("mousemove", onMove);
      m.addEventListener("mouseleave", onLeave);
      return () => {
        m.removeEventListener("mousemove", onMove);
        m.removeEventListener("mouseleave", onLeave);
      };
    });

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    document.documentElement.addEventListener("mouseleave", leave);
    document.documentElement.addEventListener("mouseenter", enter);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      document.documentElement.removeEventListener("mouseleave", leave);
      document.documentElement.removeEventListener("mouseenter", enter);
      handlers.forEach((off) => off());
    };
  }, []);

  return (
    <div className="cursor" ref={ring} aria-hidden="true">
      <span className="cursor__dot" />
      <span className="cursor__label" ref={label} />
    </div>
  );
}
