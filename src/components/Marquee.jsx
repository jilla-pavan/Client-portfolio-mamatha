import "./Marquee.css";

// An endless band of words; motion.js drives it and lets scroll speed push it.
export default function Marquee({ items, outline = false, reverse = false }) {
  const run = (hidden) => (
    <div className="marquee__run" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <span key={item} className="marquee__item">
          <span className={outline ? "outline" : undefined}>{item}</span>
          <svg className="marquee__star" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M10 0 12.2 7.8 20 10 12.2 12.2 10 20 7.8 12.2 0 10 7.8 7.8Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );

  return (
    <div className="marquee display" data-marquee={reverse ? "-1" : "1"}>
      <div className="marquee__track">
        {run(false)}
        {run(true)}
      </div>
    </div>
  );
}
