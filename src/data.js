// ---------------------------------------------------------------
// Edit this file to make the portfolio yours. Everything on the
// page reads from here.
// ---------------------------------------------------------------

export const profile = {
  first: 'Chukwuma',
  last: 'Dibia',
  role: 'Software Engineer',
  tagline: 'I build interfaces that feel alive.',
  taglineSub:
    'Computer Science at Stony Brook University, React on the front end, Java and Python underneath.',
  location: 'Brooklyn, NY',
  email: 'chukwumadibia@gmail.com',
  available: true,
  availableLabel: 'Open to Summer 2027 internships',
  socials: [
    { label: 'LinkedIn', href: 'https://linkedin.com/in/chukwumadibia' },
    { label: 'GitHub', href: 'https://github.com/' }, // <- add your handle
    { label: 'Email', href: 'mailto:chukwumadibia@gmail.com' },
  ],
}

export const about = {
  intro:
    'I’m a computer science student who cares about the last 10% — the easing curve, the 4px nudge, the frame that drops. I like building things people actually touch.',
  body:
    'BS in Computer Science at Stony Brook University (Class of 2029, Presidential Scholarship). Currently supporting a 10,000+ person campus at Stony Brook’s Division of IT. Previously built React components for Truth Bridge and researched a document management system for the NYC Department of Education. Looking for a software engineering internship for Summer 2027.',
  stats: [
    { value: 10, suffix: 'k+', label: 'Campus users supported' },
    { value: 1, suffix: 'M+', label: 'Users in scope of DOE research' },
    { value: 60, suffix: '%', label: 'Mentees admitted to specialized HS' },
  ],
}

export const projects = [
  {
    title: 'Student Dashboard Redesign',
    category: 'Truth Bridge · React',
    year: '2025',
    role: 'Web Development Intern',
    description:
      'Part of a major redesign of the Truth Bridge website. I built and tested reusable React UI components for the student dashboard, tightening the interaction model and making the section faster to extend.',
    link: null, // e.g. 'https://truthbridge.org'
    tags: ['React', 'Reusable UI', 'Testing'],
    gradient: 'linear-gradient(135deg, #c8ff3d 0%, #1f2a08 60%, #0b0b0c 100%)',
    href: '#',
  },
  {
    title: 'College Matching Platform',
    category: 'Truth Bridge · Figma to code',
    year: '2025',
    role: 'Web Development Intern',
    description:
      'Designed and prototyped new user-facing features for a college matching platform, translating Figma designs into responsive, interactive React.js components.',
    link: null,
    tags: ['React.js', 'Figma', 'Responsive'],
    gradient: 'linear-gradient(135deg, #6a5cff 0%, #1a1650 55%, #0b0b0c 100%)',
    href: '#',
  },
  {
    title: 'DOE Document System Research',
    category: 'NYC DOE · Project scoping',
    year: '2024',
    role: 'Project Scope Researcher',
    description:
      'Researched requirements for a new document management system serving over a million NYC DOE users. Synthesised findings into a presentation for key stakeholders that directly shaped the final feature prioritisation.',
    link: null,
    tags: ['Research', 'Stakeholder decks', '1M+ users'],
    gradient: 'linear-gradient(135deg, #ff7a3d 0%, #4a1f0b 55%, #0b0b0c 100%)',
    href: '#',
  },
  {
    title: 'This Portfolio',
    category: 'Personal · WebGL + motion',
    year: '2026',
    role: 'Design & build',
    description:
      'The site you are on. Vite + React, GSAP for every transition, Lenis smooth scroll and a single Three.js shader blob, all driven by one animation loop so it runs at native refresh rate.',
    link: null, // set to the deployed URL once it is live
    tags: ['React', 'GSAP', 'Three.js'],
    gradient: 'linear-gradient(135deg, #3de0ff 0%, #0b3a45 55%, #0b0b0c 100%)',
    href: '#top',
  },
]

export const services = [
  {
    index: '01',
    title: 'Frontend Engineering',
    text: 'React components that are reusable, tested and responsive. Comfortable turning Figma files into real, interactive UI.',
    tools: ['React', 'JavaScript', 'Figma', 'GSAP'],
  },
  {
    index: '02',
    title: 'Java & Python',
    text: 'Data structures and algorithms in Java, scripting and automation in Python. Solid fundamentals I keep sharpening.',
    tools: ['Java', 'Python', 'Data Structures'],
  },
  {
    index: '03',
    title: 'IT & Systems Support',
    text: 'Diagnosing hardware, software and network issues at campus scale, and documenting fixes so the next person is faster.',
    tools: ['Networking', 'Ticketing', 'Troubleshooting'],
  },
  {
    index: '04',
    title: 'Research & Communication',
    text: 'Scoping problems, synthesising findings and presenting them to stakeholders in a way that changes decisions.',
    tools: ['Research', 'Public speaking', 'Google Workspace'],
  },
]

export const experience = [
  {
    period: 'Aug 2026 — Now',
    role: 'Client Support Technician',
    company: 'Stony Brook University · Division of IT',
  },
  {
    period: 'Apr — Aug 2025',
    role: 'Web Development Intern',
    company: 'Truth Bridge Inc. · Remote',
  },
  {
    period: 'Sep 2023 — Jun 2025',
    role: 'Event Lead',
    company: 'Tech Transit Association · Brooklyn',
  },
  {
    period: 'Apr — Jun 2024',
    role: 'Project Scope Researcher',
    company: 'NYC DOE · Department of IT',
  },
  {
    period: 'Oct 2023 — May 2024',
    role: 'SHSAT Mentor & Tutor',
    company: 'Brooklyn Education Network',
  },
]
