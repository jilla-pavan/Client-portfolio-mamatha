import { useEffect, useRef } from "react";
import { PiXLight } from "react-icons/pi";
import "./Lightbox.css";

// Full-screen player for the intro film, with sound.
export default function Lightbox({ open, onClose, src, poster, title }) {
  const video = useRef(null);
  const closeBtn = useRef(null);

  useEffect(() => {
    const v = video.current;
    if (!v) return;
    if (open) {
      window.lenis?.stop();
      v.currentTime = 0;
      v.play().catch(() => {});
      closeBtn.current?.focus();
      const onKey = (e) => e.key === "Escape" && onClose();
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    v.pause();
    window.lenis?.start();
  }, [open, onClose]);

  return (
    <div
      className={`lightbox${open ? " is-open" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label={title}
      aria-hidden={!open}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <button ref={closeBtn} className="lightbox__close" onClick={onClose} tabIndex={open ? 0 : -1}>
        Close <PiXLight aria-hidden="true" />
      </button>
      <div className="lightbox__frame">
        <video ref={video} src={src} poster={poster} controls playsInline preload="none" />
      </div>
    </div>
  );
}
