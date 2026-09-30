import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { introDone } from "./intro";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EASE = "expo.out";
const onScroll = (el, start = "top 85%") => ({ trigger: el, start, once: true });

// All page motion lives here. Content is visible by default; the .motion-ok
// class (set in index.html) hides reveal targets only when motion will run.
export function setupMotion() {
  const mm = gsap.matchMedia();

  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const splits = [];

    /* ---------- Hero: follows the loader ---------- */
    const heroLines = gsap.utils.toArray(".hero__title .ln > span");
    const heroFades = gsap.utils.toArray("[data-hero-fade]");
    gsap.set(heroFades, { autoAlpha: 0, y: 24 });
    introDone.then(() => {
      gsap
        .timeline()
        .fromTo(".hero__bg", { scale: 1.18 }, { scale: 1, duration: 2.4, ease: EASE }, 0)
        .to(heroLines, { yPercent: 0, y: 0, duration: 1.3, stagger: 0.12, ease: EASE }, 0.05)
        .to(heroFades, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.1, ease: EASE }, 0.5);
    });
    // Background drifts slower than the page
    gsap.to(".hero__bg", {
      yPercent: 14,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true },
    });
    gsap.to(".hero__content", {
      yPercent: -12,
      autoAlpha: 0.2,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "center center", end: "bottom top", scrub: true },
    });

    /* ---------- Headings rise line by line ---------- */
    gsap.utils.toArray('[data-reveal="lines"]').forEach((el) => {
      gsap.set(el, { visibility: "visible" });
      splits.push(
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          linesClass: "line",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.3,
              stagger: 0.1,
              ease: EASE,
              scrollTrigger: onScroll(el),
            }),
        })
      );
    });

    /* ---------- Plates unveil upward ---------- */
    gsap.utils.toArray('[data-reveal="plate"]').forEach((el) => {
      const media = el.querySelector("img, video");
      gsap
        .timeline({ scrollTrigger: onScroll(el) })
        .set(el, { visibility: "visible" })
        .fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: EASE })
        .from(media, { scale: 1.25, duration: 2, ease: EASE }, 0);
    });

    /* ---------- Supporting copy settles in ---------- */
    const fades = gsap.utils.toArray('[data-reveal="fade"]');
    gsap.set(fades, { autoAlpha: 0, y: 30 });
    ScrollTrigger.batch(fades, {
      start: "top 90%",
      once: true,
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, duration: 1.1, stagger: 0.1, ease: EASE }),
    });

    /* ---------- About: words light up as you read ---------- */
    gsap.utils.toArray("[data-scrub]").forEach((el) => {
      const split = SplitText.create(el, { type: "words" });
      splits.push(split);
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: 0.6 },
        }
      );
    });

    /* ---------- Counters ---------- */
    gsap.utils.toArray("[data-count]").forEach((el) => {
      const to = parseFloat(el.dataset.count);
      const dec = parseInt(el.dataset.decimals, 10) || 0;
      const n = { v: 0 };
      el.textContent = (0).toFixed(dec);
      gsap.to(n, {
        v: to,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: onScroll(el, "top 90%"),
        onUpdate: () => (el.textContent = n.v.toFixed(dec)),
      });
    });

    /* ---------- Marquees: constant drift, pushed by scroll speed ---------- */
    const loops = gsap.utils.toArray("[data-marquee]").map((el) => {
      const dir = parseFloat(el.dataset.marquee);
      const track = el.querySelector(".marquee__track");
      return gsap.fromTo(
        track,
        { xPercent: dir > 0 ? 0 : -50 },
        { xPercent: dir > 0 ? -50 : 0, duration: 40, ease: "none", repeat: -1 }
      );
    });
    const boost = ScrollTrigger.create({
      onUpdate: (self) => {
        const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 250);
        loops.forEach((t) => {
          gsap.to(t, { timeScale: 1 + Math.abs(v), duration: 0.2, overwrite: true });
          gsap.to(t, { timeScale: 1, duration: 1.2, delay: 0.2, overwrite: false });
        });
      },
    });

    /* ---------- Section parallax for the oversized signature ---------- */
    gsap.from(".contact__sign", {
      yPercent: 40,
      ease: "none",
      scrollTrigger: { trigger: ".contact__sign", start: "top bottom", end: "bottom bottom", scrub: true },
    });

    return () => {
      boost.kill();
      splits.forEach((s) => s.revert());
    };
  });

  /* ---------- Work: pinned horizontal gallery on large screens ---------- */
  mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
    const track = document.querySelector(".work__track");
    if (!track) return;
    const distance = () => track.scrollWidth - window.innerWidth;
    const tween = gsap.to(track, {
      x: () => -distance(),
      ease: "none",
      scrollTrigger: {
        trigger: ".work__pin",
        start: "top top",
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 1,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    });
    gsap.to(".work__progress i", {
      scaleX: 1,
      ease: "none",
      scrollTrigger: { trigger: ".work__pin", start: "top top", end: () => `+=${distance()}`, scrub: true },
    });
    // Each panel's number slides against the scroll for depth
    gsap.utils.toArray(".work__num").forEach((num) => {
      gsap.fromTo(
        num,
        { xPercent: 40 },
        {
          xPercent: -40,
          ease: "none",
          scrollTrigger: {
            trigger: num.parentElement,
            containerAnimation: tween,
            start: "left right",
            end: "right left",
            scrub: true,
          },
        }
      );
    });
  });

  return () => mm.revert();
}

export { gsap, ScrollTrigger };
