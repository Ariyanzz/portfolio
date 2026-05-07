import { useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";

const NAV_ITEMS = ["home", "about", "skills", "projects", "contact"];

export default function Navbar({ dark, setDark, active, scrollTo, fg, muted }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  const navBg = useTransform(
    scrollY,
    [0, 60],
    ["rgba(0,0,0,0)", dark ? "rgba(10,10,20,0.95)" : "rgba(255,255,255,0.95)"]
  );

  const handleNav = (id) => {
    scrollTo(id);
    setMenuOpen(false);
  };

  return (
    <motion.nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: navBg,
        backdropFilter: "blur(16px)",
        borderBottom: `1px solid ${
          dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
        }`,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 24px",
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          style={{
            fontSize: 20,
            fontWeight: 800,
            fontFamily: "'Space Grotesk', sans-serif",
            cursor: "pointer",
          }}
          onClick={() => handleNav("home")}
        >
          <span style={{ color: "#f89820" }}>&lt;</span>
          <span style={{ color: fg }}>Ariyan</span>
          <span style={{ color: "#61dafb" }}>.Dev</span>
          <span style={{ color: "#f89820" }}>/&gt;</span>
        </motion.div>

        {/* Desktop nav */}
        <div
          className="desktop-nav"
          style={{ display: "flex", gap: 4, alignItems: "center" }}
        >
          {NAV_ITEMS.map((item, i) => (
            <motion.button
              key={item}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => handleNav(item)}
              style={{
                background: active === item ? "#f89820" : "transparent",
                color: active === item ? "#000" : muted,
                border: "none",
                padding: "7px 16px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
                textTransform: "capitalize",
                transition: "all 0.2s",
              }}
            >
              {item}
            </motion.button>
          ))}

          {/* Dark / Light toggle */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            onClick={() => setDark(!dark)}
            style={{
              marginLeft: 8,
              background: dark
                ? "rgba(255,255,255,0.08)"
                : "rgba(0,0,0,0.07)",
              border: "none",
              borderRadius: 10,
              width: 38,
              height: 38,
              cursor: "pointer",
              fontSize: 17,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {dark ? "☀️" : "🌙"}
          </motion.button>
        </div>

        {/* Mobile hamburger */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "none",
            background: "none",
            border: "none",
            cursor: "pointer",
            fontSize: 22,
            color: fg,
          }}
        >
          {menuOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{
              overflow: "hidden",
              background: dark ? "#0d1117" : "#fff",
              borderTop: `1px solid ${
                dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"
              }`,
              padding: "16px 24px",
              display: "flex",
              flexDirection: "column",
              gap: 4,
            }}
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item}
                onClick={() => handleNav(item)}
                style={{
                  background: active === item ? "#f89820" : "transparent",
                  color: active === item ? "#000" : fg,
                  border: "none",
                  padding: "10px 14px",
                  borderRadius: 8,
                  fontSize: 15,
                  fontWeight: 600,
                  cursor: "pointer",
                  textAlign: "left",
                  textTransform: "capitalize",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {item}
              </button>
            ))}
            <button
              onClick={() => setDark(!dark)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "10px 14px",
                fontSize: 15,
                color: fg,
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              {dark ? "☀️ Light mode" : "🌙 Dark mode"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
