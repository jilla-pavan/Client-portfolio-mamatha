import { experience } from "../data/content";
import "./Experience.css";

export default function Experience() {
  return (
    <section id="experience" className="section experience">
      <div className="wrap">
        <header className="head">
          <p className="tag">Career so far</p>
          <h2 className="display title" data-reveal="lines">
            Experi<span className="outline">ence</span>
          </h2>
          <p className="lead" data-reveal="fade">
            From building production modules as an intern to mentoring the next cohort of Python
            developers.
          </p>
        </header>

        <ol className="jobs">
          {experience.map((job) => (
            <li key={job.company} className="job" data-reveal="fade">
              <div className="job__meta">
                <span className="job__period">{job.period}</span>
                <span className="job__company">{job.company}</span>
              </div>
              <h3 className="job__role display">{job.role}</h3>
              <ul className="job__points">
                {job.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
