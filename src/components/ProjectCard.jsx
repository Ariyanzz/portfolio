import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function ProjectCard({ project, dark, index }) {
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: 20,
        padding: "28px 26px",
        background: dark
          ? "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(255,255,255,0.02))"
          : "linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
        border: `1px solid ${
          hovered
            ? project.accent + "60"
            : dark
            ? "rgba(255,255,255,0.08)"
            : "rgba(0,0,0,0.08)"
        }`,
        backdropFilter: "blur(16px)",
        boxShadow: hovered
          ? `0 20px 60px ${project.accent}22, 0 0 0 1px ${project.accent}30`
          : dark
          ? "0 4px 24px rgba(0,0,0,0.3)"
          : "0 4px 24px rgba(0,0,0,0.07)",
        cursor: "pointer",
        transition: "box-shadow 0.3s ease, border-color 0.3s ease",
        overflow: "hidden",
      }}
    >
      {/* top accent bar */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 3,
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          borderRadius: "20px 20px 0 0",
        }}
      />

      <div style={{ fontSize: 36, marginBottom: 14 }}>{project.icon}</div>

      <h3
        style={{
          fontSize: 20,
          fontWeight: 700,
          marginBottom: 10,
          color: dark ? "#f1f5f9" : "#0f172a",
          fontFamily: "'Space Grotesk', sans-serif",
        }}
      >
        {project.title}
      </h3>

      <p
        style={{
          fontSize: 14,
          lineHeight: 1.7,
          color: dark ? "#94a3b8" : "#64748b",
          marginBottom: 18,
        }}
      >
        {project.description}
      </p>

      {/* tech tags */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 22 }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: 99,
              fontFamily: "'Fira Code', monospace",
              background: project.accent + "18",
              color: project.accent,
              border: `1px solid ${project.accent}30`,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ display: "flex", gap: 12 }}>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: 13,
            fontWeight: 600,
            padding: "8px 16px",
            borderRadius: 10,
            background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
            color: dark ? "#cbd5e1" : "#475569",
            textDecoration: "none",
            border: `1px solid ${
              dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
            }`,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ⑂ GitHub
        </a>
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: 13,
            fontWeight: 600,
            padding: "8px 16px",
            borderRadius: 10,
            background: project.accent,
            color: "#000",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          ↗ Live Demo
        </a>
      </div>
    </motion.div>
  );
}
