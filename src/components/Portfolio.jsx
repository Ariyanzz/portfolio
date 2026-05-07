import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";

import Navbar from "./Navbar";
import ParticleCanvas from "./ParticleCanvas";
import FadeIn from "./FadeIn";
import SkillBar from "./SkillBar";
import ProjectCard from "./ProjectCard";
import ContactForm from "./ContactForm";
import useTypingAnimation from "../hooks/useTypingAnimation";
import { PERSONAL, ROLES, ABOUT, SKILLS, PROJECTS } from "../data/portfolioData";

export default function Portfolio() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("home");
  const typedRole = useTypingAnimation(ROLES);

  // ── section refs ──────────────────────────────────────────────────────────
  const homeRef    = useRef(null);
  const aboutRef   = useRef(null);
  const skillsRef  = useRef(null);
  const projectsRef = useRef(null);
  const contactRef  = useRef(null);

  const sectionRefs = { home: homeRef, about: aboutRef, skills: skillsRef, projects: projectsRef, contact: contactRef };

  const scrollTo = useCallback((id) => {
    sectionRefs[id]?.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(id);
  }, []); // eslint-disable-line

  // track active section via IntersectionObserver
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); }),
      { threshold: 0.35 }
    );
    Object.entries(sectionRefs).forEach(([, ref]) => { if (ref.current) obs.observe(ref.current); });
    return () => obs.disconnect();
  }, []); // eslint-disable-line

  // ── theme tokens ─────────────────────────────────────────────────────────
  const bg    = dark ? "#080b14" : "#f8faff";
  const fg    = dark ? "#f1f5f9" : "#0f172a";
  const muted = dark ? "#64748b" : "#94a3b8";
  const glass = dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)";
  const border = dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";

  const sectionLabel = (text) => (
    <span style={{
      fontSize: 13, fontWeight: 600, color: "#f89820",
      fontFamily: "'Fira Code', monospace", letterSpacing: 2, textTransform: "uppercase",
    }}>{text}</span>
  );

  return (
    <div style={{ background: bg, color: fg, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", transition: "background 0.3s, color 0.3s", overflowX: "hidden" }}>

      {/* ── NAVBAR ── */}
      <Navbar dark={dark} setDark={setDark} active={active} scrollTo={scrollTo} fg={fg} muted={muted} />

      {/* ── HERO ── */}
      <section
        id="home"
        ref={homeRef}
        style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", padding: "100px 24px 60px" }}
      >
        <ParticleCanvas dark={dark} />

        {/* decorative rings */}
        <div style={{ position: "absolute", top: "15%", right: "10%", width: 320, height: 320, border: `1px solid ${dark ? "rgba(248,152,32,0.15)" : "rgba(248,152,32,0.25)"}`, borderRadius: "50%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "18%", right: "13%", width: 240, height: 240, border: `1px solid ${dark ? "rgba(97,218,251,0.12)" : "rgba(97,218,251,0.2)"}`, borderRadius: "50%", pointerEvents: "none" }} />

        <div style={{ maxWidth: 800, textAlign: "center", position: "relative", zIndex: 1 }}>
          {/* availability badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: dark ? "rgba(248,152,32,0.12)" : "rgba(248,152,32,0.15)", border: "1px solid rgba(248,152,32,0.3)", padding: "7px 18px", borderRadius: 99, marginBottom: 28 }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e", display: "inline-block", boxShadow: "0 0 8px #22c55e" }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#f89820", fontFamily: "'Fira Code', monospace" }}>
              {PERSONAL.available ? "Available for work" : "Not currently available"}
            </span>
          </motion.div>

          {/* name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
            style={{ fontSize: "clamp(44px, 8vw, 88px)", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", lineHeight: 1.08, marginBottom: 20, letterSpacing: "-2px" }}
          >
            Hi, I'm{" "}
            <span style={{ background: "linear-gradient(135deg, #f89820, #ff6b6b, #f89820)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {PERSONAL.name}
            </span>
          </motion.h1>

          {/* typing role */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
            style={{ fontSize: "clamp(18px, 3vw, 26px)", fontWeight: 500, marginBottom: 24, minHeight: 40 }}
          >
            <span style={{ color: muted }}>I'm a </span>
            <span style={{ color: "#61dafb", fontFamily: "'Fira Code', monospace", fontWeight: 600 }}>{typedRole}</span>
            <span style={{ color: "#61dafb", animation: "blink 1s step-end infinite" }}>|</span>
          </motion.div>

          {/* tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ fontSize: 17, color: muted, maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}
          >{PERSONAL.tagline}</motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}
          >
            <motion.a
              whileHover={{ scale: 1.04, boxShadow: "0 12px 32px rgba(248,152,32,0.4)" }}
              whileTap={{ scale: 0.97 }}
              href={PERSONAL.resumeUrl}
              download
              style={{ padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 700, background: "linear-gradient(135deg, #f89820, #ff6b6b)", color: "#fff", textDecoration: "none", boxShadow: "0 6px 24px rgba(248,152,32,0.3)", display: "flex", alignItems: "center", gap: 8 }}
            >⬇ Download Resume</motion.a>
            <motion.button
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
              onClick={() => scrollTo("projects")}
              style={{ padding: "14px 32px", borderRadius: 12, fontSize: 15, fontWeight: 700, background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)", color: fg, border: `1px solid ${border}`, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", display: "flex", alignItems: "center", gap: 8 }}
            >View Work →</motion.button>
          </motion.div>

          {/* social links */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 48 }}
          >
            {[
              { label: "GitHub", icon: "⑂", url: PERSONAL.githubUrl, color: "#f89820" },
              { label: "LinkedIn", icon: "in", url: PERSONAL.linkedinUrl, color: "#0a66c2" },
            ].map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: muted, textDecoration: "none", padding: "8px 18px", borderRadius: 10, border: `1px solid ${border}`, transition: "all 0.2s" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = s.color; e.currentTarget.style.borderColor = s.color + "50"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = muted; e.currentTarget.style.borderColor = border; }}
              >
                <span style={{ fontFamily: "'Fira Code', monospace" }}>{s.icon}</span> {s.label}
              </a>
            ))}
          </motion.div>
        </div>

        {/* scroll hint */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", color: muted, fontSize: 22, zIndex: 1 }}
        >↓</motion.div>
      </section>

      {/* ── ABOUT ── */}
      <section id="about" ref={aboutRef} style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            {sectionLabel("About Me")}
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", marginTop: 8 }}>
              Crafting code with <span style={{ color: "#61dafb" }}>purpose</span>
            </h2>
          </div>
        </FadeIn>

        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }}>
          <FadeIn delay={0.1}>
            <div style={{ borderRadius: 24, padding: 36, background: dark ? "linear-gradient(135deg, rgba(248,152,32,0.06), rgba(97,218,251,0.04))" : "linear-gradient(135deg, rgba(248,152,32,0.07), rgba(97,218,251,0.05))", border: `1px solid ${dark ? "rgba(248,152,32,0.15)" : "rgba(248,152,32,0.2)"}` }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>👨‍💻</div>
              <h3 style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 14 }}>Who I Am</h3>
              <p style={{ color: muted, lineHeight: 1.8, fontSize: 15, marginBottom: 16 }}>{ABOUT.bio1}</p>
              <p style={{ color: muted, lineHeight: 1.8, fontSize: 15 }}>{ABOUT.bio2}</p>
            </div>
          </FadeIn>

          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { label: "Education",  icon: "🎓", text: ABOUT.education  },
              { label: "Experience", icon: "💼", text: ABOUT.experience },
              { label: "Goal",       icon: "🎯", text: ABOUT.goal       },
            ].map((item, i) => (
              <FadeIn key={item.label} delay={0.15 + i * 0.1}>
                <div style={{ padding: "22px 26px", borderRadius: 16, display: "flex", gap: 18, alignItems: "flex-start", background: glass, border: `1px solid ${border}` }}>
                  <span style={{ fontSize: 26, flexShrink: 0 }}>{item.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "#f89820", marginBottom: 4, fontFamily: "'Fira Code', monospace", textTransform: "uppercase", letterSpacing: 1 }}>{item.label}</div>
                    <div style={{ fontSize: 14, color: muted, lineHeight: 1.6 }}>{item.text}</div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── SKILLS ── */}
      <section id="skills" ref={skillsRef} style={{ padding: "100px 24px", background: dark ? "rgba(255,255,255,0.015)" : "rgba(0,0,0,0.02)", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              {sectionLabel("Technical Skills")}
              <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", marginTop: 8 }}>
                Tools of my <span style={{ color: "#f89820" }}>trade</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }}>
            <div>{SKILLS.slice(0, 5).map((s, i) => <SkillBar key={s.name} skill={s} index={i} dark={dark} />)}</div>
            <div>{SKILLS.slice(5).map((s, i) => <SkillBar key={s.name} skill={s} index={i + 5} dark={dark} />)}</div>
          </div>

          <FadeIn delay={0.3}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", marginTop: 60 }}>
              {SKILLS.map((s) => (
                <motion.div key={s.name} whileHover={{ scale: 1.08, y: -3 }}
                  style={{ padding: "10px 20px", borderRadius: 12, fontSize: 14, fontWeight: 600, background: s.color + "12", color: s.color, border: `1px solid ${s.color}30`, fontFamily: "'Fira Code', monospace", cursor: "default" }}
                >{s.icon} {s.name}</motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" ref={projectsRef} style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            {sectionLabel("Portfolio")}
            <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", marginTop: 8 }}>
              Selected <span style={{ color: "#61dafb" }}>projects</span>
            </h2>
            <p style={{ color: muted, marginTop: 14, fontSize: 15, maxWidth: 500, margin: "14px auto 0" }}>
              A curated selection of my best work — from microservices to full-stack apps.
            </p>
          </div>
        </FadeIn>

        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          {PROJECTS.map((p, i) => <ProjectCard key={p.id} project={p} dark={dark} index={i} />)}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" ref={contactRef} style={{ padding: "100px 24px", background: dark ? "rgba(248,152,32,0.03)" : "rgba(248,152,32,0.04)", borderTop: `1px solid ${dark ? "rgba(248,152,32,0.1)" : "rgba(248,152,32,0.15)"}` }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <FadeIn>
            <div style={{ textAlign: "center", marginBottom: 60 }}>
              {sectionLabel("Get In Touch")}
              <h2 style={{ fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 800, fontFamily: "'Space Grotesk', sans-serif", marginTop: 8 }}>
                Let's <span style={{ color: "#f89820" }}>work together</span>
              </h2>
            </div>
          </FadeIn>

          <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "start" }}>
            <FadeIn delay={0.1}>
              <div>
                <h3 style={{ fontSize: 22, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 16 }}>Open to opportunities</h3>
                <p style={{ color: muted, lineHeight: 1.8, fontSize: 15, marginBottom: 32 }}>
                  I'm actively looking for full-time roles in full-stack development. Feel free to reach out if you have an interesting project or position — I'd love to hear from you.
                </p>

                <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
                  {[
                    { icon: "📧", label: "Email", value: PERSONAL.email },
                    { icon: "📍", label: "Location", value: PERSONAL.location },
                  ].map((item) => (
                    <div key={item.label} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      <span style={{ fontSize: 20 }}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: 12, color: muted, textTransform: "uppercase", letterSpacing: 1, fontWeight: 600 }}>{item.label}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: fg }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: "flex", gap: 14 }}>
                  {[
                    { label: "GitHub",   icon: "⑂",  url: PERSONAL.githubUrl,   color: "#f89820" },
                    { label: "LinkedIn", icon: "in", url: PERSONAL.linkedinUrl, color: "#0a66c2" },
                  ].map((s) => (
                    <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                      style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", borderRadius: 10, textDecoration: "none", fontSize: 14, fontWeight: 600, color: fg, background: dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", border: `1px solid ${border}`, transition: "all 0.2s" }}
                      onMouseEnter={(e) => { e.currentTarget.style.background = s.color + "20"; e.currentTarget.style.borderColor = s.color + "50"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)"; e.currentTarget.style.borderColor = border; }}
                    >
                      <span style={{ fontFamily: "'Fira Code', monospace" }}>{s.icon}</span> {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div style={{ padding: 36, borderRadius: 24, background: glass, border: `1px solid ${border}`, backdropFilter: "blur(16px)" }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", marginBottom: 24 }}>Send a message</h3>
                <ContactForm dark={dark} />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ textAlign: "center", padding: "28px 24px", borderTop: `1px solid ${border}`, color: muted, fontSize: 13 }}>
        <span style={{ fontFamily: "'Fira Code', monospace" }}>
          crafted with <span style={{ color: "#ff6b6b" }}>♥</span> by{" "}
          <span style={{ color: "#f89820", fontWeight: 700 }}>{PERSONAL.name}</span>
          {" "}© {new Date().getFullYear()}
        </span>
      </footer>
    </div>
  );
}
