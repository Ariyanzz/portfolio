import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

// ================= EMAILJS CONFIG =================
const EMAILJS_SERVICE_ID = "service_a8vrwdb";
const EMAILJS_TEMPLATE_ID = "template_rldnu8e";
const EMAILJS_PUBLIC_KEY = "C3yqfD-SqrDHQfY-W";
// ==================================================

export default function ContactForm({ dark }) {
  const formRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      setStatus("error");
      return;
    }

    setLoading(true);

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      setStatus("success");

      setForm({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      console.log(error);
      setStatus("error");
    } finally {
      setLoading(false);

      setTimeout(() => {
        setStatus(null);
      }, 4000);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "14px 18px",
    borderRadius: 12,
    fontSize: 15,
    outline: "none",
    boxSizing: "border-box",
    background: dark
      ? "rgba(255,255,255,0.05)"
      : "rgba(0,0,0,0.04)",
    border: `1px solid ${
      dark
        ? "rgba(255,255,255,0.12)"
        : "rgba(0,0,0,0.12)"
    }`,
    color: dark ? "#f1f5f9" : "#0f172a",
    fontFamily: "'DM Sans', sans-serif",
    transition: "border-color 0.2s",
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 16,
        }}
      >
        {/* NAME */}
        <input
          type="text"
          name="from_name"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          style={inputStyle}
        />

        {/* EMAIL */}
        <input
          type="email"
          name="from_email"
          placeholder="Email Address"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          style={inputStyle}
        />
      </div>

      {/* MESSAGE */}
      <textarea
        name="message"
        placeholder="Your Message"
        rows={5}
        value={form.message}
        onChange={(e) =>
          setForm({
            ...form,
            message: e.target.value,
          })
        }
        style={{
          ...inputStyle,
          resize: "vertical",
        }}
      />

      {/* BUTTON */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        whileHover={{ scale: 1.02 }}
        type="submit"
        disabled={loading}
        style={{
          padding: "15px 32px",
          borderRadius: 12,
          border: "none",
          cursor: loading ? "wait" : "pointer",
          background:
            "linear-gradient(135deg, #f89820, #ff6b6b)",
          color: "#fff",
          fontWeight: 700,
          fontSize: 15,
          fontFamily: "'DM Sans', sans-serif",
          boxShadow:
            "0 8px 24px rgba(248,152,32,0.35)",
          alignSelf: "flex-start",
        }}
      >
        {loading ? "Sending..." : "Send Message →"}
      </motion.button>

      {/* STATUS MESSAGE */}
      <AnimatePresence>
        {status && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              padding: "12px 18px",
              borderRadius: 10,
              background:
                status === "success"
                  ? "#22c55e22"
                  : "#ef444422",
              color:
                status === "success"
                  ? "#22c55e"
                  : "#ef4444",
              fontSize: 14,
              fontWeight: 600,
              border: `1px solid ${
                status === "success"
                  ? "#22c55e40"
                  : "#ef444440"
              }`,
            }}
          >
            {status === "success"
              ? "✓ Message sent successfully!"
              : "✕ Please fill all fields correctly."}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}