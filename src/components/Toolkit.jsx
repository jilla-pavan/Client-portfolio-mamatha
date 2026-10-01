import { skills } from "../data/content";
import "./Toolkit.css";

export default function Toolkit() {
  return (
    <section id="toolkit" className="section toolkit">
      <div className="wrap">
        <header className="head">
          <p className="tag">Technical skills</p>
          <h2 className="display title" data-reveal="lines">
            The <span className="outline">toolkit</span>
          </h2>
          <p className="lead" data-reveal="fade">
            Languages, frameworks, databases and tools I use to take an idea from schema to shipped.
          </p>
        </header>

        <dl className="kit">
          {skills.map((s) => (
            <div key={s.group} className="kit__row" data-reveal="fade">
              <dt>{s.group}</dt>
              <dd>
                {s.items.map((item) => (
                  <span key={item} className="kit__item">{item}</span>
                ))}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
