import { useEffect, useState } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Bot,
  BriefcaseBusiness,
  ChevronRight,
  Code2,
  Cpu,
  Menu,
  Play,
  Radio,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Profile", href: "#profile" },
  { label: "Contact", href: "#contact" },
  { label: "My Works", href: "#works", active: true },
];

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/moto.flexing/",
  youtube: "https://www.youtube.com/@moto.flexing",
  linkedin: "https://www.linkedin.com/in/ankit2003dubey/",
  github: "https://github.com/motoflexing",
};

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M22 12s0-3.4-.44-5.02a3.02 3.02 0 0 0-2.13-2.13C17.8 4.4 12 4.4 12 4.4s-5.8 0-7.43.45a3.02 3.02 0 0 0-2.13 2.13C2 8.6 2 12 2 12s0 3.4.44 5.02a3.02 3.02 0 0 0 2.13 2.13C6.2 19.6 12 19.6 12 19.6s5.8 0 7.43-.45a3.02 3.02 0 0 0 2.13-2.13C22 15.4 22 12 22 12Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="m10 15 5-3-5-3v6Z" fill="currentColor" />
    </svg>
  );
}

function LinkedInIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 9h3v10H5V9Zm1.5-4A1.8 1.8 0 1 1 6.5 8 1.8 1.8 0 0 1 6.5 5Z" fill="currentColor" />
      <path d="M11 9h3v1.45A3.5 3.5 0 0 1 17 8.8c2.5 0 4 1.68 4 4.72V19h-3v-5.1c0-1.55-.56-2.36-1.8-2.36-1.34 0-2.2.95-2.2 2.36V19h-3V9Z" fill="currentColor" />
    </svg>
  );
}

function GitHubIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M12 2.5a9.5 9.5 0 0 0-3 18.52c.48.09.65-.2.65-.46v-1.62c-2.66.58-3.22-1.13-3.22-1.13-.43-1.1-1.06-1.4-1.06-1.4-.87-.6.07-.58.07-.58.96.07 1.47.99 1.47.99.86 1.46 2.25 1.04 2.8.8.09-.62.34-1.04.61-1.28-2.12-.24-4.35-1.06-4.35-4.72 0-1.04.37-1.9.98-2.56-.1-.24-.43-1.22.09-2.52 0 0 .81-.26 2.62.98A9.02 9.02 0 0 1 12 6.2c.81 0 1.62.11 2.38.32 1.81-1.24 2.62-.98 2.62-.98.52 1.3.19 2.28.09 2.52.61.66.98 1.52.98 2.56 0 3.67-2.24 4.48-4.37 4.72.35.3.66.88.66 1.78v2.64c0 .26.17.55.66.46A9.5 9.5 0 0 0 12 2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

const socialLinks = [
  { icon: InstagramIcon, label: "Instagram", href: SOCIAL_LINKS.instagram },
  { icon: YouTubeIcon, label: "YouTube", href: SOCIAL_LINKS.youtube },
  { icon: LinkedInIcon, label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { icon: GitHubIcon, label: "GitHub", href: SOCIAL_LINKS.github },
];

const heroTags = ["Products", "Startups", "Technology"];

const works = [
  {
    type: "SaaS",
    title: "OfficeOS",
    text: "Internal business software for teams, people, permissions, tasks, and operating rhythm.",
    status: "Building",
  },
  {
    type: "Hiring",
    title: "ATS",
    text: "Applicant tracking and resume intelligence for cleaner hiring decisions and faster shortlists.",
    status: "Planned",
  },
  {
    type: "Workspace",
    title: "Workspace",
    text: "A future execution hub for notes, docs, tasks, planning, and focused product work.",
    status: "Concept",
  },
  {
    type: "AI Tool",
    title: "Resume Screener",
    text: "AI workflow for ranking resumes, extracting signals, and reducing manual review time.",
    status: "Building",
  },
];

const ecosystem = [
  { icon: BriefcaseBusiness, title: "OfficeOS", text: "Business operations layer for internal teams." },
  { icon: ShieldCheck, title: "ATS", text: "Hiring pipeline, resume intelligence, and candidate flow." },
  { icon: Cpu, title: "Workspace", text: "Execution space for docs, tasks, notes, and planning." },
  { icon: Bot, title: "Future SaaS", text: "AI utilities, creator tools, and internal software products." },
];

const profileStats = [
  ["110", "videos published"],
  ["311", "subscribers watching"],
  ["6+", "product ideas in motion"],
  ["4", "core ecosystem directions"],
];

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>;
}

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="MotoFlexing home">
      <span className="logo-mark">MF</span>
      <span>MotoFlexing</span>
    </a>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-shell">
      <Container className="nav">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a className={link.active ? "active" : ""} href={link.href} key={link.label}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="nav-button" href="#contact">
          Contact
        </a>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </Container>
      {open ? (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <a href={link.href} key={link.label} onClick={() => setOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
      ) : null}
    </header>
  );
}

function SocialRail() {
  return (
    <aside className="social-rail" aria-label="Social links">
      {socialLinks.map((item, index) => {
        const Icon = item.icon;
        return (
          <div className="social-rail-item" key={item.label}>
            <a href={item.href} target="_blank" rel="noreferrer" aria-label={item.label}>
              <Icon size={18} />
            </a>
            {index < socialLinks.length - 1 ? <span className="rail-divider" aria-hidden="true" /> : null}
          </div>
        );
      })}
    </aside>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <SocialRail />
      <Container className="hero-inner">
        <motion.div
          className="hero-copy"
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <p className="kicker">Personal brand / Builder / Creator</p>
          <h1>
            <span>MOTO</span>
            <strong>FLEXING</strong>
          </h1>
          <p className="hero-subtitle">
            Building products, documenting the journey, and turning ideas into software.
          </p>
          <div className="tag-row">
            {heroTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="hero-actions">
            <a className="primary-cta" href="#works">
              Visit site <ArrowRight size={18} />
            </a>
            <a className="ghost-cta" href="#works">
              View work
            </a>
          </div>
          <div className="mobile-socials" aria-label="Social links">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a href={item.href} key={item.label} target="_blank" rel="noreferrer" aria-label={item.label}>
                  <Icon size={18} />
                </a>
              );
            })}
          </div>
        </motion.div>
        <div className="floating-actions" aria-label="Quick actions">
          <a href="#works" aria-label="Open works">
            <ChevronRight size={20} />
          </a>
          <a href="#content" aria-label="Open content">
            <Play size={18} fill="currentColor" />
          </a>
        </div>
      </Container>
      <div className="scroll-cue">Scroll</div>
    </section>
  );
}

function ChapterHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <motion.div
      className="chapter-header"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-90px" }}
      transition={{ duration: 0.55 }}
    >
      <p>{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <span>{text}</span> : null}
    </motion.div>
  );
}

function ProfileChapter() {
  return (
    <section className="chapter profile-chapter" id="profile">
      <Container className="profile-grid">
        <ChapterHeader
          eyebrow="Profile"
          title="Not a freelance agency. A personal build universe."
          text="MotoFlexing is the public face of a builder developing products, documenting the climb, and turning sharp ideas into usable software."
        />
        <div className="stat-grid">
          {profileStats.map(([value, label]) => (
            <motion.div
              className="stat-card"
              key={label}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.42 }}
            >
              <strong>{value}</strong>
              <span>{label}</span>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

function WorksChapter() {
  return (
    <section className="chapter works-chapter" id="works">
      <Container>
        <ChapterHeader
          eyebrow="My Works"
          title="Products with utility, atmosphere, and execution."
          text="The portfolio is shaped around real product directions: internal business software, hiring systems, AI tools, and premium product websites."
        />
        <div className="work-grid">
          {works.map((work, index) => (
            <motion.article
              className="work-card"
              key={work.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.48, delay: index * 0.05 }}
            >
              <div className="card-index">{String(index + 1).padStart(2, "0")}</div>
              <p>{work.type}</p>
              <h3>{work.title}</h3>
              <span>{work.text}</span>
              <b>{work.status}</b>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function EcosystemChapter() {
  return (
    <section className="chapter ecosystem-chapter" id="ecosystem">
      <Container>
        <ChapterHeader
          eyebrow="Ecosystem"
          title="OfficeOS, ATS, Workspace, and the next products after that."
          text="The long game is a product ecosystem connected by one brand: builder discipline, premium interfaces, useful software, and AI-powered workflows."
        />
        <div className="ecosystem-grid">
          {ecosystem.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                className="ecosystem-card"
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: index * 0.04 }}
              >
                <Icon size={24} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </motion.article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

function AboutChapter() {
  return (
    <section className="chapter about-chapter" id="about">
      <Container className="about-grid">
        <ChapterHeader
          eyebrow="About"
          title="Built like a night ride: focused, fast, and cinematic."
          text="MotoFlexing combines creator energy with product execution. The work is not about looking busy. It is about shipping real interfaces, workflows, and tools that people can understand quickly."
        />
        <div className="about-panels">
          <article>
            <Code2 size={24} />
            <h3>Developer</h3>
            <p>Clean React builds, product logic, responsive interfaces, and deployable systems.</p>
          </article>
          <article>
            <Radio size={24} />
            <h3>Creator</h3>
            <p>Content, build logs, discipline, and a public story around the brand.</p>
          </article>
          <article>
            <Sparkles size={24} />
            <h3>Builder</h3>
            <p>Ideas turned into SaaS apps, AI workflows, internal tools, and premium web products.</p>
          </article>
        </div>
      </Container>
    </section>
  );
}

function ContentChapter() {
  return (
    <section className="chapter content-chapter" id="content">
      <Container className="content-panel">
        <div>
          <p className="kicker">Content</p>
          <h2>Building the brand in public.</h2>
          <span>
            MotoFlexing is also the story around the work: videos, experiments, product progress, and the discipline
            behind the comeback.
          </span>
        </div>
        <a className="primary-cta" href="https://youtube.com/@moto.flexing" target="_blank" rel="noreferrer">
          Visit YouTube <ArrowRight size={18} />
        </a>
      </Container>
    </section>
  );
}

function ContactChapter() {
  return (
    <section className="chapter contact-chapter" id="contact">
      <Container className="contact-panel">
        <ChapterHeader
          eyebrow="Contact"
          title="Ready to build something with edge?"
          text="Reach out for product work, premium web apps, internal software, AI tooling, or collaborations around the MotoFlexing ecosystem."
        />
        <div className="contact-actions">
          <a className="primary-cta" href="mailto:hello@motoflexing.com">
            hello@motoflexing.com <ArrowRight size={18} />
          </a>
          <span>motoflexing.com</span>
        </div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Container className="footer-inner">
        <Logo />
        <span>© 2026 MotoFlexing. Built in the dark, shipped for the real world.</span>
      </Container>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.05, smoothWheel: true });
    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);
    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ProfileChapter />
        <WorksChapter />
        <EcosystemChapter />
        <AboutChapter />
        <ContentChapter />
        <ContactChapter />
      </main>
      <Footer />
    </>
  );
}
