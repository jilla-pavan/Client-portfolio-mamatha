import { certifications, experience, projects } from "../data/content";
import "./Stats.css";

const stats = [
  { value: projects.length, label: "Featured projects" },
  { value: experience.length, label: "Professional roles" },
  { value: certifications.length, label: "Certifications" },
  { value: 8.06, decimals: 2, label: "MCA CGPA" },
];

export default function Stats() {
  return (
    <section className="stats" aria-label="At a glance">
      <div className="wrap stats__grid">
        {stats.map((s) => (
          <div key={s.label} className="stat" data-reveal="fade">
            <strong className="display" data-count={s.value} data-decimals={s.decimals || 0}>
              {s.value.toFixed(s.decimals || 0)}
            </strong>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
