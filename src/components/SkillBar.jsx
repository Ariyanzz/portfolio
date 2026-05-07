import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function SkillBar({ skill, index, dark }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.5 }}
      style={{ marginBottom: 18 }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}
      >
        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: dark ? "#e2e8f0" : "#1e293b",
            fontFamily: "'Fira Code', monospace",
          }}
        >
          {skill.icon} {skill.name}
        </span>
        <span style={{ fontSize: 13, color: skill.color, fontWeight: 700 }}>
          {skill.level}%
        </span>
      </div>

      <div
        style={{
          height: 6,
          background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
          borderRadius: 99,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${skill.level}%` } : {}}
          transition={{
            duration: 1.2,
            delay: index * 0.07 + 0.2,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            height: "100%",
            borderRadius: 99,
            background: `linear-gradient(90deg, ${skill.color}88, ${skill.color})`,
          }}
        />
      </div>
    </motion.div>
  );
}
