import { useEffect, useState } from "react";
import Lenis from "lenis";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Braces,
  Code2,
  Menu,
  Play,
  Sparkles,
  X,
  Radio,
  Share2,
  TerminalSquare,
  Users,
} from "lucide-react";

const links = ["Work", "About", "Content", "Contact"];

const workItems = [
  {
    category: "SaaS",
    title: "OfficeOS",
    description: "Internal employee management SaaS with clean workflows and role-aware dashboards.",
    status: "Building",
    url: "officeos.motoflexing.com",
  },
  {
    category: "App",
    title: "Nightlife Platform",
    description: "Event discovery and RSVP experience for venues, creators, and active city crowds.",
    status: "Coming soon",
    url: "nightlife.motoflexing.com",
  },
  {
    category: "Research",
    title: "UPI Research Website",
    description: "Academic fintech case study presented as a premium, readable web experience.",
    status: "Live",
    url: "upi.motoflexing.com",
  },
  {
    category: "Template",
    title: "Gym Website Template",
    description: "A sharp landing page system for fitness brands that need instant credibility.",
    status: "Coming soon",
    url: "gym.motoflexing.com",
  },
  {
    category: "AI",
    title: "AI Resume Screener",
    description: "Hiring automation concept for ranking resumes and surfacing stronger candidates.",
    status: "Building",
    url: "resume.motoflexing.com",
  },
  {
    category: "Creator Tool",
    title: "MotoFlexing AI Editor",
    description: "AI-assisted content editing tool for turning raw ideas into publish-ready assets.",
    status: "Coming soon",
    url: "editor.motoflexing.com",
  },
];

const whatIDo = [
  ["Websites that look premium", "Conversion-ready interfaces with strong hierarchy, polish, and trust."],
  ["Apps that solve real workflows", "Focused product flows for daily operations, dashboards, and automation."],
  ["SaaS experiments built fast", "Lean product ideas shipped quickly, tested honestly, and improved in public."],
];

const process = [
  "Understand the real problem",
  "Design the structure",
  "Build fast with clean logic",
  "Ship, test, improve",
];

const socials = [
  { icon: TerminalSquare, name: "GitHub", handle: "moto-flexing", href: "https://github.com/moto-flexing" },
  { icon: Share2, name: "Instagram", handle: "@moto.flexing", href: "https://instagram.com/moto.flexing" },
  { icon: Users, name: "LinkedIn", handle: "Moto Flexing", href: "https://linkedin.com/in/motoflexing" },
  { icon: Radio, name: "YouTube", handle: "Moto Flexing", href: "https://youtube.com/@moto.flexing" },
];

const stats = [
  "110 Videos Published",
  "311 YouTube Subscribers",
  "6+ Active Project Ideas",
  "1 Brand Domain Owned",
  "Multiple Client Demos Building",
];

function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`container ${className}`}>{children}</div>;
}

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Moto Flexing home">
      <span className="mark" aria-hidden="true">
        <span>M</span>
        <span>F</span>
      </span>
      <span>Moto Flexing</span>
    </a>
  );
}

function Button({
  children,
  href,
  variant = "primary",
}: {
  children: React.ReactNode;
  href: string;
  variant?: "primary" | "secondary";
}) {
  return (
    <a className={`button ${variant}`} href={href}>
      <span>{children}</span>
      <ArrowRight size={17} />
    </a>
  );
}

function SectionHeader({ eyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <motion.div
      className="section-header"
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </motion.div>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="nav-wrap">
      <Container className="nav">
        <Logo />
        <nav className="desktop-nav" aria-label="Primary navigation">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}>
              {link}
            </a>
          ))}
        </nav>
        <a className="nav-cta" href="#contact">
          Let's talk
        </a>
        <button className="menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-label="Toggle menu">
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </Container>
      {open ? (
        <div className="mobile-menu">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>
              {link}
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)}>
            Let's talk
          </a>
        </div>
      ) : null}
    </header>
  );
}

function HeroVisual() {
  const chips = ["Products", "Websites", "SaaS", "Content", "Build logs"];

  return (
    <motion.div
      className="hero-visual"
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.15 }}
    >
      <div className="screen">
        <div className="screen-top">
          <span />
          <span />
          <span />
          <strong>MF Command</strong>
        </div>
        <div className="screen-grid">
          <div className="metric-card wide">
            <p>Ship Velocity</p>
            <strong>Fast</strong>
            <div className="graph-line" />
          </div>
          <div className="metric-card">
            <p>Stack</p>
            <strong>React</strong>
          </div>
          <div className="metric-card">
            <p>Focus</p>
            <strong>Products</strong>
          </div>
          <div className="metric-card tall">
            <p>Build Queue</p>
            <div className="bars">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="chip-cloud">
            {chips.map((chip) => (
              <span key={chip}>{chip}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function WorkCard({ item }: { item: (typeof workItems)[number] }) {
  return (
    <motion.article
      className="work-card"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.45 }}
    >
      <div className="card-top">
        <span>{item.category}</span>
        <b>{item.status}</b>
      </div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <small>{item.url}</small>
    </motion.article>
  );
}

function ProcessCard({ step, text }: { step: number; text: string }) {
  return (
    <motion.article
      className="process-card"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.42, delay: step * 0.04 }}
    >
      <span>{String(step).padStart(2, "0")}</span>
      <h3>{text}</h3>
    </motion.article>
  );
}

function SocialCard({ social }: { social: (typeof socials)[number] }) {
  const Icon = social.icon;
  return (
    <a className="social-card" href={social.href} target="_blank" rel="noreferrer">
      <Icon size={22} />
      <span>
        <strong>{social.name}</strong>
        <small>{social.handle}</small>
      </span>
    </a>
  );
}

function StatsBand() {
  return (
    <section className="section">
      <Container>
        <motion.div
          className="stats-band"
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          {stats.map((stat) => (
            <div key={stat}>
              <strong>{stat.split(" ").slice(0, 2).join(" ")}</strong>
              <span>{stat.split(" ").slice(2).join(" ")}</span>
            </div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Container className="footer-inner">
        <div>
          <Logo />
          <p>Build. Ship. Improve.</p>
        </div>
        <div className="footer-links">
          {links.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`}>
              {link}
            </a>
          ))}
        </div>
        <div className="footer-socials">
          {socials.map((social) => (
            <a key={social.name} href={social.href} target="_blank" rel="noreferrer">
              {social.name}
            </a>
          ))}
        </div>
        <small>© 2026 Moto Flexing</small>
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
      <main id="top">
        <section className="hero">
          <Container className="hero-grid">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65 }}
            >
              <p className="eyebrow">Solo developer personal brand</p>
              <h1>
                Building useful digital products with speed, taste, and <span>obsession.</span>
              </h1>
              <p>
                Moto Flexing is a personal brand by a solo developer building premium websites, apps, SaaS ideas, and
                futuristic digital products - one project at a time.
              </p>
              <div className="hero-actions">
                <Button href="#work">See my work</Button>
                <Button href="#content" variant="secondary">
                  YouTube journey
                </Button>
              </div>
              <div className="stats-line">311 subscribers · 110 videos · React · TypeScript · Firebase · Vercel</div>
            </motion.div>
            <HeroVisual />
          </Container>
        </section>

        <section className="section" id="work">
          <Container>
            <SectionHeader
              eyebrow="Selected Work"
              title="Selected Work"
              text="Placeholder case studies today. Real subdomain projects tomorrow."
            />
            <div className="work-grid">
              {workItems.map((item) => (
                <WorkCard item={item} key={item.title} />
              ))}
            </div>
          </Container>
        </section>

        <section className="section" id="about">
          <Container className="split">
            <SectionHeader eyebrow="About" title="Not a traditional agency. Not a random coder." />
            <div className="about-content">
              <p>
                Moto Flexing is about building in public, learning fast, shipping real projects, and turning ideas into
                usable products. The focus is not one single stack - the focus is logic, structure, execution, and taste.
              </p>
              <div className="about-grid">
                {whatIDo.map(([title, text]) => (
                  <article className="mini-card" key={title}>
                    <Sparkles size={20} />
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <section className="section">
          <Container>
            <SectionHeader eyebrow="Process" title="How I Work" />
            <div className="process-grid">
              {process.map((item, index) => (
                <ProcessCard key={item} step={index + 1} text={item} />
              ))}
            </div>
          </Container>
        </section>

        <section className="section" id="content">
          <Container>
            <SectionHeader eyebrow="Content" title="Building the brand in public." />
            <div className="content-grid">
              <motion.article
                className="youtube-card"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55 }}
              >
                <div className="platform-icon">
                  <Play size={24} fill="currentColor" />
                </div>
                <div>
                  <p>YouTube - Moto Flexing</p>
                  <h3>@moto.flexing</h3>
                  <strong>311 subscribers · 110 videos</strong>
                  <span>
                    From biking content to coding content - documenting the comeback, the builds, and the discipline.
                  </span>
                </div>
              </motion.article>
              <div className="social-grid">
                {socials.map((social) => (
                  <SocialCard social={social} key={social.name} />
                ))}
              </div>
            </div>
          </Container>
        </section>

        <StatsBand />

        <section className="section contact-section" id="contact">
          <Container className="contact-panel">
            <div>
              <p className="eyebrow">Contact</p>
              <h2>Want to build something sharp?</h2>
              <p>
                If the work speaks to you, reach out. No overpromising, no fake agency talk - just useful products,
                clean design, and serious execution.
              </p>
              <div className="hero-actions">
                <Button href="mailto:hello@motoflexing.com">Let's talk</Button>
                <Button href="#work" variant="secondary">
                  See work
                </Button>
              </div>
            </div>
            <div className="contact-meta">
              <span>
                <Code2 size={19} /> hello@motoflexing.com
              </span>
              <span>
                <Braces size={19} /> motoflexing.com
              </span>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
