import { useEffect, useRef, useState } from "react";
import { PiPlayFill, PiPauseLight, PiSpeakerSimpleSlashLight, PiSpeakerSimpleHighLight } from "react-icons/pi";
import "./VideoPlate.css";

// A framed demo video that loops silently while on screen
// (unless the visitor prefers reduced motion), with its own controls.
export default function VideoPlate({ src, poster, title, className = "" }) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      ([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()),
      { threshold: 0.35 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const video = ref.current;
    if (!video) return;
    if (video.paused) video.play().catch(() => {});
    else video.pause();
  };

  const toggleSound = () => {
    const video = ref.current;
    if (!video) return;
    video.muted = !video.muted;
    setMuted(video.muted);
  };

  return (
    <div className={`plate video-plate ${className}`} data-cursor={playing ? "Pause" : "Play"}>
      <video
        ref={ref}
        src={src}
        poster={poster}
        playsInline
        preload="none"
        muted
        loop
        onClick={toggle}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        aria-label={title}
      />
      <div className="video-plate__controls">
        <button onClick={toggle} aria-label={playing ? `Pause ${title}` : `Play ${title}`}>
          {playing ? <PiPauseLight aria-hidden="true" /> : <PiPlayFill aria-hidden="true" />}
        </button>
        <button onClick={toggleSound} aria-label={muted ? "Turn sound on" : "Turn sound off"}>
          {muted ? <PiSpeakerSimpleSlashLight aria-hidden="true" /> : <PiSpeakerSimpleHighLight aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}
