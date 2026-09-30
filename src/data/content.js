// Single source for the portfolio's copy and links.
// Leave a URL empty ("") to hide that link until the real one exists.

export const profile = {
  name: "Mamatha H",
  role: "Full-stack developer",
  secondaryRole: "Python educator",
  location: "Bengaluru, India",
  email: "mamathadeeksha1061@gmail.com",
  phone: "+91 97319 50523",
  phoneHref: "tel:+919731950523",
  github: "https://github.com/MamathaCoder",
  linkedin: "", // TODO: add the real LinkedIn profile URL
  resume: "", // TODO: drop resume.pdf into /public and set this to "/resume.pdf"
  introVideo: "/videos/intro-talk.mp4",
  introPoster: "/videos/intro-talk-poster.webp",
};

export const education = [
  { degree: "MCA", school: "Kristu Jayanti College, Bengaluru", note: "CGPA 8.06" },
  { degree: "BCA", school: "Vagdevi Vilas College, Bengaluru", note: "CGPA 8.35" },
];

export const certifications = [
  "AWS Cloud Foundations",
  "Microsoft Azure Fundamentals",
  "Java Programming Masterclass",
  "Prompt Engineering — IBM",
  "Python for Beginners — Infosys Springboard",
];

export const experience = [
  {
    role: "Python Trainer",
    company: "10000 Coders",
    period: "Jun 2025 — Present",
    points: [
      "Deliver Python programming training and coding practice sessions.",
      "Teach Python fundamentals, OOP, problem solving and interview preparation.",
      "Mentor students through assessments, projects and mock interviews.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Sherpa Vector (Chanakya AI)",
    period: "Jan 2025 — May 2025",
    points: [
      "Developed a Fleet Management System using React.js, Node.js and MySQL.",
      "Built REST APIs and integrated frontend and backend modules.",
      "Implemented authentication, file uploads and database operations.",
    ],
  },
];

export const skills = [
  { group: "Languages", items: ["Java", "Python", "JavaScript", "SQL"] },
  { group: "Frontend", items: ["React.js", "HTML5", "CSS3", "Bootstrap"] },
  { group: "Backend", items: ["Node.js", "Express.js", "REST APIs", "JWT authentication"] },
  { group: "Core Java", items: ["OOP", "Collections", "JDBC", "Exception handling"] },
  { group: "Data & cloud", items: ["MySQL", "AWS", "Microsoft Azure", "Power BI"] },
  { group: "Tools", items: ["Git & GitHub", "Postman", "VS Code"] },
  { group: "Beyond code", items: ["Teaching & mentoring", "Problem solving", "Communication"] },
];

export const process = [
  { title: "Learn", text: "Keep up with new frameworks and best practices, and understand the problem before choosing the tools." },
  { title: "Design", text: "Shape clean, intuitive interfaces and a scalable architecture before writing a single line of code." },
  { title: "Build", text: "Write clean, maintainable code in React, Node.js, Python and Java to bring the idea to life." },
  { title: "Deploy", text: "Ship fast, reliable applications on AWS or Netlify, with version control and CI/CD pipelines." },
];

export const projects = [
  {
    title: "Fleet Management System",
    context: "Internship · Sherpa Vector (Chanakya AI)",
    description:
      "A full-stack platform for trips, bookings, clients, vendors and alerts — built end to end with authentication, file uploads and REST APIs.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "REST API", "JWT"],
    github: "https://github.com/MamathaCoder",
    live: "",
    video: "/videos/project-01-demo.mp4",
    poster: "/videos/project-01-demo-poster.webp",
  },
  {
    title: "MealMingle",
    subtitle: "AI recipe generator",
    context: "Personal project",
    description:
      "An AI-powered recipe platform: enter the ingredients you have and get personalised meal ideas through smart ingredient matching.",
    tech: ["React.js", "Python", "AI / ML", "REST API"],
    github: "https://github.com/MamathaCoder",
    live: "",
    video: "/videos/project-02-demo.mp4",
    poster: "/videos/project-02-demo-poster.webp",
  },
  {
    title: "Vendor Management System",
    context: "Module of the fleet platform",
    description:
      "Vendor onboarding, contracts, service records and payments in one place — streamlining vendor coordination and approvals.",
    tech: ["React.js", "Node.js", "Express.js", "MySQL", "REST API"],
    github: "https://github.com/MamathaCoder",
    live: "",
    video: "/videos/project-03-demo.mp4",
    poster: "/videos/project-03-demo-poster.webp",
  },
];

export const sections = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "toolkit", label: "Skills" },
  { id: "contact", label: "Contact" },
];
