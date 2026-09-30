import { useState } from "react";
import { PiArrowUpRightLight, PiArrowUpLight } from "react-icons/pi";
import { profile } from "../data/content";
import "./Contact.css";

export default function Contact() {
  const [sent, setSent] = useState(false);

  // No backend: compose the message in the visitor's own mail app.
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const subject = data.get("subject") || "Hello from your portfolio";
    const body = `${data.get("message")}\n\n— ${data.get("name")} (${data.get("email")})`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const links = [
    { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { label: "Phone", value: profile.phone, href: profile.phoneHref },
    { label: "GitHub", value: profile.github.replace("https://", ""), href: profile.github, external: true },
    profile.linkedin && { label: "LinkedIn", value: "View profile", href: profile.linkedin, external: true },
    { label: "Based in", value: profile.location },
  ].filter(Boolean);

  return (
    <>
      <section className="cta" aria-label="Work together">
        <div className="wrap cta__inner">
          <p className="cta__tag">Open to full-time roles, freelance &amp; collaborations</p>
          <h2 className="display cta__title" data-reveal="lines">
            Have a project in mind?
          </h2>
          <div className="cta__row" data-reveal="fade">
            <a className="btn cta__btn" href="#contact" data-magnetic>
              Start a conversation <PiArrowUpRightLight aria-hidden="true" />
            </a>
            <a className="cta__mail" href={`mailto:${profile.email}`}>{profile.email}</a>
          </div>
        </div>
      </section>

      <footer id="contact" className="contact">
        <div className="wrap">
          <div className="contact__grid">
            <div className="contact__direct">
              <p className="tag">Let’s connect</p>
              <h2 className="display title" data-reveal="lines">
                Let’s build something <span className="accent">together.</span>
              </h2>
              <p className="lead" data-reveal="fade">
                I reply within 24 hours — tell me about the role or the project.
              </p>
              <dl className="contact__links" data-reveal="fade">
                {links.map((l) => (
                  <div key={l.label}>
                    <dt>{l.label}</dt>
                    <dd>
                      {l.href ? (
                        <a href={l.href} {...(l.external ? { target: "_blank", rel: "noreferrer" } : {})}>
                          {l.value}
                        </a>
                      ) : (
                        l.value
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <form className="contact__form" onSubmit={handleSubmit} data-reveal="fade">
              <div className="field">
                <input id="f-name" name="name" type="text" autoComplete="name" placeholder=" " required />
                <label htmlFor="f-name">Your name</label>
              </div>
              <div className="field">
                <input id="f-email" name="email" type="email" autoComplete="email" placeholder=" " required />
                <label htmlFor="f-email">Email address</label>
              </div>
              <div className="field">
                <input id="f-subject" name="subject" type="text" placeholder=" " />
                <label htmlFor="f-subject">Role or project</label>
              </div>
              <div className="field">
                <textarea id="f-message" name="message" rows="4" placeholder=" " required />
                <label htmlFor="f-message">Message</label>
              </div>
              <div className="contact__submit">
                <button type="submit" className="btn btn--fill" data-magnetic>
                  Send message <PiArrowUpRightLight aria-hidden="true" />
                </button>
                <p className="contact__hint" role="status">
                  {sent
                    ? "Your mail app should now be open with the message ready to send."
                    : "Opens your mail app with the message filled in."}
                </p>
              </div>
            </form>
          </div>

          <p className="contact__sign display" aria-hidden="true">
            Mamatha<span>H.</span>
          </p>

          <div className="colophon">
            <p>© {new Date().getFullYear()} {profile.name} · All rights reserved</p>
            <a href="#hero" className="colophon__top">
              Back to top <PiArrowUpLight aria-hidden="true" />
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
