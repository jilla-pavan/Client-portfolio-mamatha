import { useRef, useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaUpload, FaPlay, FaPause } from "react-icons/fa";
import "./Projects.css";

const projects = [
  {
    id: "01", title: "Fleet Management System",
    description: "A full-stack platform for trip, booking, client, vendor, and alert management. Built end-to-end during my internship at Sherpa Vector (Chanakya AI) with authentication, file uploads, and REST APIs.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "REST API", "JWT"],
    github: "https://github.com/MamathaCoder", live: "#",
    video: "/videos/project-01-demo.mp4",
  },
  {
    id: "02", title: "MealMingle — AI Recipe Generator",
    description: "An AI-powered recipe recommendation platform that generates personalized meal ideas using smart ingredient matching. Users input available ingredients and get curated recipes instantly.",
    tech: ["React.js", "Python", "AI/ML", "REST API"],
    github: "https://github.com/MamathaCoder", live: "#",
    video: "/videos/project-02-demo.mp4",
  },
  {
    id: "03", title: "Vendor Management System",
    description: "A dedicated module for managing vendor onboarding, contracts, service records, and payments — built as part of the Fleet Management platform to streamline vendor coordination and approvals.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "REST API"],
    github: "https://github.com/MamathaCoder", live: "#",
    video: "/videos/project-03-demo.mp4",
  },
];

function VideoSlot({ projectId, defaultVideo }) {
  const [video, setVideo] = useState(defaultVideo || null);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);
  const inputRef = useRef(null);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setVideo(URL.createObjectURL(file));
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
    setPlaying(!videoRef.current.paused);
  };

  return (
    <div className="video-slot">
      {video ? (
        <>
          <video ref={videoRef} src={video} loop playsInline className="project-video" />
          <button className="play-overlay" onClick={togglePlay}>{playing ? <FaPause /> : <FaPlay />}</button>
        </>
      ) : (
        <div className="video-placeholder">
          <FaPlay className="play-icon" />
          <span>Add Demo Video</span>
        </div>
      )}
      <button className="upload-btn" onClick={() => inputRef.current?.click()}>
        <FaUpload /> {video ? "Change" : "Upload Video"}
      </button>
      <input ref={inputRef} type="file" accept="video/*" style={{ display: "none" }} onChange={handleUpload} />
    </div>
  );
}

export default function Projects() {
  return (
    <section className="projects" id="projects">
      <div className="projects-top">
        <span className="tag">★ Featured Projects</span>
        <h2>Work that speaks<br />for itself</h2>
        <p>Projects that showcase my expertise in full-stack development and modern architecture.</p>
      </div>

      <div className="project-list">
        {projects.map((p) => (
          <div className="project-card" key={p.id}>
            <VideoSlot projectId={p.id} defaultVideo={p.video} />
            <div className="project-info">
              <span className="project-label">★ Featured Project</span>
              <div className="project-heading">
                <h3>{p.id}</h3>
                <h1>{p.title}</h1>
              </div>
              <p className="description">{p.description}</p>
              <div className="tech-stack">{p.tech.map((t) => <span key={t}>{t}</span>)}</div>
              <div className="buttons">
                <a href={p.github} target="_blank" rel="noreferrer"><FaGithub /> GitHub</a>
                <a href={p.live}><FaExternalLinkAlt /> Live Demo</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
