import { PiArrowUpRightLight, PiArrowRightLight } from "react-icons/pi";
import { projects } from "../data/content";
import VideoPlate from "./VideoPlate";
import "./Work.css";

const pad = (n) => String(n).padStart(2, "0");

export default function Work() {
  return (
    <section id="work" className="work">
      <div className="work__pin">
        <div className="work__track">
          <div className="work__intro">
            <p className="tag">Featured projects</p>
            <h2 className="display title" data-reveal="lines">
              Work that <span className="outline">speaks</span> for itself
            </h2>
            <p className="lead" data-reveal="fade">
              Three applications built end to end — from database schema and REST APIs to the
              interface people use every day.
            </p>
            <p className="work__hint" aria-hidden="true">
              Scroll to explore <PiArrowRightLight />
            </p>
          </div>

          {projects.map((p, i) => (
            <article key={p.title} className="work__panel">
              <span className="work__num display outline" aria-hidden="true">{pad(i + 1)}</span>
              <VideoPlate className="work__media" src={p.video} poster={p.poster} title={`${p.title} demo`} />
              <div className="work__text">
                <p className="work__count">
                  <span>{pad(i + 1)}</span> / {pad(projects.length)} · {p.context}
                </p>
                <h3 className="work__title display">
                  {p.title}
                  {p.subtitle && <span className="accent"> {p.subtitle}</span>}
                </h3>
                <p className="work__desc">{p.description}</p>
                <ul className="work__tech" aria-label="Built with">
                  {p.tech.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <div className="work__links">
                  {p.github && (
                    <a className="btn btn--ghost" href={p.github} target="_blank" rel="noreferrer">
                      GitHub <PiArrowUpRightLight aria-hidden="true" />
                    </a>
                  )}
                  {p.live && (
                    <a className="btn btn--fill" href={p.live} target="_blank" rel="noreferrer">
                      Live site <PiArrowUpRightLight aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="work__progress" aria-hidden="true"><i /></div>
      </div>
    </section>
  );
}
