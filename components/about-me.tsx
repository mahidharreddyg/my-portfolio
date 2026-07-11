"use client";

import { useEffect, useRef } from "react";

const STACK = [
  "Go", "React.js", "Next.js", "Node.js", "Angular", "TypeScript",
  "Swift", "PostgreSQL", "MongoDB", "Docker", "Kubernetes", "AWS", "CI/CD", "Figma",
];

const ROLES = [
  {
    icon: "⚙",
    title: "AI Solutions Engineer",
    sub: "AVAAMO.AI",
    desc: "Building agentic AI co-pilots and intelligent voice systems for enterprise clients. Multi-agent pipelines, LLM orchestration, real-time voice APIs.",
  },
  {
    icon: "⚡",
    title: "Software Development Intern",
    sub: "SYNCLOVIS SYSTEMS",
    desc: "Full-stack development on MERN & MEAN stack. Led sprint planning as Scrum Master, improving deployment efficiency and team execution.",
  },
  {
    icon: "✦",
    title: "Director of Creativity",
    sub: "E-CELL VIT",
    desc: "Led brand identity and visual communication for E-Summit '25, Incepta, Futurepreneurs X, and Pioneira — VIT's flagship entrepreneurship events.",
  },
];

export default function AboutMe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  /* ── Particle canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    let W = 0, H = 0;
    let raf: number;

    const pts = Array.from({ length: 55 }, () => ({
      x: Math.random() * 1400,
      y: Math.random() * 900,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 1.1 + 0.3,
      a: Math.random(),
    }));

    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = W + 20;
        if (p.x > W + 20) p.x = -20;
        if (p.y < -20) p.y = H + 20;
        if (p.y > H + 20) p.y = -20;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(167,139,250,${p.a * 0.25})`;
        ctx.fill();
      });
      pts.forEach((a, i) => {
        for (let j = i + 1; j < pts.length; j++) {
          const b = pts[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(167,139,250,${(1 - d / 120) * 0.06})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  /* ── Entrance animations ── */
  useEffect(() => {
    const t = (id: string, delay: number) =>
      setTimeout(() => document.getElementById(id)?.classList.add("am-in"), delay);

    t("am-topbar", 100);
    t("am-header-label", 200);
    t("am-profile-wrapper", 300);
    t("am-name", 400);
    t("am-location", 500);
    t("am-bio-main", 600);
    t("am-divider", 750);
    t("am-experience-label", 850);
    t("am-r0", 950);
    t("am-r1", 1050);
    t("am-r2", 1150);
    t("am-stack-label", 1250);
    t("am-mission", 1350);
    t("am-footer", 1450);

    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("am-vis")),
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );

    [
      "am-experience-card-0", "am-experience-card-1", "am-experience-card-2",
      "am-stack", "am-mission", "am-footer",
      ...STACK.map((_, i) => `am-pill-${i}`),
    ].forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

        .am-root {
          position: relative;
          background: #080810;
          font-family: 'Space Grotesk', sans-serif;
          color: #e8e4dc;
          overflow-x: hidden;
          min-height: 100vh;
        }

        .am-canvas {
          position: fixed;
          inset: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        .am-wrap {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
          padding: 80px 40px 80px;
        }

        /* Top bar */
        .am-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 56px;
          opacity: 0;
          transform: translateY(-12px);
          transition: opacity 0.7s, transform 0.7s;
        }
        .am-topbar.am-in { opacity: 1; transform: none; }

        .am-mono {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.22);
          letter-spacing: .18em;
        }

        .am-status {
          display: flex;
          align-items: center;
          gap: 7px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: #6ee7b7;
          letter-spacing: .12em;
        }
        .am-dot {
          width: 5px; height: 5px;
          border-radius: 50%;
          background: #6ee7b7;
          animation: am-breathe 2.5s ease-in-out infinite;
        }
        @keyframes am-breathe {
          0%,100% { opacity:1; transform:scale(1); }
          50% { opacity:.3; transform:scale(.6); }
        }

        /* Header with profile */
        .am-header-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.18);
          letter-spacing: .2em;
          margin-bottom: 24px;
          opacity: 0;
          transform: translateX(-8px);
          transition: opacity 0.6s, transform 0.6s;
        }
        .am-header-label.am-in { opacity:1; transform:none; }

        .am-profile-wrapper {
          display: flex;
          align-items: flex-start;
          gap: 32px;
          margin-bottom: 32px;
          opacity: 0;
          transform: translateY(16px);
          transition: opacity 0.8s, transform 0.8s cubic-bezier(.16,1,.3,1);
        }
        .am-profile-wrapper.am-in { opacity:1; transform:none; }

        .am-profile-img {
          width: 140px;
          height: 140px;
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          flex-shrink: 0;
          box-shadow: 0 8px 32px rgba(0,0,0,0.3);
        }
        .am-profile-img img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .am-profile-info {
          flex: 1;
        }

        .am-name {
          font-size: 42px;
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.6s, transform 0.6s;
        }
        .am-name.am-in { opacity:1; transform:none; }

        .am-location {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          color: rgba(255,255,255,0.35);
          margin-bottom: 16px;
          display: flex;
          align-items: center;
          gap: 6px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.6s, transform 0.6s;
        }
        .am-location.am-in { opacity:1; transform:none; }

        .am-bio-main {
          font-size: 16px;
          line-height: 1.75;
          color: rgba(255,255,255,0.42);
          max-width: 560px;
          opacity: 0;
          transform: translateY(8px);
          transition: opacity 0.7s, transform 0.7s;
        }
        .am-bio-main.am-in { opacity:1; transform:none; }

        .am-accent { color: #a78bfa; }

        /* Divider */
        .am-divider {
          width: 100%;
          height: 1px;
          background: rgba(255,255,255,0.06);
          margin: 0 0 48px;
          opacity: 0;
          transition: opacity 0.5s;
        }
        .am-divider.am-in { opacity:1; }

        /* Section label */
        .am-section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.18);
          letter-spacing: .2em;
          margin-bottom: 24px;
          opacity: 0;
          transition: opacity 0.5s 0.1s;
        }
        .am-section-label.am-vis { opacity:1; }

        /* Experience cards */
        .am-experience { margin-bottom: 48px; }
        .am-experience-card {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding: 18px 0;
          border-bottom: .5px solid rgba(255,255,255,0.06);
          opacity: 0;
          transform: translateX(-12px);
          transition: opacity 0.55s, transform 0.55s cubic-bezier(.16,1,.3,1);
        }
        .am-experience-card:first-of-type { border-top: .5px solid rgba(255,255,255,0.06); }
        .am-experience-card.am-vis { opacity:1; transform:none; }

        .am-experience-icon {
          width: 34px; height: 34px;
          border-radius: 8px;
          background: rgba(255,255,255,0.04);
          border: .5px solid rgba(255,255,255,0.08);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
          font-size: 14px;
        }
        .am-experience-title { font-size: 14px; font-weight: 600; color: #f0ece4; margin-bottom: 4px; }
        .am-experience-sub {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.25);
          letter-spacing: .08em;
          margin-bottom: 8px;
        }
        .am-experience-desc { font-size: 13px; color: rgba(255,255,255,0.38); line-height: 1.65; }

        /* Stack */
        .am-stack { margin-bottom: 52px; }
        .am-stack-grid { display: flex; flex-wrap: wrap; gap: 8px; }
        .am-pill {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          padding: 7px 14px;
          border-radius: 4px;
          background: rgba(255,255,255,0.03);
          border: .5px solid rgba(255,255,255,0.08);
          color: rgba(255,255,255,0.45);
          letter-spacing: .05em;
          cursor: default;
          opacity: 0;
          transform: scale(.92);
          transition: opacity 0.4s, transform 0.4s cubic-bezier(.34,1.56,.64,1),
                      background 0.25s, border-color 0.25s, color 0.25s;
        }
        .am-pill.am-vis { opacity:1; transform:scale(1); }
        .am-pill:hover {
          background: rgba(167,139,250,0.08);
          border-color: rgba(167,139,250,0.28);
          color: rgba(167,139,250,0.9);
          transform: translateY(-2px);
        }

        /* Mission */
        .am-mission {
          padding: 32px;
          border: .5px solid rgba(255,255,255,0.07);
          border-radius: 12px;
          background: rgba(255,255,255,0.018);
          opacity: 0;
          transform: translateY(12px);
          transition: opacity 0.6s, transform 0.6s cubic-bezier(.16,1,.3,1);
        }
        .am-mission.am-vis { opacity:1; transform:none; }
        .am-mission-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 9px;
          color: rgba(255,255,255,0.2);
          letter-spacing: .22em;
          margin-bottom: 14px;
        }
        .am-mission-text { font-size: 17px; font-weight: 500; line-height: 1.6; color: rgba(255,255,255,0.72); }
        .am-mission-text .am-accent { color: #a78bfa; }

        /* Footer */
        .am-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-top: 48px;
          padding-top: 32px;
          border-top: .5px solid rgba(255,255,255,0.06);
          opacity: 0;
          transition: opacity 0.5s;
        }
        .am-footer-row.am-vis { opacity:1; }
        .am-contact {
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          color: rgba(255,255,255,0.28);
          letter-spacing: .08em;
          text-decoration: none;
          transition: color 0.2s;
        }
        .am-contact:hover { color: rgba(167,139,250,0.8); }
        .am-tagline {
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px;
          color: rgba(255,255,255,0.14);
          letter-spacing: .14em;
        }

        @media (max-width: 700px) {
          .am-wrap { padding: 56px 24px 64px; }
          .am-profile-wrapper { flex-direction: column; align-items: center; gap: 24px; }
          .am-profile-img { width: 120px; height: 120px; }
          .am-name { font-size: 32px; text-align: center; }
          .am-bio-main { text-align: center; max-width: 100%; }
          .am-footer-row { flex-direction: column; align-items: flex-start; gap: 10px; }
        }
      `}</style>

      <div className="am-root">
        <canvas ref={canvasRef} className="am-canvas" />

        <div className="am-wrap" ref={wrapRef}>
          {/* Top bar */}
          <div className="am-topbar" id="am-topbar">
            <span className="am-mono">mahidhar.reddy.g / about</span>
            <div className="am-status">
              <span className="am-dot" />
              AVAILABLE
            </div>
          </div>

          {/* Header with profile photo */}
          <div>
            <div className="am-header-label" id="am-header-label">ABOUT</div>
            <div className="am-profile-wrapper" id="am-profile-wrapper">
              <div className="am-profile-img">
                <img src="profile_pic.PNG" alt="Mahidhar Reddy G" />
              </div>
              <div className="am-profile-info">
                <h1 className="am-name" id="am-name">
                  Mahidhar Reddy G
                </h1>
                <div className="am-location" id="am-location">
                  📍 Bengaluru, India
                </div>
                <p className="am-bio-main" id="am-bio-main">
                  Final year Computer Science Engineering undergrad at <span className="am-accent">VIT</span>, specializing in
                  <span className="am-accent"> Full Stack Development</span>, <span className="am-accent">DevOps</span>,
                  <span className="am-accent"> UI/UX Strategy</span>, and <span className="am-accent">Cloud Infrastructure</span>.
                  AWS-certified as both Cloud Practitioner and Solutions Architect, I focus on scalable architectures,
                  performance optimization, cloud-native deployment, containerized workflows, and CI/CD automation.
                </p>
              </div>
            </div>
          </div>

          <div className="am-divider" id="am-divider" />

          {/* Experience */}
          <div className="am-experience">
            <div className="am-section-label" id="am-experience-label">EXPERIENCE</div>
            {ROLES.map((role, i) => (
              <div
                className="am-experience-card"
                id={`am-experience-card-${i}`}
                key={i}
              >
                <div className="am-experience-icon">{role.icon}</div>
                <div>
                  <div className="am-experience-title">{role.title}</div>
                  <div className="am-experience-sub">{role.sub}</div>
                  <div className="am-experience-desc">{role.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Stack */}
          <div className="am-stack" id="am-stack">
            <div className="am-section-label" id="am-stack-label">TECH ARSENAL</div>
            <div className="am-stack-grid">
              {STACK.map((s, i) => (
                <span className="am-pill" id={`am-pill-${i}`} key={s}>
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Mission */}
          <div className="am-mission" id="am-mission">
            <div className="am-mission-label">MISSION</div>
            <p className="am-mission-text">
              Build systems that{" "}
              <span className="am-accent">scale like infrastructure</span>, carry
              the finesse of design, and lead with intent.
            </p>
          </div>

          {/* Footer */}
          <div className="am-footer-row" id="am-footer">
            <a href="mailto:mahidhar.reddy2003@gmail.com" className="am-contact">
              mahidhar.reddy2003@gmail.com
            </a>
            <span className="am-tagline">BLR, INDIA · VIT '26</span>
          </div>
        </div>
      </div>
    </>
  );
}