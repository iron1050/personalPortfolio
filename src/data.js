// ---------------------------------------------------------------
// Edit this file to make the portfolio yours. Everything on the
// page reads from here.
// ---------------------------------------------------------------

export const profile = {
  first: 'Chukwuma',
  last: 'Dibia',
  role: 'Creative Developer',
  tagline: 'I build fast, expressive interfaces that feel alive.',
  location: 'Toronto, CA', // <- change me
  email: 'chukwumadibia@gmail.com',
  available: true,
  socials: [
    { label: 'GitHub', href: 'https://github.com/' },
    { label: 'LinkedIn', href: 'https://linkedin.com/' },
    { label: 'X / Twitter', href: 'https://x.com/' },
    { label: 'Instagram', href: 'https://instagram.com/' },
  ],
}

export const about = {
  intro:
    'I’m a developer who cares about the last 10% — the easing curve, the 4px nudge, the frame that drops. I design and ship interfaces where motion carries meaning, not decoration.',
  body:
    'Currently focused on React, WebGL and motion systems. Previously shipped products across fintech, e-commerce and media. Available for freelance and full-time roles.',
  stats: [
    { value: 5, suffix: '+', label: 'Years shipping' },
    { value: 40, suffix: '+', label: 'Projects delivered' },
    { value: 120, suffix: 'fps', label: 'Target frame rate' },
  ],
}

export const projects = [
  {
    title: 'Lumen Finance',
    category: 'Product · Web App',
    year: '2026',
    tags: ['React', 'GSAP', 'Node'],
    gradient: 'linear-gradient(135deg, #c8ff3d 0%, #1f2a08 60%, #0b0b0c 100%)',
    href: '#',
  },
  {
    title: 'Orbital Studio',
    category: 'Brand · 3D Site',
    year: '2025',
    tags: ['Three.js', 'Shaders', 'Vite'],
    gradient: 'linear-gradient(135deg, #6a5cff 0%, #1a1650 55%, #0b0b0c 100%)',
    href: '#',
  },
  {
    title: 'Nomad Journal',
    category: 'Editorial · Mobile',
    year: '2025',
    tags: ['React Native', 'Reanimated'],
    gradient: 'linear-gradient(135deg, #ff7a3d 0%, #4a1f0b 55%, #0b0b0c 100%)',
    href: '#',
  },
  {
    title: 'Pulse Analytics',
    category: 'Dashboard · SaaS',
    year: '2024',
    tags: ['TypeScript', 'D3', 'Postgres'],
    gradient: 'linear-gradient(135deg, #3de0ff 0%, #0b3a45 55%, #0b0b0c 100%)',
    href: '#',
  },
  {
    title: 'Atlas Commerce',
    category: 'E-commerce · Headless',
    year: '2024',
    tags: ['Next.js', 'Shopify', 'GSAP'],
    gradient: 'linear-gradient(135deg, #ff3d8a 0%, #4a0b26 55%, #0b0b0c 100%)',
    href: '#',
  },
]

export const services = [
  {
    index: '01',
    title: 'Creative Frontend',
    text: 'Pixel-obsessed React builds with motion systems that run at native refresh rate. No jank, no layout thrash.',
    tools: ['React', 'Vite', 'GSAP', 'Lenis'],
  },
  {
    index: '02',
    title: 'WebGL & 3D',
    text: 'Lightweight Three.js scenes and custom shaders that add depth without eating your frame budget.',
    tools: ['Three.js', 'GLSL', 'R3F'],
  },
  {
    index: '03',
    title: 'Motion Design',
    text: 'Choreographed transitions, scroll storytelling and micro-interactions that make products feel considered.',
    tools: ['GSAP', 'ScrollTrigger', 'SplitText'],
  },
  {
    index: '04',
    title: 'Full-stack Product',
    text: 'From schema to screen. Type-safe APIs, auth, payments and the boring stuff done right.',
    tools: ['Node', 'TypeScript', 'Postgres'],
  },
]

export const experience = [
  { period: '2024 — Now', role: 'Senior Frontend Engineer', company: 'Freelance / Studio' },
  { period: '2022 — 2024', role: 'Frontend Engineer', company: 'Fintech Co.' },
  { period: '2020 — 2022', role: 'Web Developer', company: 'Digital Agency' },
  { period: '2019 — 2020', role: 'Junior Developer', company: 'Startup Inc.' },
]
