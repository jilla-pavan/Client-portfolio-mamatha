import { process } from "../data/content";
import "./Method.css";

export default function Method() {
  return (
    <section id="method" className="section method">
      <div className="wrap">
        <header className="head">
          <p className="tag">My process</p>
          <h2 className="display title" data-reveal="lines">
            Ideas into <span className="outline">real</span> applications
          </h2>
          <p className="lead" data-reveal="fade">
            A structured approach that turns concepts into robust full-stack applications that solve
            real problems.
          </p>
        </header>

        <ol className="steps">
          {process.map((step, i) => (
            <li key={step.title} className="step" data-reveal="fade">
              <span className="step__num">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="step__title display">{step.title}</h3>
              <p className="step__text">{step.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
