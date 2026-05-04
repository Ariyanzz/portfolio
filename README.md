# 🚀 Developer Portfolio — Ariyan Gupta

A modern, fully responsive developer portfolio built with **React 18**, **Framer Motion**, and **EmailJS**.

---

## ✨ Features

- **Hero Section** — Typing animation, availability badge, download resume CTA
- **About Section** — Bio, education, experience, and goals
- **Skills Section** — Animated progress bars + tech badge grid
- **Projects Section** — Glassmorphism cards with hover effects, GitHub & demo links
- **Contact Form** — EmailJS-powered form with validation
- **Dark / Light Mode** — Smooth toggle with persistent theme
- **Particle Background** — Canvas-based animated particle network
- **Fully Responsive** — Mobile-first with hamburger navigation
- **Smooth Animations** — Scroll-triggered reveals via Framer Motion

---

## 🛠 Tech Stack

| Layer       | Tech                    |
|-------------|-------------------------|
| UI          | React 18                |
| Animations  | Framer Motion 11        |
| Email       | @emailjs/browser        |
| Fonts       | Space Grotesk, DM Sans, Fira Code |
| Styling     | Inline styles + CSS variables |

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm start

# 3. Open http://localhost:3000
```

---

## ✏️ Personalizing Your Portfolio

All content is centralized in **`src/data/portfolioData.js`**:

```js
export const PERSONAL = {
  name: "Your Name",
  email: "you@email.com",
  location: "Your City",
  githubUrl: "https://github.com/yourhandle",
  linkedinUrl: "https://linkedin.com/in/yourhandle",
  resumeUrl: "/resume.pdf",  
};
```

Edit `SKILLS`, `PROJECTS`, `ROLES`, and `ABOUT` in the same file.

---

## 📧 Setting Up EmailJS

1. Create a free account at [emailjs.com](https://www.emailjs.com/)
2. Create a **Service** and **Email Template**
3. Open `src/components/ContactForm.jsx` and replace:

```js
const EMAILJS_SERVICE_ID  = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY  = "YOUR_PUBLIC_KEY";
```

4. Uncomment the `emailjs.sendForm(...)` call and remove the simulated delay.

---

## 📦 Build for Production

```bash
npm run build
```

The `build/` folder is ready to deploy to **Vercel**, **Netlify**, **GitHub Pages**, or any static host.

### Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

Drag and drop the `build/` folder at [netlify.com/drop](https://app.netlify.com/drop).

---

## 📁 Project Structure

```
portfolio/
├── public/
│   ├── index.html
│   └── resume.pdf          ← place your resume here
├── src/
│   ├── components/
│   │   ├── Portfolio.jsx   ← main page orchestrator
│   │   ├── Navbar.jsx
│   │   ├── ParticleCanvas.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── SkillBar.jsx
│   │   ├── ContactForm.jsx
│   │   └── FadeIn.jsx
│   ├── data/
│   │   └── portfolioData.js  ← ✏️ edit your content here
│   ├── hooks/
│   │   └── useTypingAnimation.js
│   ├── App.js
│   ├── index.js
│   └── index.css
└── package.json
```

---

## 📄 License

MIT — free to use and customize.
