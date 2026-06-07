import { useEffect, useState } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Code2,
  Menu,
  Radio,
  Sparkles,
  X,
} from "lucide-react";

const navLinks = [
  { label: "Projects", href: "#ecosystem" },
  { label: "Profile", href: "#profile" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
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

const heroTags = ["AI Automations", "SaaS", "Systems"];

const works = [
  {
    type: "SaaS",
    title: "OfficeOS",
    text: "Internal software for teams, tasks, and operations.",
    status: "Building",
  },
  {
    type: "Hiring",
    title: "ATS",
    text: "Applicant tracking with resume intelligence.",
    status: "Planned",
  },
  {
    type: "Workspace",
    title: "Workspace",
    text: "A focused space for docs, tasks, and planning.",
    status: "Concept",
  },
  {
    type: "AI Tool",
    title: "Resume Screener",
    text: "AI-assisted resume ranking and signal extraction.",
    status: "Building",
  },
];

const ecosystem = [
  {
    category: "SaaS",
    title: "OfficeOS",
    text: "Internal operations and employee management software.",
    status: "Live",
    href: "https://officeos.motoflexing.com",
  },
  {
    category: "AI Automation",
    title: "OMAI",
    text: "AI workflows, automations, and productivity systems.",
    status: "Live",
    href: "https://omai.motoflexing.com",
  },
  {
    category: "Website",
    title: "Gym",
    text: "Premium gym and fitness website experience.",
    status: "Live",
    href: "https://gym.motoflexing.com",
  },
  {
    category: "Platform",
    title: "Games",
    text: "Gaming platform and future browser-based experiences.",
    status: "Coming Soon",
  },
];

const projects = [
  {
    category: "SaaS",
    title: "OfficeOS",
    text: "Internal business operations platform.",
    href: "https://officeos.motoflexing.com",
    status: "Building",
    featured: true,
  },
  {
    category: "AI Automation",
    title: "OMAI",
    text: "AI automation and workflow platform.",
    href: "https://omai.motoflexing.com",
    status: "Building",
  },
  {
    category: "Website",
    title: "Gym",
    text: "Premium fitness and gym website.",
    href: "https://gym.motoflexing.com",
    status: "Live",
  },
  {
    category: "Future Products",
    title: "Coming Soon",
    text: "More AI automations, SaaS products, and internal systems.",
    status: "Planned",
  },
];

const socialProof = [
  {
    icon: LinkedInIcon,
    number: "1000+",
    title: "LinkedIn Network",
    text: "Founder updates, product building, SaaS, and AI.",
    href: SOCIAL_LINKS.linkedin,
  },
  {
    icon: InstagramIcon,
    number: "3000+",
    title: "Instagram Audience",
    text: "Behind the scenes, progress, and MotoFlexing updates.",
    href: SOCIAL_LINKS.instagram,
  },
  {
    icon: YouTubeIcon,
    number: "311+",
    title: "YouTube Subscribers",
    text: "Build logs, software projects, and future launches.",
    href: SOCIAL_LINKS.youtube,
  },
  {
    icon: GitHubIcon,
    number: "30+",
    title: "GitHub Repositories",
    text: "Code, experiments, SaaS products, and open-source work.",
    href: SOCIAL_LINKS.github,
  },
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
            <a href={link.href} key={link.label}>
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
          <p className="kicker">Founder brand / Product builder</p>
          <h1>
            <span>MOTO</span>
            <strong>FLEXING</strong>
          </h1>
          <p className="hero-subtitle">Products, software, and focused execution.</p>
          <div className="tag-row">
            {heroTags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="hero-actions">
            <a className="primary-cta" href="#works">
              Explore Work <ArrowRight size={18} />
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
      <Container>
        <ChapterHeader
          eyebrow="Profile"
          title="Building in public."
          text="Sharing the journey of building products, AI automations, SaaS applications, and the MotoFlexing ecosystem."
        />
        <div className="social-proof-grid">
          {socialProof.map((item) => {
            const Icon = item.icon;
            return (
              <motion.a
                className="social-proof-card"
                href={item.href}
                target="_blank"
                rel="noreferrer"
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42 }}
              >
                <Icon size={21} />
                <strong>{item.number}</strong>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span>Visit →</span>
              </motion.a>
            );
          })}
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
          eyebrow="Work"
          title="Current product directions."
        />
        <div className="work-grid">
          {works.map((work) => (
            <motion.article
              className="work-card"
              key={work.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.48 }}
            >
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
          eyebrow="Live Products"
          title="Built. Shipped. Online."
          text="Products and platforms currently being built under MotoFlexing."
        />
        <div className="ecosystem-grid">
          {ecosystem.map((item, index) => {
            const cardContent = (
              <>
                <small>{item.category}</small>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <b>{item.status}</b>
              </>
            );

            return (
              <motion.div
                className="ecosystem-card-frame"
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.42, delay: index * 0.04 }}
              >
                {item.href ? (
                  <a className="ecosystem-card ecosystem-card-link" href={item.href} target="_blank" rel="noreferrer">
                    {cardContent}
                  </a>
                ) : (
                  <article className="ecosystem-card ecosystem-card-disabled">{cardContent}</article>
                )}
              </motion.div>
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
          title="Product taste. Builder discipline."
          text="A personal brand for software, content, and client-grade product work."
        />
        <div className="about-panels">
          <article>
            <Code2 size={24} />
            <h3>Developer</h3>
            <p>Clean interfaces and deployable systems.</p>
          </article>
          <article>
            <Radio size={24} />
            <h3>Creator</h3>
            <p>Build logs and product storytelling.</p>
          </article>
          <article>
            <Sparkles size={24} />
            <h3>Builder</h3>
            <p>SaaS, AI tools, and premium web products.</p>
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
          <h2>Building in public.</h2>
          <span>Product progress, experiments, and the work behind the brand.</span>
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
          title="Build with MotoFlexing."
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

function BrandFooter() {
  return (
    <footer className="footer">
      <Container className="footer-inner">
        <Logo />
        <span>{"\u00a9"} 2026 MotoFlexing. Built for focused product work.</span>
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
        <EcosystemChapter />
        <ProfileChapter />
        <AboutChapter />
        <ContactChapter />
      </main>
      <BrandFooter />
    </>
  );
}
