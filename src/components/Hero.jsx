import { useCallback, useState } from "react";
import { PiArrowDownLight, PiPlayFill } from "react-icons/pi";
import { profile } from "../data/content";
import Lightbox from "./Lightbox";
import "./Hero.css";

export default function Hero() {
  const [film, setFilm] = useState(false);
  const close = useCallback(() => setFilm(false), []);

  return (
    <section id="hero" className="hero" data-hero>
      <div className="hero__bg" aria-hidden="true" style={{ backgroundImage: `url(${profile.introPoster})` }}>
        <video
          className="hero__video"
          src={profile.introVideo}
          poster={profile.introPoster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </div>

      <div className="hero__content wrap">
        <p className="tag hero__tag" data-hero-fade>
          {profile.role} · {profile.location}
        </p>

        <h1 className="hero__title display">
          <span className="ln"><span>Mamatha H.</span></span>
          <span className="ln"><span className="outline">Full-stack</span></span>
          <span className="ln"><span>Developer<span className="accent"> &amp; educator</span></span></span>
        </h1>

        <div className="hero__foot">
          <p className="hero__sub" data-hero-fade>
            I build scalable web applications with React, Node.js and MySQL — from REST APIs and
            databases to clean, responsive interfaces. Currently teaching Python at 10000 Coders.
          </p>
          <div className="hero__cta" data-hero-fade>
            <a className="btn btn--fill" href="#work" data-magnetic>
              View my work <PiArrowDownLight aria-hidden="true" />
            </a>
            <button className="btn btn--ghost" onClick={() => setFilm(true)} data-magnetic>
              <PiPlayFill aria-hidden="true" /> Watch intro
            </button>
          </div>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">Scroll</div>

      <Lightbox
        open={film}
        onClose={close}
        src={profile.introVideo}
        poster={profile.introPoster}
        title="Introduction from Mamatha"
      />
    </section>
  );
}
