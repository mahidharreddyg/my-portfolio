"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ================================================================
   DATA
================================================================ */
type Kind = "work" | "edu";
interface Entry {
  id: number;
  kind: Kind;
  year: string;
  role: string;
  org: string;
  period: string;
  location: string;
  duration?: string;
  type?: string;
  adds?: number;
  dels?: number;
  desc: string;
  tags: string[];
  color: string;
  logo?: string; // URL — drop your logo URLs here later
  href?: string; // page to open on click
  logoScale?: number;
  orgLabel?: string;
}

const ENTRIES: Entry[] = [
  {
    id: 1,
    kind: "edu",
    year: "2009",
    role: "ICSE — Secondary School",
    org: "Sri Kumaran Public School",
    period: "2009 — 2019",
    location: "Bangalore, India",
    duration: "10y",
    type: "ICSE Board",
    desc: "Completed ICSE secondary education. Built a strong foundation in science, mathematics, and computer science fundamentals over a decade of schooling.",
    tags: ["Mathematics", "Science", "Computer Science", "English"],
    color: "#38bdf8",
    logo: "/icons/skps.svg",
    href: "/experience/sri-kumaran",
    logoScale: 1.3,
  },
  {
    id: 2,
    kind: "edu",
    year: "2019",
    role: "CBSE — Grade 12",
    org: "Nehru Smaraka Vidyalaya",
    period: "2019 — 2021",
    location: "Bangalore, India",
    duration: "2y",
    type: "CBSE Board",
    desc: "Completed higher secondary education under the CBSE curriculum with a focus on PCM (Physics, Chemistry, Mathematics) and Computer Science.",
    tags: ["Physics", "Chemistry", "Mathematics", "Computer Science"],
    color: "#f472b6",
    logo: "/icons/nehru.svg",
    href: "/experience/nehru-smaraka",
    logoScale: 1.25,
  },
  {
    id: 3,
    kind: "edu",
    year: "2022",
    role: "B.Tech — Computer Science",
    org: "Vellore Institute of Technology",
    period: "2022 — 2026",
    location: "Vellore, India",
    duration: "4y",
    type: "Undergraduate",
    desc: "Pursuing BTech in Computer Science. Active member of Entrepreneurship Cell VIT and Apple Developer's Group VIT. Focused on software engineering and product development.",
    tags: ["DSA", "OS", "DBMS", "Swift", "Problem Solving"],
    color: "#a78bfa",
    logo: "/icons/vit.svg",
    href: "/experience/vit",
    logoScale: 1.25,
  },
  {
    id: 4,
    kind: "work",
    year: "2024",
    role: "Software Developer Intern",
    org: "Synclovis Systems.",
    period: "Jun 2024 — Sep 2024",
    location: "Bengaluru, India",
    duration: "4m",
    type: "Internship",
    adds: 680,
    dels: 120,
    desc: "On-site internship building production features for real-world software systems. Gained hands-on exposure to professional engineering workflows and collaborative development.",
    tags: ["Software Development", "On-site", "Bengaluru"],
    color: "#34d399",
    logo: "/icons/Synclovis.svg",
    href: "/experience/synclovis",
  },
  {
    id: 5,
    kind: "work",
    year: "2024",
    role: "Director of Creativity",
    org: "Entrepreneurship Cell, VIT",
    orgLabel: "student organisation",
    period: "Jul 2024 — Jul 2025",
    location: "VIT, Vellore",
    duration: "1y",
    type: "Leadership",
    adds: 310,
    dels: 40,
    desc: "Led the creative direction for one of VIT's most active student organizations. Drove design, branding, and event experiences for entrepreneurship initiatives across campus.",
    tags: ["Leadership", "Branding", "Design", "Event Management"],
    color: "#fb923c",
    logo: "/icons/ecell vit.svg",
    href: "/experience/ecell-vit",
    logoScale: 1.2,
  },
];

function hexRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

/* ================================================================
   SCROLL HOOK
================================================================ */
function useScrollPct(ref: React.RefObject<HTMLElement>) {
  const [p, setP] = useState(0);
  useEffect(() => {
    const fn = () => {
      if (!ref.current) return;
      const { top, height } = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      setP(Math.max(0, Math.min(1, -top / (height - vh))));
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return p;
}

/* ================================================================
   LOGO PLACEHOLDER — shown when no logo URL is provided
================================================================ */
function LogoPlaceholder({ entry }: { entry: Entry }) {
  const initials = entry.org
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  const rgb = hexRgb(entry.color).join(",");

  return (
    <div
      className="ec-logo-ph"
      style={{
        background: `rgba(${rgb},0.12)`,
        border: `1px solid rgba(${rgb},0.28)`,
        color: entry.color,
      }}
    >
      {initials}
    </div>
  );
}

/* ================================================================
   LIQUID GLASS CARD — fixed size, logo slot top-right
================================================================ */
function EntryCard({ entry }: { entry: Entry }) {
  const [hov, setHov] = useState(false);
  const [mx, setMx] = useState(0.5);
  const [my, setMy] = useState(0.5);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMx((e.clientX - r.left) / r.width);
    setMy((e.clientY - r.top) / r.height);
  }, []);
  const rgb = hexRgb(entry.color).join(",");

  const hashMap: Record<number, string> = {
    1: "f0a1b2c", 2: "3d8e2f1", 3: "c5b8e3d", 4: "9a3c7f2", 5: "e1d4b90",
  };
  const branchMap: Record<number, string> = {
    1: "icse-school", 2: "cbse-grade12", 3: "btech-cse", 4: "intern-dev", 5: "dir-creativity",
  };

  const handleClick = () => {
    if (entry.href) window.location.href = entry.href;
  };

  return (
    <div
      className="ec-outer"
      style={{ "--cc": entry.color, "--rgb": rgb, "--mx": mx, "--my": my } as React.CSSProperties}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onMouseMove={onMove}
      onClick={handleClick}
    >
      <div className={`ec-card ${hov ? "hov" : ""}`}>
        {/* Glass layers */}
        <div className="ecl-s" />
        <div className="ecl-sp" style={{ opacity: hov ? 1 : 0 }} />
        <div className="ecl-r" />
        <div className="ecl-n" />
        <div className="ecl-g" style={{ opacity: hov ? 1 : 0 }} />

        {/* Tech hover layers */}
        <div className="ecl-grid" />
        <div className="ecl-scan" style={{ opacity: hov ? 1 : 0 }} />
        <div className="ecl-holographic-ribbon" style={{ opacity: hov ? 1 : 0 }} />
        <div className="ecl-border-line" />

        {/* Hover: corner bracket indicators */}
        {hov && <>
          <div className="ec-corner ec-corner-tl" />
          <div className="ec-corner ec-corner-tr" />
          <div className="ec-corner ec-corner-bl" />
          <div className="ec-corner ec-corner-br" />
        </>}

        {/* Logo slot — top-right */}
        <div className="ec-logo-wrap">
          <div className={`ec-logo-shimmer ${hov ? "active" : ""}`} />
          {entry.logo ? (
            <img
              src={entry.logo}
              alt={entry.org}
              className="ec-logo-img"
              style={{ transform: entry.logoScale ? `scale(${entry.logoScale})` : "none" }}
            />
          ) : (
            <LogoPlaceholder entry={entry} />
          )}
        </div>

        {/* Hover CTA */}
        <div className="ec-hover-cta" style={{ opacity: hov ? 1 : 0 }}>
          <span>view details</span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="ec-body">
          {/* Git-style top row */}
          <div className="ec-toprow">
            <span className="ec-hash">{hashMap[entry.id]}</span>
            <span className="ec-branch">HEAD → {branchMap[entry.id]}</span>
          </div>

          {/* Org — prominent at top */}
          <div className="ec-org-wrap">
            <div className="ec-org-line" />
            <div className="ec-org-inner">
              <span className="ec-org-label">{entry.orgLabel || (entry.kind === "work" ? "company" : "institution")}</span>
              <span className="ec-org-name">{entry.org}</span>
            </div>
          </div>

          {/* Role — smaller, below org */}
          <div className="ec-role-row">
            <span className="ec-kind-badge">{entry.kind === "work" ? "work" : "edu"}</span>
            <h3 className="ec-role">{entry.role}</h3>
          </div>

          {/* Meta pills */}
          <div className="ec-pills">
            <span className="ec-pill ec-pill-dt">📅 {entry.period}</span>
            {entry.duration && (
              <span className="ec-pill ec-pill-dur">⏱ {entry.duration}</span>
            )}
            <span className="ec-pill">📍 {entry.location}</span>
            <span className="ec-pill ec-pill-type">
              {entry.type ?? (entry.kind === "work" ? "Full-time" : "Academic")}
            </span>
          </div>

          {/* Description */}
          <div className="ec-desc-wrap">
            <p className="ec-desc">{entry.desc}</p>
          </div>

          {/* Tags */}
          <div className="ec-tags">
            {entry.tags.map((t) => (
              <span key={t} className="ec-tag">{t}</span>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
}

/* ================================================================
   SEEDED RANDOM
================================================================ */
function seededRand(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

/* ================================================================
   CANVAS
================================================================ */
function TimelineCanvas({ canvasRef, scrollPct, W, H }: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  scrollPct: number; W: number; H: number;
}) {
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  const draw = useCallback((timestamp?: number) => {
    const canvas = canvasRef.current;
    if (!canvas || W === 0 || H === 0) return;
    if (timestamp !== undefined) {
      if (lastTsRef.current !== null) timeRef.current += (timestamp - lastTsRef.current) * 0.001;
      lastTsRef.current = timestamp;
    }
    const t = timeRef.current;
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
      canvas.width = W * dpr; canvas.height = H * dpr;
      canvas.style.width = `${W}px`; canvas.style.height = `${H}px`;
    }
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    const N = ENTRIES.length;
    const R = H;
    const SPREAD_DEG = 60;
    const circleCX = W * 0.54 - R;
    const circleCY = H * 0.50;
    const progress = Math.min(1, scrollPct / 0.8);
    const activeF = progress * (N - 1);
    const degPerEntry = SPREAD_DEG / Math.max(N - 1, 1);

    const spineOffset = R * 0.03;
    const midCX = circleCX + spineOffset / 2;

    const entryAngle = (i: number) => ((i - activeF) * degPerEntry) * Math.PI / 180;
    const entryPos = (i: number) => {
      const a = entryAngle(i);
      return { x: midCX + R * Math.cos(a), y: circleCY + R * Math.sin(a) };
    };

    /* BG RINGS */
    const ringCX = W * 0.5, ringCY = H * 0.5;
    const easedScroll = 1 - Math.pow(1 - Math.min(scrollPct * 1.6, 1), 2.2);
    const baseR = H * 0.04 + easedScroll * (Math.max(W, H) * 0.88 - H * 0.04);
    const RINGS = [
      { scale: 0.18, dotCount: 22, rotSpeed: 0.14, dotBaseR: 1.4, alpha: 0.32 },
      { scale: 0.32, dotCount: 36, rotSpeed: -0.11, dotBaseR: 1.2, alpha: 0.26 },
      { scale: 0.48, dotCount: 52, rotSpeed: 0.08, dotBaseR: 1.0, alpha: 0.21 },
      { scale: 0.64, dotCount: 68, rotSpeed: -0.06, dotBaseR: 0.85, alpha: 0.16 },
      { scale: 0.80, dotCount: 86, rotSpeed: 0.045, dotBaseR: 0.75, alpha: 0.12 },
      { scale: 0.94, dotCount: 104, rotSpeed: -0.03, dotBaseR: 0.65, alpha: 0.09 },
    ];
    const ringFadeIn = Math.min(1, scrollPct * 8);
    RINGS.forEach((ring) => {
      const ringR = baseR * ring.scale;
      if (ringR < 8) return;
      const rotOffset = t * ring.rotSpeed;
      const stepAngle = (Math.PI * 2) / ring.dotCount;
      for (let di = 0; di < ring.dotCount; di++) {
        const angle = di * stepAngle + rotOffset;
        const dx = ringCX + ringR * Math.cos(angle);
        const dy = ringCY + ringR * Math.sin(angle);
        // Elevate size slightly and scale with scroll
        const dotR = (di % 4 === 0 ? ring.dotBaseR * 2.6 : ring.dotBaseR * 1.3) * (1 + scrollPct * 0.6);
        const edgeFade = Math.min(1, (dx + 40) / 80, (W - dx + 40) / 80, (dy + 40) / 80, (H - dy + 40) / 80);
        const alpha = ring.alpha * Math.max(0, edgeFade) * ringFadeIn;
        if (alpha < 0.005) continue;
        ctx.beginPath();
        ctx.arc(dx, dy, Math.max(0.4, dotR), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(160,185,255,${alpha})`;
        ctx.fill();
      }
    });

    /* SPINE DOTS — scroll-driven travel (LEFT spine) */
    const scrollShiftDeg = activeF * degPerEntry;
    for (let s = 0; s < 300; s++) {
      const baseDeg = (s / 300) * 360 - 180;
      const shiftedDeg = baseDeg - scrollShiftDeg;
      const wrappedDeg = ((shiftedDeg + 180) % 360 + 360) % 360 - 180;
      const angleRad = wrappedDeg * Math.PI / 180;
      const px = circleCX + R * Math.cos(angleRad);
      const py = circleCY + R * Math.sin(angleRad);
      const iF = activeF + wrappedDeg / degPerEntry;
      const nearEntryI = Math.round(iF);
      const nearEntry = Math.abs(iF - nearEntryI);
      if (nearEntry < 0.08 && nearEntryI >= 0 && nearEntryI < N) continue;
      const distFromActive = Math.abs(wrappedDeg) / degPerEntry;
      const onArc = Math.abs(wrappedDeg) <= SPREAD_DEG / 2 + 8;
      const sizeBoost = nearEntry < 0.25 ? 2.5 : nearEntry < 0.45 ? 1.6 : 1.0;
      const r = sizeBoost * (onArc ? Math.max(0.4, 1.1 - distFromActive * 0.08) : 0.5);
      const alpha = onArc ? Math.max(0.06, 0.75 - distFromActive * 0.20) : 0.04;
      ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.fill();
    }

    /* SPINE DOTS — MIRRORED (RIGHT spine, counter-rotating) */
    const circleCX2 = circleCX + spineOffset;
    for (let s = 0; s < 300; s++) {
      const baseDeg = (s / 300) * 360 - 180;
      const shiftedDeg2 = baseDeg + scrollShiftDeg; // OPPOSITE direction
      const wrappedDeg2 = ((shiftedDeg2 + 180) % 360 + 360) % 360 - 180;
      const angleRad2 = wrappedDeg2 * Math.PI / 180;
      const px2 = circleCX2 + R * Math.cos(angleRad2);
      const py2 = circleCY + R * Math.sin(angleRad2);
      const iF2 = activeF + wrappedDeg2 / degPerEntry;
      const nearEntryI2 = Math.round(iF2);
      const nearEntry2 = Math.abs(iF2 - nearEntryI2);
      const distFromActive2 = Math.abs(wrappedDeg2) / degPerEntry;
      const onArc2 = Math.abs(wrappedDeg2) <= SPREAD_DEG / 2 + 8;
      const sizeBoost2 = nearEntry2 < 0.25 ? 2.5 : nearEntry2 < 0.45 ? 1.6 : 1.0;
      const r2 = sizeBoost2 * (onArc2 ? Math.max(0.4, 1.1 - distFromActive2 * 0.08) : 0.5);
      const alpha2 = onArc2 ? Math.max(0.06, 0.75 - distFromActive2 * 0.20) : 0.04;
      ctx.beginPath(); ctx.arc(px2, py2, r2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${alpha2})`; ctx.fill();
    }

    /* CLUSTER SCATTER */
    ENTRIES.forEach((_, i) => {
      const { x: ex, y: ey } = entryPos(i);
      if (ex < -60 || ex > W + 60 || ey < -60 || ey > H + 60) return;
      const distFromActive = Math.abs(i - activeF);
      const rand = seededRand(i * 7919 + 42);
      const count = Math.round(Math.max(3, 22 - distFromActive * 7));
      const spreadR = Math.max(14, 48 - distFromActive * 12);
      for (let k = 0; k < count; k++) {
        const angle = rand() * Math.PI * 2;
        const tR = rand();
        const dist = tR < 0.7 ? rand() * spreadR * 0.55 : spreadR * 0.55 + rand() * spreadR * 0.45;
        const sx = ex + Math.cos(angle) * dist;
        const sy = ey + Math.sin(angle) * dist;
        if (sx < -10 || sx > W + 10 || sy < -10 || sy > H + 10) continue;
        const sizeT = rand();
        // Elevate base size and add scroll-driven scaling
        const dotR = (sizeT > 0.92 ? 3.6 + rand() * 2.2 : sizeT > 0.75 ? 1.8 + rand() * 1.2 : 0.7 + rand() * 0.9) * (1 + scrollPct * 0.5);
        const falloff = 1 - dist / (spreadR * 1.4);
        const alpha = Math.min(1, Math.max(0.04, (0.85 - distFromActive * 0.22) * falloff * (sizeT > 0.92 ? 1.1 : 0.85)));
        ctx.beginPath(); ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.fill();
      }
    });

    /* NODES + YEAR LABELS */
    ENTRIES.forEach((entry, i) => {
      const { x: ex, y: ey } = entryPos(i);
      if (ex < -80 || ex > W + 80 || ey < -80 || ey > H + 80) return;
      const distFromActive = Math.abs(i - activeF);
      const isActive = distFromActive < 0.55;
      const col = hexRgb(entry.color);
      const colA = (a: number) => `rgba(${col[0]},${col[1]},${col[2]},${a})`;

      if (isActive) {
        const rg = ctx.createRadialGradient(ex, ey, 0, ex, ey, 38);
        rg.addColorStop(0, colA(0.28)); rg.addColorStop(0.5, colA(0.10)); rg.addColorStop(1, colA(0));
        ctx.save(); ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(ex, ey, 38, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        ctx.save(); ctx.beginPath(); ctx.arc(ex, ey, 17, 0, Math.PI * 2);
        ctx.strokeStyle = colA(0.4); ctx.lineWidth = 1.5; ctx.shadowBlur = 12; ctx.shadowColor = colA(1); ctx.stroke(); ctx.restore();
        ctx.save(); ctx.beginPath(); ctx.arc(ex, ey, 10, 0, Math.PI * 2);
        ctx.fillStyle = entry.color; ctx.shadowBlur = 18; ctx.shadowColor = colA(1); ctx.fill(); ctx.restore();
        ctx.save(); ctx.beginPath(); ctx.arc(ex, ey, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.shadowBlur = 6; ctx.shadowColor = "#fff"; ctx.fill(); ctx.restore();
      } else {
        const r2 = Math.max(4, 8 - distFromActive * 1.8);
        const alpha = Math.max(0.15, 0.85 - distFromActive * 0.28);
        ctx.save(); ctx.beginPath(); ctx.arc(ex, ey, r2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`; ctx.fill(); ctx.restore();
      }

      const yearScale = Math.max(0.42, 1 - distFromActive * 0.25);
      const yearAlpha = Math.max(0.08, 1 - distFromActive * 0.38);
      const yearSize = Math.round((isActive ? 48 : 28) * yearScale);
      const yearX = ex - (isActive ? 32 : 22);
      ctx.save();
      ctx.font = `${isActive ? 800 : 600} ${yearSize}px 'Outfit', sans-serif`;
      ctx.textAlign = "right"; ctx.textBaseline = "middle"; ctx.globalAlpha = yearAlpha;
      ctx.fillStyle = isActive ? entry.color : "rgba(210,225,255,0.75)";
      if (isActive) { ctx.shadowBlur = 20; ctx.shadowColor = colA(0.7); }
      ctx.fillText(entry.year, yearX, ey); ctx.restore();
    });
  }, [scrollPct, W, H, canvasRef]);

  useEffect(() => {
    const loop = (ts: number) => { draw(ts); animRef.current = requestAnimationFrame(loop); };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, [draw]);

  useEffect(() => {
    const resize = () => { lastTsRef.current = null; };
    window.addEventListener("resize", resize);
    setTimeout(() => draw(), 100);
    return () => window.removeEventListener("resize", resize);
  }, [draw]);

  return null;
}

/* ================================================================
   VERTICAL PROGRESS
================================================================ */
function VerticalProgress({ scrollPct, activeI, total, activeColor }: {
  scrollPct: number; activeI: number; total: number; activeColor: string;
}) {
  return (
    <div className="vp-wrap">
      <div className="vp-counter">
        <span className="vp-cur">{String(activeI + 1).padStart(2, "0")}</span>
        <span className="vp-sep">/</span>
        <span className="vp-tot">{String(total).padStart(2, "0")}</span>
      </div>
      <div className="vp-track">
        <div className="vp-fill" style={{
          height: `${scrollPct * 100}%`,
          background: `linear-gradient(180deg, ${activeColor}, #38bdf8)`,
          boxShadow: `0 0 8px ${activeColor}88`,
        }} />
      </div>
      <div className="vp-dots">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="vp-dot" style={{
            background: i === activeI ? activeColor : "rgba(255,255,255,0.18)",
            boxShadow: i === activeI ? `0 0 6px ${activeColor}` : "none",
            transform: i === activeI ? "scale(1.5)" : "scale(1)",
          }} />
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   MAIN
================================================================ */
export default function ExperienceSection() {
  const outerRef = useRef<HTMLElement>(null!);
  const stickyRef = useRef<HTMLDivElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const scrollPct = useScrollPct(outerRef);
  const [dims, setDims] = useState({ w: 0, h: 0 });

  useEffect(() => {
    const m = () => {
      const s = stickyRef.current;
      if (s) setDims({ w: s.offsetWidth, h: s.offsetHeight });
    };
    m();
    window.addEventListener("resize", m);
    return () => window.removeEventListener("resize", m);
  }, []);

  const N = ENTRIES.length;
  const progress = Math.min(1, scrollPct / 0.8);
  const activeI = Math.min(Math.round(progress * (N - 1)), N - 1);
  const activeEntry = ENTRIES[Math.max(0, activeI)];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;700&family=Syne:wght@400;600;700;800&family=Outfit:wght@400;600;700;800&display=swap');

        .tl-outer { position: relative; }
        .tl-sticky {
          position: sticky; top: 0; height: 100vh; width: 100%;
          overflow: hidden; font-family: 'JetBrains Mono', monospace;
          background: #000; border-top: 1px solid rgba(255,255,255,0.05);
          border-radius: 3rem 3rem 0 0; box-shadow: 0 20px 100px rgba(0,0,0,0.9);
        }
        @media(min-width:768px){ .tl-sticky { border-radius: 4rem 4rem 0 0; } }

        .tl-bg {
          position: absolute; inset: 0; z-index: 0;
          background:
            radial-gradient(ellipse 80% 70% at 5% 50%, rgba(10,40,120,0.55) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 25% 20%, rgba(8,30,100,0.4) 0%, transparent 55%),
            radial-gradient(ellipse 70% 60% at 90% 70%, rgba(5,20,80,0.35) 0%, transparent 55%),
            linear-gradient(160deg,#0a1628 0%,#080e1e 35%,#060a18 65%,#040812 100%);
          pointer-events: none;
        }
        .tl-stars {
          position: absolute; inset: 0; pointer-events: none; z-index: 0;
          background-image:
            radial-gradient(1px 1px at 6% 8%, rgba(255,255,255,0.7) 0%,transparent 100%),
            radial-gradient(1px 1px at 14% 44%, rgba(255,255,255,0.5) 0%,transparent 100%),
            radial-gradient(1.5px 1.5px at 22% 72%, rgba(255,255,255,0.65) 0%,transparent 100%),
            radial-gradient(1px 1px at 31% 20%, rgba(255,255,255,0.45) 0%,transparent 100%),
            radial-gradient(1px 1px at 40% 88%, rgba(255,255,255,0.5) 0%,transparent 100%),
            radial-gradient(1px 1px at 49% 35%, rgba(255,255,255,0.4) 0%,transparent 100%),
            radial-gradient(1.5px 1.5px at 57% 60%, rgba(255,255,255,0.6) 0%,transparent 100%),
            radial-gradient(1px 1px at 66% 14%, rgba(255,255,255,0.5) 0%,transparent 100%),
            radial-gradient(1px 1px at 74% 80%, rgba(255,255,255,0.4) 0%,transparent 100%),
            radial-gradient(1px 1px at 82% 40%, rgba(255,255,255,0.55) 0%,transparent 100%),
            radial-gradient(1px 1px at 90% 65%, rgba(255,255,255,0.45) 0%,transparent 100%),
            radial-gradient(2px 2px at 95% 22%, rgba(255,255,255,0.6) 0%,transparent 100%),
            radial-gradient(1px 1px at 10% 95%, rgba(255,255,255,0.35) 0%,transparent 100%),
            radial-gradient(1px 1px at 45% 55%, rgba(255,255,255,0.3) 0%,transparent 100%),
            radial-gradient(1px 1px at 78% 10%, rgba(255,255,255,0.5) 0%,transparent 100%);
        }
        .tl-canvas { position:absolute;top:0;left:0;pointer-events:none;z-index:2;display:block; }

        /* ══ LEFT PANEL ══ */
        .tl-left {
          position: absolute; top: 0; left: 0; bottom: 0; width: 36%;
          display: flex; flex-direction: column; justify-content: center;
          padding: 0 0 0 48px; z-index: 8;
        }
        .tl-heading { margin-bottom: 24px; }
        .tl-eyebrow {
          font-size: 10px; letter-spacing: 5px; text-transform: uppercase;
          color: rgba(56, 189, 248, 0.5); margin-bottom: 10px; display: block;
          position: relative;
        }
        .tl-h1 {
          font-family: var(--font-malinton), 'Syne', sans-serif; font-size: clamp(26px, 3.2vw, 42px);
          font-weight: 800; color: #ffffff; letter-spacing: -1.5px;
          line-height: 1.05; margin: 0 0 10px; position: relative;
        }
        .tl-h1 .tc  { color: #38bdf8; text-shadow: 0 0 20px rgba(56, 189, 248, 0.4); }
        .tl-h1 .tc2 { color: #60a5fa; text-shadow: 0 0 20px rgba(96, 165, 250, 0.3); }
        .tl-version {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px; color: rgba(100,180,255,0.45);
          background: rgba(56,189,248,0.08);
          border: 1px solid rgba(56,189,248,0.2);
          border-radius: 999px; padding: 5px 14px;
          letter-spacing: 0.3px; width: fit-content;
          position: relative;
          box-shadow: 0 0 12px rgba(56, 189, 248, 0.08);
        }
        .tl-version .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #38bdf8; opacity: 0.7;
          animation: pulse 2s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(56, 189, 248, 0.5);
        }
        @keyframes pulse {
          0%,100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        /* ══ CARD — FIXED SIZE ══ */
        .ec-outer {
          width: 380px; height: 440px; flex-shrink: 0;
          cursor: pointer;
        }
        .ec-card {
          position: relative; border-radius: 22px; overflow: hidden;
          width: 100%; height: 100%;
          background: linear-gradient(145deg, rgba(200,225,255,0.06) 0%, rgba(150,200,255,0.02) 50%, rgba(100,180,255,0.04) 100%);
          border: 1px solid rgba(180,220,255,0.14);
          backdrop-filter: blur(40px) saturate(180%) brightness(1.08);
          -webkit-backdrop-filter: blur(40px) saturate(180%) brightness(1.08);
          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.5),
            0 8px 24px rgba(0, 20, 60, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(255, 255, 255, 0.04),
            inset 1px 0 0 rgba(255, 255, 255, 0.06),
            inset -1px 0 0 rgba(255, 255, 255, 0.06);
          transition: border-color .4s, box-shadow .45s, transform .4s cubic-bezier(0.2, 0.8, 0.2, 1), background .4s;
          transform-style: preserve-3d;
        }
        .ec-card.hov {
          background: linear-gradient(145deg, rgba(200,225,255,0.12) 0%, rgba(150,200,255,0.06) 50%, rgba(100,180,255,0.08) 100%);
          border-color: rgba(var(--rgb), 0.4);
          box-shadow:
            0 40px 80px rgba(0, 0, 0, 0.6),
            0 10px 30px rgba(0, 20, 60, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.35),
            0 0 0 1px rgba(var(--rgb), 0.2),
            0 0 40px rgba(var(--rgb), 0.1);
          transform: scale(1.015) translateY(-2px)
            perspective(1000px) rotateX(calc((var(--my) - 0.5) * -3deg)) rotateY(calc((var(--mx) - 0.5) * 3deg));
        }

        /* Scanline sweep — cyan tint, HUD-style */
        .ecl-scan {
          position: absolute; inset: 0; pointer-events: none; z-index: 4;
          background: linear-gradient(
            180deg,
            transparent 0%,
            rgba(56, 189, 248, 0.03) 44%,
            rgba(56, 189, 248, 0.18) 50%,
            rgba(56, 189, 248, 0.03) 56%,
            transparent 100%
          );
          background-size: 100% 300%;
          transition: opacity .35s;
          animation: scan 2.2s ease-in-out infinite;
        }
        @keyframes scan {
          0%   { background-position-y: -100%; }
          100% { background-position-y: 200%; }
        }

        /* Data grid overlay — appears on hover */
        .ecl-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 3;
          background-image:
            linear-gradient(rgba(56, 189, 248, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.04) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0; transition: opacity .5s;
        }
        .ec-card.hov .ecl-grid { opacity: 1; }

        /* Holographic ribbon — subtle sharp sweep */
        .ecl-holographic-ribbon {
          position: absolute; inset: 0; pointer-events: none; z-index: 5;
          background: linear-gradient(
            115deg,
            transparent 0%,
            transparent 45%,
            rgba(255, 255, 255, 0.1) 48%,
            rgba(56, 189, 248, 0.3) 50%,
            rgba(255, 255, 255, 0.1) 52%,
            transparent 55%,
            transparent 100%
          );
          background-size: 200% 100%;
          transition: opacity .4s;
          animation: hovRibbon 3s infinite;
        }
        @keyframes hovRibbon {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        /* Border refine */
        .ecl-border-line {
          position: absolute; inset: 0; border-radius: inherit;
          border: 1px solid rgba(var(--rgb), 0.3); opacity: 0; transition: opacity .4s;
          pointer-events: none; z-index: 6;
        }
        .ec-card.hov .ecl-border-line { opacity: 1; }
        .ec-card.hov .ecl-border-scan { opacity: 1; }
        @keyframes borderScan {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }

        /* Status indicator — bottom left */
        .ec-status {
          position: absolute; bottom: 16px; left: 18px; z-index: 7;
          display: flex; align-items: center; gap: 6px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 8.5px; letter-spacing: 2px; text-transform: uppercase;
          color: rgba(56, 189, 248, 0.7); pointer-events: none;
          opacity: 0; transition: opacity .4s .15s;
        }
        .ec-card.hov .ec-status { opacity: 1; }
        .ec-status-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: #38bdf8;
          animation: statusPulse 1.5s ease-in-out infinite;
          box-shadow: 0 0 6px rgba(56, 189, 248, 0.6);
        }
        @keyframes statusPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        /* Corner brackets — colored glow matching entry */
        .ec-corner {
          position: absolute; width: 16px; height: 16px;
          border-color: var(--cc); border-style: solid;
          pointer-events: none; z-index: 6;
          animation: cornerIn .22s ease forwards;
          filter: drop-shadow(0 0 6px var(--cc));
        }
        @keyframes cornerIn {
          from { opacity: 0; transform: scale(0.5); }
          to   { opacity: 1; transform: scale(1); }
        }
        .ec-corner-tl { top: 10px; left: 10px; border-width: 1.5px 0 0 1.5px; border-radius: 3px 0 0 0; }
        .ec-corner-tr { top: 10px; right: 10px; border-width: 1.5px 1.5px 0 0; border-radius: 0 3px 0 0; }
        .ec-corner-bl { bottom: 10px; left: 10px; border-width: 0 0 1.5px 1.5px; border-radius: 0 0 0 3px; }
        .ec-corner-br { bottom: 10px; right: 10px; border-width: 0 1.5px 1.5px 0; border-radius: 0 0 3px 0; }

        /* Hover CTA — bottom right */
        .ec-hover-cta {
          position: absolute; bottom: 16px; right: 16px; z-index: 7;
          display: flex; align-items: center; gap: 5px;
          font-family: 'JetBrains Mono', monospace;
          font-size: 9.5px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--cc); pointer-events: none;
          transition: opacity .3s;
        }

        /* Glass layer styles */
        .ecl-s {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(145deg, rgba(180,220,255,0.10) 0%, rgba(255,255,255,0.03) 40%, transparent 70%),
                      radial-gradient(circle at 25% 15%, rgba(200,230,255,0.14) 0%, transparent 55%),
                      radial-gradient(circle at 75% 85%, rgba(100,180,255,0.06) 0%, transparent 50%);
          opacity: 0.85;
        }
        .ecl-sp { position:absolute;width:280px;height:280px;border-radius:50%;pointer-events:none;z-index:1;transition:opacity .25s;background:radial-gradient(circle,rgba(180,220,255,0.12) 0%,rgba(255,255,255,0.04) 40%,transparent 65%);left:calc(var(--mx,0.5)*100% - 140px);top:calc(var(--my,0.5)*100% - 140px);filter:blur(12px); }
        .ecl-r { position:absolute;top:0;left:5%;right:5%;height:1px;background:linear-gradient(90deg,transparent 0%,rgba(180,220,255,0.3) 20%,rgba(255,255,255,0.6) 45%,rgba(255,255,255,0.7) 55%,rgba(180,220,255,0.3) 80%,transparent 100%);pointer-events:none;z-index:2; }
        .ecl-n {
          position: absolute; inset: 0; border-radius: inherit;
          opacity: 0.03; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
        }
        .ecl-g { position:absolute;bottom:-1px;left:5%;right:5%;height:90px;background:radial-gradient(ellipse,rgba(140, 200, 255, 0.10) 0%,rgba(255,255,255,0.04) 40%,transparent 70%);pointer-events:none;transition:opacity .4s; }

        /* ── LOGO SLOT ── */
        .ec-logo-wrap {
          position: absolute; top: 16px; right: 16px;
          z-index: 5; pointer-events: none;
          width: 56px; height: 56px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(8px);
          box-shadow: 
            0 6px 16px rgba(0,0,0,0.25),
            inset 0 1px 0 rgba(255,255,255,0.1);
          overflow: hidden;
        }
        .ec-logo-shimmer {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, 0.3) 50%,
            rgba(255, 255, 255, 0) 60%,
            transparent 100%
          );
          transform: translateX(-150%) skewX(-25deg);
          pointer-events: none;
        }
        .ec-logo-shimmer.active {
          animation: logoShimmer 1.8s cubic-bezier(0.19, 1, 0.22, 1) infinite;
        }
        @keyframes logoShimmer {
          0%   { transform: translateX(-150%) skewX(-25deg); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(150%) skewX(-25deg); opacity: 0; }
        }
        .ec-logo-img {
          width: 34px; height: 34px;
          object-fit: contain;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
          position: relative; z-index: 1;
        }
        .ec-logo-ph {
          width: 34px; height: 34px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-family: 'Syne', sans-serif; font-size: 11px; font-weight: 800;
          letter-spacing: 0.5px; line-height: 1;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(var(--rgb), 0.15) 100%);
          border: 1px solid rgba(var(--rgb), 0.35);
          backdrop-filter: blur(8px);
          box-shadow:
            0 4px 15px rgba(0, 0, 0, 0.3),
            inset 1.5px 1.5px 0 rgba(255, 255, 255, 0.3),
            inset -1.5px -1.5px 0 rgba(0, 0, 0, 0.2),
            0 0 20px rgba(var(--rgb), 0.2);
          color: #fff;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
          transform: translateZ(5px);
        }

        /* ── CARD BODY ── */
        .ec-body {
          position: relative; z-index: 3;
          padding: 22px 70px 22px 22px;
          height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column;
          gap: 0; overflow: hidden;
        }

        /* Top row */
        .ec-toprow { display:flex;align-items:center;gap:7px;margin-bottom:18px;flex-wrap:wrap;flex-shrink:0; }
        .ec-hash {
          font-size: 11px; padding: 3px 10px; border-radius: 6px;
          font-family: 'JetBrains Mono', monospace;
          background: linear-gradient(135deg, rgba(255, 107, 43, 0.15) 0%, rgba(255, 107, 43, 0.08) 100%);
          border: 1px solid rgba(255, 107, 43, 0.35);
          color: #ff8450; letter-spacing: 0.5px;
          backdrop-filter: blur(4px);
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.2),
            inset 1px 1px 0 rgba(255, 255, 255, 0.15);
          transform: translateZ(2px);
        }
        .ec-branch {
          font-size: 10px; padding: 3px 12px; border-radius: 999px;
          font-family: 'JetBrains Mono', monospace;
          background: linear-gradient(135deg, rgba(var(--rgb), 0.12) 0%, rgba(var(--rgb), 0.06) 100%);
          border: 1px solid rgba(var(--rgb), 0.28);
          color: var(--cc);
          backdrop-filter: blur(4px);
          box-shadow:
            0 2px 8px rgba(0, 0, 0, 0.2),
            inset 1px 1px 0 rgba(255, 255, 255, 0.1);
          max-width: 155px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
          transform: translateZ(2px);
        }

        /* Role row — single line with kind badge */
        .ec-role-row {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 16px; flex-shrink: 0; flex-wrap: nowrap;
          overflow: hidden;
        }
        .ec-kind-badge {
          font-family: 'JetBrains Mono', monospace;
          font-size: 8.5px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; padding: 3.5px 10px; border-radius: 5px;
          background: linear-gradient(145deg, rgba(var(--rgb), 0.2) 0%, rgba(var(--rgb), 0.1) 100%);
          border: 1px solid rgba(var(--rgb), 0.4);
          color: var(--cc); flex-shrink: 0; line-height: 1;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15), inset 1px 1px 0 rgba(255, 255, 255, 0.1);
          transform: translateZ(3px);
        }
        .ec-role {
          font-family:'JetBrains Mono',monospace; font-size:11px;
          font-weight:500; color:rgba(255,255,255,0.95); margin:0; line-height:1.2;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          flex:1; min-width:0; letter-spacing:0.1px;
        }

        /* Org connector */
        .ec-org-wrap {
          display: flex; align-items: stretch;
          gap: 0; margin: 0 0 14px; flex-shrink: 0;
        }
        .ec-org-line {
          width: 1px; margin: 2px 10px 2px 4px; flex-shrink: 0;
          background: linear-gradient(180deg, var(--cc) 0%, rgba(var(--rgb),0.12) 100%);
          opacity: 0.6; border-radius: 1px;
        }
        .ec-org-inner { display:flex;flex-direction:column;justify-content:center;gap:2px; }
        .ec-org-label {
          font-family:'JetBrains Mono',monospace;
          font-size:9px;font-weight:400;letter-spacing:3px;text-transform:uppercase;
          color:rgba(var(--rgb),0.55);line-height:1;
        }
        .ec-org-name {
          font-family: var(--font-malinton), 'Syne', sans-serif;
          font-size: clamp(17px, 2.1vw, 24px); font-weight: 500;
          color: #e8f4ff; line-height: 1.15; letter-spacing: 0.1px;
          margin-top: 4px; white-space: pre-line;
        }

        /* Pills */
        .ec-pills { display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;flex-shrink:0; }
        .ec-pill {
          font-size: 9.5px; padding: 4px 11px; border-radius: 8px;
          font-family: 'JetBrains Mono', monospace;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.12);
          color: rgba(200, 220, 255, 0.6);
          backdrop-filter: blur(4px);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15), inset 1px 1px 0 rgba(255, 255, 255, 0.08);
          transform: translateZ(1px);
        }
        .ec-pill-dur {
          border-color: rgba(var(--rgb), 0.35);
          color: var(--cc);
          background: rgba(var(--rgb), 0.08);
          box-shadow: 0 3px 12px rgba(var(--rgb), 0.12), inset 1px 1px 0 rgba(255, 255, 255, 0.1);
        }
        .ec-pill-type {
          border-color: rgba(56, 189, 248, 0.3);
          color: rgba(130, 200, 255, 0.85);
          background: rgba(56, 189, 248, 0.06);
          box-shadow: 0 3px 12px rgba(56, 189, 248, 0.10), inset 1px 1px 0 rgba(255, 255, 255, 0.1);
        }

        /* Desc */
        .ec-desc-wrap { padding-left:14px;border-left:2px solid rgba(var(--rgb),0.3);margin-bottom:16px;flex-shrink:0; }
        .ec-desc {
          font-size:11.5px;line-height:1.72;color:rgba(180,215,255,0.48);margin:0;
          display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;
        }

        /* Tags */
        .ec-tags { display:flex;flex-wrap:wrap;gap:8px;flex-shrink:0; }
        .ec-tag {
          font-size: 9.5px; padding: 5px 12px; border-radius: 6px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: rgba(255, 255, 255, 0.03);
          color: rgba(190, 215, 255, 0.5);
          backdrop-filter: blur(6px);
          box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15), inset 1px 1px 0 rgba(255, 255, 255, 0.05);
          transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
          cursor: default;
          transform: translateZ(2px);
        }
        .ec-tag:hover {
          border-color: rgba(var(--rgb), 0.5);
          color: var(--cc);
          background: rgba(var(--rgb), 0.08);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3), 0 0 15px rgba(var(--rgb), 0.2);
          transform: translateZ(8px) translateY(-2px) scale(1.05);
        }

        /* Bottom diff */
        .ec-bottom { margin-top:auto;padding-top:14px;flex-shrink:0; }
        .ec-stat { display:flex;gap:10px;flex-wrap:wrap;font-size:10px;margin-bottom:5px;font-family:'JetBrains Mono',monospace; }
        .ec-files { color:rgba(200,220,255,0.28); }
        .ec-adds  { color:#4ade80; }
        .ec-dels  { color:#f87171; }
        .ec-diffbar { display:flex;height:4px;border-radius:3px;overflow:hidden;gap:2px; }

        /* ══ GHOST YEAR ══ */
        .tl-ghost {
          position:absolute; left:39%; top:57%; transform:translate(-50%, -50%);
          font-family: var(--font-malinton), 'Syne', sans-serif; font-size:clamp(100px,14vw,180px);
          font-weight:800; color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.04);
          pointer-events:none; z-index:1; letter-spacing:-6px; user-select:none; transition:opacity .5s;
        }

        /* ══ VERTICAL PROGRESS ══ */
        .vp-wrap {
          position:absolute; right:28px; top:50%; transform:translateY(-50%);
          display:flex; flex-direction:column; align-items:center; gap:14px; z-index:10;
        }
        .vp-counter { display:flex;flex-direction:column;align-items:center;gap:2px;font-family:'JetBrains Mono',monospace; }
        .vp-cur { font-size:13px;font-weight:700;color:rgba(220,235,255,0.75);letter-spacing:1px;line-height:1; }
        .vp-sep { font-size:9px;color:rgba(180,200,255,0.25);line-height:1; }
        .vp-tot { font-size:11px;font-weight:400;color:rgba(180,200,255,0.28);letter-spacing:1px;line-height:1; }
        .vp-track { width:2px;height:100px;background:rgba(255,255,255,0.07);border-radius:1px;overflow:hidden;position:relative; }
        .vp-fill { width:100%;position:absolute;top:0;left:0;border-radius:1px;transition:height .08s linear; }
        .vp-dots { display:flex;flex-direction:column;align-items:center;gap:8px; }
        .vp-dot { width:5px;height:5px;border-radius:50%;transition:transform .25s,background .25s,box-shadow .25s; }

        @media(max-width:700px){
          .tl-left { width:90%;padding:0 20px; }
          .ec-outer { width:100%;max-width:360px; }
          .vp-wrap { display:none; }
        }
      `}</style>

      <section className="tl-outer" ref={outerRef} style={{ height: `${(N + 2.5) * 100}vh` }}>
        <div className="tl-sticky" ref={stickyRef}>
          <div className="tl-bg" />
          <div className="tl-stars" />
          <div className="tl-ghost">{activeEntry.year}</div>

          <canvas ref={canvasRef} className="tl-canvas" style={{ width: dims.w, height: dims.h }} />
          <TimelineCanvas canvasRef={canvasRef} scrollPct={scrollPct} W={dims.w} H={dims.h} />

          <div className="tl-left">
            <div className="tl-heading">
              <span className="tl-eyebrow">// commit history</span>
              <h2 className="tl-h1">
                <span className="tc">Build</span> Log<br />
                &amp; <span className="tc2">Milestones</span>
              </h2>
              <div className="tl-version">
                <span className="dot" />
                v{N}.0.0 &nbsp;·&nbsp; {ENTRIES[0].year} — {ENTRIES[N - 1].year}
              </div>
            </div>
            <EntryCard key={activeEntry.id} entry={activeEntry} />
          </div>

          <VerticalProgress
            scrollPct={progress}
            activeI={activeI}
            total={N}
            activeColor={activeEntry.color}
          />
        </div>
      </section>
    </>
  );
}