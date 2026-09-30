import { certifications, education, profile } from "../data/content";
import portrait from "../assets/portrait.webp";
import "./About.css";

const stack = ["React", "Node.js", "Python", "Java", "MySQL"];

export default function About() {
  return (
    <section id="about" className="section about">
      <div className="wrap about__grid">
        <figure className="about__portrait" data-reveal="plate">
          <div className="about__frame">
            <img src={portrait} alt="Portrait of Mamatha H" width="960" height="1201" loading="lazy" />
          </div>
          <figcaption>
            <span>{profile.name}</span>
            <span>{profile.location}</span>
          </figcaption>
        </figure>

        <div className="about__text">
          <p className="tag">About me</p>
          <h2 className="display title" data-reveal="lines">
            A developer <span className="accent">who teaches</span>
          </h2>
          <p className="about__lead" data-scrub>
            I’m Mamatha, an MCA graduate and full-stack developer based in Bengaluru. I’m passionate
            about crafting clean, scalable software — and about teaching Python to the next
            generation of developers.
          </p>

          <dl className="about__facts">
            <div className="about__fact" data-reveal="fade">
              <dt>Education</dt>
              <dd>
                {education.map((e) => (
                  <p key={e.degree}>
                    <strong>{e.degree}</strong> · {e.school} <em>{e.note}</em>
                  </p>
                ))}
              </dd>
            </div>
            <div className="about__fact" data-reveal="fade">
              <dt>Certifications</dt>
              <dd>
                <ul className="about__certs">
                  {certifications.map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </dd>
            </div>
            <div className="about__fact" data-reveal="fade">
              <dt>Works with</dt>
              <dd className="about__stack">{stack.join(" · ")}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
