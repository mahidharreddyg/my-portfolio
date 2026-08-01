import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

/* ─────────────────────────────────────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────────────────────────────────────── */
interface Cert {
  id: string;
  name: string;
  issuer: string;
  category: "Cloud" | "AI/ML" | "DevOps";
  level: string;
  credId: string;
  issued: string;
  expiry: string;
  active: boolean;
  skills: { label: string; val: number }[];
  hue: number;
  hash: string;
  version: string;
}

const DATA: Cert[] = [
  {
    id: "aws-sap", name: "Solutions Architect", issuer: "Amazon Web Services",
    category: "Cloud", level: "Professional", credId: "AWS-SAP-X8K4F",
    issued: "Mar 2024", expiry: "Mar 2027", active: true, hue: 199,
    hash: "sha256:f82b...9a21", version: "v4.2.0",
    skills: [{ label: "Architecture", val: 95 }, { label: "Networking", val: 88 }, { label: "Security", val: 82 }],
  },
  {
    id: "aws-ml", name: "ML Specialty", issuer: "Amazon Web Services",
    category: "AI/ML", level: "Specialty", credId: "AWS-MLS-P9L2R",
    issued: "Jun 2024", expiry: "Jun 2027", active: true, hue: 267,
    hash: "sha256:de91...1b4c", version: "v2.1.0",
    skills: [{ label: "ML Design", val: 90 }, { label: "SageMaker", val: 85 }, { label: "Data Eng", val: 78 }],
  },
  {
    id: "docker", name: "Docker Certified Associate", issuer: "Docker Inc.",
    category: "DevOps", level: "Associate", credId: "DCA-M7T5Q",
    issued: "Nov 2023", expiry: "Nov 2026", active: true, hue: 213,
    hash: "sha256:a12e...88f4", version: "v20.10",
    skills: [{ label: "Containers", val: 92 }, { label: "Orchestration", val: 85 }, { label: "Networking", val: 80 }],
  },
  {
    id: "tf", name: "TensorFlow Developer", issuer: "Google / DeepLearning.AI",
    category: "AI/ML", level: "Developer", credId: "TFD-C3N8V",
    issued: "Jan 2024", expiry: "Jan 2027", active: true, hue: 28,
    hash: "sha256:c390...f451", version: "v2.15",
    skills: [{ label: "Neural Nets", val: 93 }, { label: "NLP", val: 87 }, { label: "Vision", val: 84 }],
  },
  {
    id: "cka", name: "Kubernetes Administrator", issuer: "CNCF",
    category: "DevOps", level: "Administrator", credId: "CKA-H6W2J",
    issued: "Apr 2024", expiry: "Apr 2026", active: true, hue: 222,
    hash: "sha256:44b1...ec02", version: "v1.29",
    skills: [{ label: "K8s Admin", val: 91 }, { label: "Networking", val: 83 }, { label: "Storage", val: 75 }],
  },
  {
    id: "gcp", name: "Professional Data Engineer", issuer: "Google Cloud",
    category: "Cloud", level: "Professional", credId: "GCP-Z4K1L",
    issued: "Sep 2023", expiry: "Sep 2025", active: false, hue: 152,
    hash: "sha256:e92a...00b8", version: "v3.8.1",
    skills: [{ label: "BigQuery", val: 89 }, { label: "Dataflow", val: 82 }, { label: "Pub/Sub", val: 77 }],
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   BACKGROUND
───────────────────────────────────────────────────────────────────────────── */
function Background() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    let raf: number;
    let isVisible = true;

    const resize = () => {
      const parent = c.parentElement;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      if (parent) {
        c.width = parent.offsetWidth * dpr;
        c.height = parent.offsetHeight * dpr;
      } else {
        c.width = window.innerWidth * dpr;
        c.height = window.innerHeight * dpr;
      }
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const lines = Array.from({ length: 25 }, (_, i) => ({
      x: (i / 25) + (Math.random() * 0.04 - 0.02),
      y: Math.random() * 2 - 1,
      speed: Math.random() * 0.0015 + 0.0005,
      len: Math.random() * 0.3 + 0.1,
      opacity: Math.random() * 0.3 + 0.15,
      hue: Math.random() > 0.5 ? 210 : 255,
    }));

    function frame() {
      if (!c || !ctx) return;
      if (!isVisible) {
        raf = requestAnimationFrame(frame);
        return;
      }
      const W = c.width, H = c.height;
      ctx.clearRect(0, 0, W, H);

      ctx.save();
      const horizon = H * 0.45;
      ctx.strokeStyle = "rgba(var(--tc2-rgb),0.15)";
      ctx.lineWidth = 0.5;

      for (let i = -14; i <= 14; i++) {
        const xBase = W / 2 + i * (W * 0.08);
        ctx.beginPath();
        ctx.moveTo(W / 2 + i * 2, horizon);
        ctx.lineTo(xBase, H);
        ctx.stroke();
      }

      for (let j = 0; j < 15; j++) {
        const p = (j / 14) ** 2;
        const y = horizon + (H - horizon) * p;
        const alpha = 0.15 * (1 - j / 15);
        ctx.strokeStyle = `rgba(var(--tc2-rgb),${alpha})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(W, y);
        ctx.stroke();
      }
      ctx.restore();

      const time = Date.now() / 1000;
      const pulse = (Math.sin(time * Math.PI) + 1) / 2;

      lines.forEach((l) => {
        l.y -= l.speed * 2;
        if (l.y < -0.4) l.y = 1.2;

        const lx = l.x * W;
        const lyTop = l.y * H;
        const lyBot = (l.y + l.len) * H;

        const g = ctx.createLinearGradient(0, lyTop, 0, lyBot);
        g.addColorStop(0, "transparent");
        g.addColorStop(0.15, `hsla(${l.hue}, 100%, 90%, ${l.opacity * (0.9 + 0.1 * pulse)})`);
        g.addColorStop(0.4, `hsla(${l.hue}, 100%, 75%, ${l.opacity * (0.7 + 0.3 * pulse)})`);
        g.addColorStop(1, "transparent");

        ctx.shadowBlur = 10 + 15 * pulse;
        ctx.shadowColor = `hsla(${l.hue}, 100%, 70%, ${l.opacity * pulse})`;
        ctx.fillStyle = g;
        ctx.fillRect(lx, lyTop, 3, Math.max(1, lyBot - lyTop));
      });

      raf = requestAnimationFrame(frame);
    }
    frame();

    // Pause canvas when section is off-screen
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0.05 }
    );
    if (c.parentElement) observer.observe(c.parentElement);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      observer.disconnect();
    };
  }, []);

  return <canvas ref={ref} style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ─────────────────────────────────────────────────────────────────────────────
   CARD
───────────────────────────────────────────────────────────────────────────── */
function Card({ cert, onClick, i, showIds }: { cert: Cert; onClick: () => void; i: number; showIds: boolean }) {
  const [hov, setHov] = useState(false);
  const el = useRef<HTMLDivElement>(null);
  const moveRaf = useRef<number | null>(null);

  const move = (e: React.MouseEvent) => {
    const node = el.current;
    if (!node) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (moveRaf.current !== null) return;
    moveRaf.current = requestAnimationFrame(() => {
      moveRaf.current = null;
      const r = node.getBoundingClientRect();
      const x = (clientX - r.left) / r.width;
      const y = (clientY - r.top) / r.height;
      const rx = (y - 0.5) * -10;
      const ry = (x - 0.5) * 10;
      node.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-9px)`;
      node.style.setProperty("--gx", `${x * 100}%`);
      node.style.setProperty("--gy", `${y * 100}%`);
    });
  };

  useEffect(() => () => {
    if (moveRaf.current !== null) cancelAnimationFrame(moveRaf.current);
  }, []);

  const h = cert.hue;

  return (
    <div
      ref={el}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => {
        setHov(false);
        if (el.current) el.current.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)";
      }}
      onMouseMove={move}
      style={{
        position: "relative", cursor: "pointer",
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)",
        transition: "transform 0.36s cubic-bezier(.22,1,.36,1)",
        animation: `cardIn .58s ${i * .07}s both`,
        ["--gx" as any]: "50%",
        ["--gy" as any]: "50%",
      }}
    >
      <div style={{
        position: "absolute", inset: -2, borderRadius: 22, zIndex: 0, pointerEvents: "none",
        opacity: hov ? 1 : 0, transition: "opacity .3s",
        background: `radial-gradient(ellipse at var(--gx) var(--gy), hsla(${h}, 80%, 62%, 0.25) 0%, transparent 68%)`,
        filter: "blur(4px)",
      }} />

      <div style={{
        position: "relative", zIndex: 1, borderRadius: 20,
        background: `linear-gradient(148deg, hsla(${h}, 30%, 20%, 0.15) 0%, rgba(255,255,255,.02) 55%, rgba(0,0,0,.15) 100%)`,
        backdropFilter: "none",
        border: `1px solid rgba(255,255,255,${hov ? 0.2 : 0.08})`,
        boxShadow: hov
          ? `inset 0 1px 0 rgba(255,255,255,.2), 0 24px 56px rgba(0,0,0,.5), 0 0 0 1px rgba(255,255,255,.04)`
          : `inset 0 1px 0 rgba(255,255,255,.1), 0 8px 22px rgba(0,0,0,.3)`,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "border-color 0.28s, box-shadow 0.28s",
      }}>
        <div style={{ padding: "1.4rem 1.4rem 0", flex: 1 }}>
          <div style={{
            display: "flex", justifyContent: "space-between", alignItems: "center",
            marginBottom: "1rem", padding: "4px 8px", borderRadius: 4,
            background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 5, height: 5, borderRadius: "50%",
                background: cert.active ? "#34d399" : "#fbbf24",
                boxShadow: `0 0 8px ${cert.active ? "#34d39999" : "#fbbf2499"}`
              }} />
              <span style={{ fontFamily: "var(--mono)", fontSize: 8, color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em" }}>
                {cert.active ? "NOMINAL" : "SYNCING"}
              </span>
            </div>
            <span style={{ fontFamily: "var(--mono)", fontSize: 8, color: `hsla(${h}, 75%, 75%, 0.6)` }}>{cert.version}</span>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.6rem" }}>
            <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "rgba(255,255,255,0.3)", letterSpacing: "0.05em" }}>
              {cert.issuer}
            </div>
            <span style={{
              fontFamily: "var(--mono)", fontSize: 8,
              padding: "2px 6px", borderRadius: 3,
              background: `hsla(${h}, 70%, 50%, 0.12)`,
              border: `1px solid hsla(${h}, 70%, 65%, 0.25)`,
              color: `hsla(${h}, 75%, 85%, 0.8)`,
              textTransform: "uppercase"
            }}>{cert.level}</span>
          </div>

          <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em", lineHeight: 1.25, marginBottom: "0.6rem" }}>
            {cert.name}
          </div>

          <div style={{
            fontFamily: "var(--mono)", fontSize: 9, fontWeight: 500,
            color: `hsla(${h}, 65%, 72%, 0.68)`, marginBottom: "1.1rem"
          }}>{cert.category}</div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem",
            padding: "0.8rem 0", borderTop: "1px solid rgba(255,255,255,0.08)", borderBottom: "1px solid rgba(255,255,255,0.08)",
            marginBottom: "1rem"
          }}>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 7, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: 2 }}>ISSUED</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "rgba(255,255,255,0.7)" }}>{cert.issued}</div>
            </div>
            <div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 7, color: "rgba(255,255,255,0.25)", letterSpacing: "0.1em", marginBottom: 2 }}>EXPIRY</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "rgba(255,255,255,0.7)" }}>{cert.expiry}</div>
            </div>
          </div>

          {showIds && (
            <div style={{
              fontFamily: "var(--mono)", fontSize: 7, color: "rgba(255,255,255,0.2)",
              background: "rgba(0,0,0,0.2)", padding: "5px 8px", borderRadius: 5,
              border: "1px solid rgba(255,255,255,0.04)", wordBreak: "break-all",
              marginBottom: "1.2rem", animation: "fadeIn 0.3s ease forwards"
            }}>
              {cert.credId}
            </div>
          )}
        </div>

        <div style={{
          borderTop: `1px solid rgba(255,255,255,${hov ? 0.12 : 0.06})`,
          padding: "0.75rem 1.4rem",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: hov
            ? `linear-gradient(90deg,hsla(${h}, 60%, 50%, 0.1),transparent)`
            : "rgba(255,255,255,0.02)",
          transition: "background 0.28s, border-color 0.28s",
        }}>
          <span style={{
            fontFamily: "var(--mono)", fontSize: 9,
            color: hov ? `hsla(${h}, 70%, 80%, 1)` : "rgba(255,255,255,0.35)",
            letterSpacing: "0.12em",
            transition: "color 0.22s",
          }}>VIEW_DETAILS</span>
          <svg
            width="12" height="12" viewBox="0 0 14 14" fill="none"
            style={{ transform: hov ? "translateX(3px)" : "translateX(0)", transition: "transform 0.22s", opacity: hov ? 1 : 0.4 }}
          >
            <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke={hov ? `hsl(${h}, 70%, 75%)` : "rgba(255,255,255,.6)"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MODAL (User Requested Design with Portal Fix)
───────────────────────────────────────────────────────────────────────────── */
function Modal({ cert, onClose }: { cert: Cert; onClose: () => void }) {
  const [ready, setReady] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const h = cert.hue;

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 170);
    return () => clearTimeout(t);
  }, [cert]);

  useEffect(() => {
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", fn);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const modalContent = (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed", inset: 0, zIndex: 9999, // Super high z-index to break out of everything
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "1.5rem",
        background: "rgba(1,0,8,.88)", // Slightly more opaque to ensure contrast
        backdropFilter: 'none',
        animation: "fadeIn .32s ease both",
      }}
    >
      <div style={{
        width: "100%", maxWidth: 540, position: "relative",
        animation: "modalUp .46s cubic-bezier(.22,1,.36,1) both",
        opacity: 1 // Explicit opacity to prevent invisibility if animation glitches
      }}>
        {/* gradient border */}
        <div style={{
          position: "absolute", inset: -1, borderRadius: 25, zIndex: -1,
          background: `linear-gradient(135deg,
            hsla(${h},90%,65%,.75),
            hsla(${(h + 60) % 360},90%,65%,.45),
            hsla(${(h + 180) % 360},80%,60%,.3))`,
          filter: "blur(1px)",
        }} />

        <div style={{
          borderRadius: 24, overflow: "hidden",
          background: "linear-gradient(162deg,rgba(9,6,24,.97),rgba(3,2,12,1))",
          backdropFilter: "none",
          border: "1px solid rgba(255,255,255,.08)",
          maxHeight: "88vh", overflowY: "auto",
        }}>
          {/* hero */}
          <div style={{
            height: 185, position: "relative", overflow: "hidden",
            background: `
              radial-gradient(ellipse 85% 110% at 50% 105%,
                hsla(${h},80%,48%,.38) 0%, transparent 68%),
              linear-gradient(180deg,rgba(9,6,24,0) 0%,rgba(3,2,12,.65) 100%)
            `,
          }}>
            {/* hex grid */}
            <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: .08 }}
              viewBox="0 0 540 185" preserveAspectRatio="xMidYMid slice">
              {Array.from({ length: 7 }).map((_, row) =>
                Array.from({ length: 11 }).map((_, col) => {
                  const R = 22, cx = col * 52 + (row % 2) * 26, cy = row * 44;
                  const pts = Array.from({ length: 6 })
                    .map((_, i) => { const a = (Math.PI / 3) * i - Math.PI / 6; return `${cx + R * Math.cos(a)},${cy + R * Math.sin(a)}`; })
                    .join(" ");
                  return <polygon key={`${row}-${col}`} points={pts} fill="none" stroke={`hsl(${h},80%,65%)`} strokeWidth=".5" />;
                })
              )}
            </svg>

            {/* large category symbol */}
            <div style={{
              position: "absolute", inset: 0,
              display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 8,
            }}>
              <div style={{
                fontSize: 48, fontWeight: 800, fontFamily: "var(--display)",
                letterSpacing: "-.03em", lineHeight: 1,
                color: `hsla(${h},85%,73%,.95)`,
                filter: `drop-shadow(0 0 44px hsla(${h},100%,60%,.75))`,
              }}>
                {cert.category === "AI/ML" ? "AI" : cert.category}
              </div>
              <div style={{
                fontFamily: "var(--mono)", fontSize: 9,
                color: `hsla(${h},55%,80%,.5)`, letterSpacing: ".22em",
              }}>{cert.issuer.toUpperCase()}</div>
            </div>

            {/* level badge */}
            <div style={{
              position: "absolute", top: 14, right: 14,
              padding: "4px 12px", borderRadius: 4,
              fontFamily: "var(--mono)", fontSize: 9, letterSpacing: ".18em",
              background: `hsla(${h},70%,50%,.14)`,
              border: `1px solid hsla(${h},80%,65%,.3)`,
              color: `hsla(${h},60%,84%,.85)`,
            }}>{cert.level.toUpperCase()}</div>

            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 72, background: "linear-gradient(transparent,rgba(3,2,12,.99))" }} />
          </div>

          {/* close */}
          <button onClick={onClose} style={{
            position: "absolute", top: 12, left: 14,
            width: 32, height: 32, borderRadius: "50%", cursor: "pointer",
            background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.12)",
            color: "rgba(255,255,255,.48)", fontSize: 13,
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 30,
            transition: "all .2s"
          }}>
            ✕
          </button>

          <div style={{ padding: "1.5rem 1.8rem 2.1rem" }}>
            {/* name */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div style={{
                fontSize: "1.6rem", fontWeight: 800, letterSpacing: "-.03em",
                color: "#fff", lineHeight: 1.1, marginBottom: 7,
              }}>{cert.name}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  width: 6, height: 6, borderRadius: "50%",
                  background: cert.active ? "#4ade80" : "#fbbf24",
                  boxShadow: `0 0 8px ${cert.active ? "#4ade80" : "#fbbf24"}`,
                }} />
                <span style={{
                  fontFamily: "var(--mono)", fontSize: 10, letterSpacing: ".1em",
                  color: cert.active ? "rgba(74,222,128,.7)" : "rgba(251,191,36,.7)",
                }}>{cert.active ? "ACTIVE" : "RENEWAL PENDING"}</span>
              </div>
            </div>

            {/* info grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "1.5rem" }}>
              {[
                { label: "CREDENTIAL ID", value: cert.credId, accent: true },
                { label: "CATEGORY", value: cert.category },
                { label: "ISSUED", value: cert.issued },
                { label: "EXPIRES", value: cert.expiry },
              ].map(({ label, value, accent }) => (
                <div key={label} style={{
                  padding: "10px 12px", borderRadius: 10,
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.055)",
                  position: "relative", overflow: "hidden",
                }}>
                  <div style={{
                    position: "absolute", top: 0, left: "12%", right: "12%", height: 1,
                    background: `linear-gradient(90deg,transparent,hsla(${h},80%,65%,.28),transparent)`,
                  }} />
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: 8,
                    color: "rgba(255,255,255,.2)", letterSpacing: ".18em", marginBottom: 5,
                  }}>{label}</div>
                  <div style={{
                    fontFamily: "var(--mono)", fontSize: 12, fontWeight: 600,
                    color: accent ? `hsla(${h},85%,78%,1)` : "rgba(255,255,255,.78)",
                    letterSpacing: ".03em",
                  }}>{value}</div>
                </div>
              ))}
            </div>

            {/* skills */}
            <div style={{ marginBottom: "1.6rem" }}>
              <div style={{
                fontFamily: "var(--mono)", fontSize: 8,
                color: "rgba(255,255,255,.18)", letterSpacing: ".2em", marginBottom: 12,
              }}>SKILL PROFICIENCY</div>
              {cert.skills.map((s, idx) => (
                <div key={s.label} style={{ marginBottom: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: "rgba(255,255,255,.52)" }}>{s.label}</span>
                    <span style={{ fontFamily: "var(--mono)", fontSize: 11, color: `hsla(${h},75%,70%,.82)` }}>{s.val}%</span>
                  </div>
                  <div style={{ height: 3, borderRadius: 2, background: "rgba(255,255,255,.05)", overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${s.val}%`, borderRadius: 2, transformOrigin: "left",
                      background: `linear-gradient(90deg,hsla(${h},90%,55%,.9),hsla(${(h + 50) % 360},90%,65%,.85))`,
                      boxShadow: `0 0 10px hsla(${h},90%,55%,.38)`,
                      transform: ready ? "scaleX(1)" : "scaleX(0)",
                      transition: `transform .88s ${idx * .11}s cubic-bezier(.22,1,.36,1)`,
                    }} />
                  </div>
                </div>
              ))}
            </div>

            {/* actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <a href="#" style={{
                flex: 1, padding: "13px 16px", borderRadius: 12,
                background: `linear-gradient(135deg,hsla(${h},90%,52%,.88),hsla(${(h + 55) % 360},90%,58%,.82))`,
                color: "#000", fontFamily: "var(--mono)", fontWeight: 700,
                fontSize: 11, letterSpacing: ".14em",
                textDecoration: "none", textAlign: "center", display: "block",
                boxShadow: `0 6px 28px hsla(${h},90%,50%,.34)`,
                transition: "all .2s",
              }}>VERIFY CREDENTIAL</a>
              <a href="#" style={{
                flex: 1, padding: "13px 16px", borderRadius: 12,
                background: `hsla(${h},50%,55%,.08)`,
                border: `1px solid hsla(${h},65%,65%,.2)`,
                color: "rgba(255,255,255,.72)", fontFamily: "var(--mono)",
                fontSize: 11, letterSpacing: ".14em",
                textDecoration: "none", textAlign: "center", display: "block",
                transition: "all .2s",
              }}>VIEW CERTIFICATE</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

/* ─────────────────────────────────────────────────────────────────────────────
   ROOT
───────────────────────────────────────────────────────────────────────────── */
export default function Certifications() {
  const [open, setOpen] = useState<Cert | null>(null);
  const [cat, setCat] = useState("ALL");
  const [showIds, setShowIds] = useState(false);

  const list = cat === "ALL" ? DATA : DATA.filter(d => {
    const map: Record<string, number[]> = {
      "Cloud": [199, 152],
      "AI/ML": [267, 28],
      "DevOps": [213, 222]
    };
    return map[cat]?.includes(d.hue);
  });

  return (
    <section
      id="certifications-vault"
      style={{
        position: "relative", width: "100%", height: "100%",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start",
        padding: "5vh 0", color: "#fff"
      }}
    >
      <style>{`
        :root { --display: var(--font-malinton), sans-serif; --mono: var(--font-jetbrains-mono), monospace; }
        @keyframes cardIn {
          from { opacity:0; transform:perspective(1100px) rotateX(10deg) translateY(30px) scale(.94); }
          to   { opacity:1; transform:perspective(1100px) rotateX(0) translateY(0) scale(1); }
        }
        @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
        @keyframes modalUp { from{opacity:0;transform:scale(.88) translateY(22px)} to{opacity:1;transform:scale(1) translateY(0)} }
        @keyframes pulseRing { 0%,100%{opacity:.65;transform:scale(1)} 50%{opacity:.12;transform:scale(1.55)} }
        @keyframes titleIn  { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <Background />

      <div style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 1100, padding: "0 2rem" }}>

        {/* Section heading */}
        <div style={{ position: "relative", marginBottom: "2rem", animation: "titleIn .6s ease both" }}>
          {/* Oversized faint watermark behind the heading — same motif as
              the Experience section's GhostYear: the word itself, huge and
              low-opacity, as texture rather than a literal label. */}
          <span
            aria-hidden
            style={{
              position: "absolute", left: "-4px", top: "-1.1em",
              fontFamily: "var(--display)", fontWeight: 800,
              fontSize: "clamp(80px, 12vw, 150px)", letterSpacing: "-5px",
              whiteSpace: "nowrap", pointerEvents: "none", userSelect: "none",
              background: "linear-gradient(180deg, rgba(var(--tc2-rgb),0.14) 0%, rgba(var(--tc2-rgb),0) 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              WebkitTextStroke: "1px rgba(var(--tc2-rgb),0.08)",
            }}
          >
            CERTS
          </span>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 14,
            fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.3em",
            textTransform: "uppercase", color: "rgba(120,170,255,0.75)",
          }}>
            <span style={{ width: 34, height: 1, background: "linear-gradient(90deg, rgba(var(--tc2-rgb),0.6), transparent)" }} />
            Proof of work
          </div>
          <h2 style={{
            fontFamily: "var(--display)", fontWeight: 800, letterSpacing: "-0.03em",
            fontSize: "clamp(36px, 6vw, 66px)", lineHeight: 0.98, color: "#fff", margin: 0,
          }}>
            Certifications<span style={{ color: "#38bdf8" }}>.</span>
          </h2>
          <p style={{
            marginTop: 14, maxWidth: "48ch", fontSize: 14, lineHeight: 1.6,
            color: "rgba(255,255,255,0.42)",
          }}>
            Verified credentials across cloud, AI/ML, and DevOps — the archive behind the architecture.
          </p>
        </div>

        {/* Header Terminal */}
        <div style={{
          marginBottom: "2.5rem", padding: "14px 24px", borderRadius: 12,
          background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          animation: "titleIn .7s ease both", backdropFilter: 'none'
        }}>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.25em", marginBottom: 4 }}>VAULT_ACCESS</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 12px #10b981cc" }} />
                <span style={{ fontSize: 11, color: "#10b981", fontWeight: 800, letterSpacing: "0.1em" }}>AUTHORIZED_SECURE</span>
              </div>
            </div>
            <div className="hidden md:block">
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.25em", marginBottom: 4 }}>FILESYSTEM</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", opacity: 0.8 }}>/ROOT/ARCHIVE/CREDENTIALS</div>
            </div>
          </div>
          <div style={{ textAlign: "right", display: "flex", alignItems: "center", gap: 20 }}>
            <button
              onClick={() => setShowIds(v => !v)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "6px 10px", borderRadius: 6, cursor: "pointer",
                background: showIds ? "rgba(74,222,128,.07)" : "rgba(255,255,255,.04)",
                border: `1px solid ${showIds ? "rgba(74,222,128,.28)" : "rgba(255,255,255,.08)"}`,
                transition: "all .25s", fontFamily: "var(--mono)", color: showIds ? "#4ade80" : "rgba(255,255,255,0.4)"
              }}
            >
              <span style={{ fontSize: 8, letterSpacing: ".12em" }}>METADATA: {showIds ? "VISIBLE" : "HIDDEN"}</span>
            </button>
            <div className="hidden md:block">
              <div style={{ fontSize: 8, color: "rgba(255,255,255,0.3)", letterSpacing: "0.25em", marginBottom: 4 }}>LAST_SYNC</div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", opacity: 0.8 }}>{new Date().toISOString().split('T')[0].replace(/-/g, '.')}</div>
            </div>
          </div>
        </div>

        {/* Grid — guaranteed multi-column layout */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(310px, 1fr))",
          gap: "1.5rem",
          width: "100%"
        }}>
          {list.map((cert, i) => (
            <Card key={cert.id} cert={cert} onClick={() => setOpen(cert)} i={i} showIds={showIds} />
          ))}
        </div>

        {/* System Stats Footer */}
        <div style={{
          marginTop: "3.5rem", paddingTop: "2rem", borderTop: "1px solid rgba(255,255,255,0.08)",
          display: "flex", gap: "3rem", animation: "titleIn .9s .2s ease both"
        }}>
          {[{ n: DATA.length, l: "Total_Entries" }, { n: DATA.filter(d => d.active).length, l: "Verified" }, { n: 3, l: "Subsystems" }].map(({ n, l }) => (
            <div key={l}>
              <div style={{ fontSize: "1.6rem", fontWeight: 800, color: "rgba(255,255,255,0.5)", lineHeight: 1 }}>{n}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: 9, color: "rgba(255,255,255,0.25)", letterSpacing: "0.18em", marginTop: 5 }}>{l.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </div>

      {open && <Modal cert={open} onClose={() => setOpen(null)} />}
    </section>
  );
}