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
  desc: string;
  tags: string[];
  color: string;
  logo?: string;
  href?: string;
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
    color: "#3b82f6", // blue
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
    color: "#ec4899", // pink
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
    color: "#eab308", // yellow
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
    desc: "On-site internship building production features for real-world software systems. Gained hands-on exposure to professional engineering workflows and collaborative development.",
    tags: ["Software Development", "On-site", "Bengaluru"],
    color: "#a855f7", // purple
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
    desc: "Led the creative direction for one of VIT's most active student organizations. Drove design, branding, and event experiences for entrepreneurship initiatives across campus.",
    tags: ["Leadership", "Branding", "Design", "Event Management"],
    color: "#f97316", // orange
    logo: "/icons/ecell vit.svg",
    href: "/experience/ecell-vit",
    logoScale: 1.2,
  },
  {
    id: 6,
    kind: "work",
    year: "2026",
    role: "AI Solutions Intern",
    org: "Avaamo.ai",
    period: "May 2026 — Jul 2026",
    location: "Bengaluru, India",
    duration: "2m",
    type: "Internship",
    desc: "Started at Avaamo as an AI Solutions Intern in the Pre-Sales Strategic Partnerships BU. Built early agentic AI prototypes and multi-agent voice/chat co-pilots for enterprise clients across pharma and other verticals.",
    tags: ["Agentic AI", "LLM Orchestration", "Pre-Sales", "Voice AI"],
    color: "#22c55e", // green
    logo: "/icons/avaamo_logo.svg",
    href: "/experience/avaamo",
    logoScale: 1.4,
  },
  {
    id: 7,
    kind: "work",
    year: "2026",
    role: "AI Solutions Engineer",
    org: "Avaamo.ai",
    period: "Jul 2026 — Present",
    location: "Bengaluru, India",
    duration: "ongoing",
    type: "Full-time",
    desc: "Building agentic AI solutions in Pre-Sales at the Strategic Partnerships BU. Architecting multi-agent systems and intelligent voice/chat co-pilots for enterprise clients across pharma and other verticals.",
    tags: ["Agentic AI", "LLM Orchestration", "Pre-Sales", "Strategic Partnerships", "Voice AI"],
    color: "#818cf8",
    logo: "/icons/avaamo_logo.svg",
    href: "/experience/avaamo",
    logoScale: 1.4,
  },
];

/* ================================================================
   YEAR CLUSTER HELPERS
================================================================ */
function buildYearClusters(entries: Entry[]) {
  const map: Record<string, number[]> = {};
  entries.forEach((e, i) => {
    if (!map[e.year]) map[e.year] = [];
    map[e.year].push(i);
  });
  return map;
}

// Returns the "canonical" display index for each year cluster — the midpoint index
// used for placing the single spine node on the canvas.
function getClusterCanonicalIndex(year: string, clusters: Record<string, number[]>): number {
  const idxs = clusters[year];
  // Use the midpoint so the node sits between all members
  return (idxs[0] + idxs[idxs.length - 1]) / 2;
}

function hexRgb(hex: string): [number, number, number] {
  return [parseInt(hex.slice(1, 3), 16), parseInt(hex.slice(3, 5), 16), parseInt(hex.slice(5, 7), 16)];
}

function renderOrgName(name: string) {
  const match = name.match(/^(.*)(\.ai)$/i);
  if (!match) return name;
  const [, base, suffix] = match;
  return (
    <>
      {base}
      <span className="ec-org-ai">{suffix}</span>
    </>
  );
}

/* ================================================================
   SCROLL HOOK
================================================================ */
function useScrollPct(ref: React.RefObject<HTMLElement>) {
  const [p, setP] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const { top, height } = ref.current.getBoundingClientRect();
      const vh = window.innerHeight;
      const scrolled = -top;
      const revealZone = vh;
      const activeScroll = Math.max(0, scrolled - revealZone);
      const activeTotal = height - vh - revealZone;
      const newTarget = activeTotal > 0 ? Math.max(0, Math.min(1, activeScroll / activeTotal)) : 0;
      
      if (newTarget !== targetRef.current) {
        targetRef.current = newTarget;
        if (!rafRef.current) {
          rafRef.current = requestAnimationFrame(tick);
        }
      }
    };

    const tick = () => {
      const cur = currentRef.current;
      const tgt = targetRef.current;
      const diff = tgt - cur;
      if (Math.abs(diff) < 0.0003) {
        currentRef.current = tgt;
        setP(currentRef.current);
        rafRef.current = 0;
        return; // stop ticking
      } else {
        currentRef.current = cur + diff * 0.25;
        setP(currentRef.current);
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    let io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        window.addEventListener("scroll", measure, { passive: true });
        window.addEventListener("resize", measure);
        measure();
      } else {
        window.removeEventListener("scroll", measure);
        window.removeEventListener("resize", measure);
      }
    }, { rootMargin: "100% 0px 100% 0px" });

    if (ref.current) {
      io.observe(ref.current);
    }

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", measure);
      window.removeEventListener("resize", measure);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [ref]);
  return p;
}

/* ================================================================
   LOGO PLACEHOLDER
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
   ENTRY CARD — cleaned up (no diffstat, no branch pill)
================================================================ */
function EntryCard({
  entry,
  transitionKey,
}: {
  entry: Entry;
  transitionKey: number | string;
}) {
  const [hov, setHov] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const moveRaf = useRef<number | null>(null);
  const onMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = outerRef.current;
    if (!el) return;
    const clientX = e.clientX;
    const clientY = e.clientY;
    if (moveRaf.current !== null) return;
    moveRaf.current = requestAnimationFrame(() => {
      moveRaf.current = null;
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${(clientX - r.left) / r.width}`);
      el.style.setProperty("--my", `${(clientY - r.top) / r.height}`);
    });
  }, []);
  useEffect(() => () => {
    if (moveRaf.current !== null) cancelAnimationFrame(moveRaf.current);
  }, []);
  const rgb = hexRgb(entry.color).join(",");

  const hashMap: Record<number, string> = {
    1: "f0a1b2c", 2: "3d8e2f1", 3: "c5b8e3d",
    4: "9a3c7f2", 5: "e1d4b90", 6: "a7f3d08", 7: "b2e9c14",
  };

  const handleClick = () => {
    if (entry.href) window.location.href = entry.href;
  };

  return (
    <div className="ec-stack">
      <div
        key={transitionKey}
        ref={outerRef}
        className="ec-outer ec-enter"
        style={{ "--cc": entry.color, "--rgb": rgb, "--mx": 0.5, "--my": 0.5 } as React.CSSProperties}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        onMouseMove={onMove}
        onClick={handleClick}
      >
        <div className={`ec-card ${hov ? "hov" : ""}`}>
          {/* Glass layers */}
          <div className="ecl-s" />
          <div className="ecl-r" />
          <div className="ecl-n" />
          <div className="ecl-g" style={{ opacity: hov ? 1 : 0 }} />

          {/* Tech hover layers */}
          <div className="ecl-grid" />
          <div className="ecl-scan" style={{ opacity: hov ? 1 : 0 }} />
          <div className="ecl-spotlight" />
          <div className="ecl-border-line" />
          <div className="ecl-edge" />

          {/* Corner brackets */}
          <div className="ec-corner ec-corner-tl" style={{ opacity: hov ? 1 : 0 }} />
          <div className="ec-corner ec-corner-tr" style={{ opacity: hov ? 1 : 0 }} />
          <div className="ec-corner ec-corner-bl" style={{ opacity: hov ? 1 : 0 }} />
          <div className="ec-corner ec-corner-br" style={{ opacity: hov ? 1 : 0 }} />

          {/* Logo slot */}
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
              <path
                d="M2 10L10 2M10 2H4M10 2V8"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="ec-body">
            {/* Commit hash only — no branch pill, no diffstat */}
            <div className="ec-toprow">
              <span className="ec-hash">{hashMap[entry.id]}</span>
            </div>

            {/* Org */}
            <div className="ec-org-wrap">
              <div className="ec-org-line" />
              <div className="ec-org-inner">
                <span className="ec-org-label">
                  {entry.orgLabel || (entry.kind === "work" ? "company" : "institution")}
                </span>
                <span className="ec-org-name">{renderOrgName(entry.org)}</span>
              </div>
            </div>

            {/* Role row */}
            <div className="ec-role-row">
              <span className="ec-kind-badge">{entry.kind === "work" ? "work" : "edu"}</span>
              <h3 className="ec-role">{entry.role}</h3>
            </div>

            {/* Meta pills */}
            <div className="ec-pills">
              <span className="ec-pill ec-pill-dt">📅 {entry.period}</span>
              {entry.duration && <span className="ec-pill ec-pill-dur">⏱ {entry.duration}</span>}
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
              {entry.tags.map((t, idx) => (
                <span key={t} className="ec-tag" style={{ "--ti": idx } as React.CSSProperties}>
                  {t}
                </span>
              ))}
            </div>
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
   Key change: year clusters render as ONE node at the cluster's
   canonical (midpoint) position. The pip track slides L→R as
   activeF moves through the cluster's index range.
================================================================ */
function TimelineCanvas({
  canvasRef,
  scrollPct,
  W,
  H,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  scrollPct: number;
  W: number;
  H: number;
}) {
  const animRef = useRef<number>(0);
  const timeRef = useRef(0);
  const lastTsRef = useRef<number | null>(null);

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { setIsVisible(entry.isIntersecting); },
      { threshold: 0.01 }
    );
    if (canvasRef.current && canvasRef.current.parentElement) {
      observer.observe(canvasRef.current.parentElement);
    }
    return () => observer.disconnect();
  }, [canvasRef]);

  const draw = useCallback(
    (timestamp?: number) => {
      const canvas = canvasRef.current;
      if (!canvas || W === 0 || H === 0 || !isVisible) return;
      if (timestamp !== undefined) {
        if (lastTsRef.current !== null) timeRef.current += (timestamp - lastTsRef.current) * 0.001;
        lastTsRef.current = timestamp;
      }
      const t = timeRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
        canvas.width = W * dpr;
        canvas.height = H * dpr;
        canvas.style.width = `${W}px`;
        canvas.style.height = `${H}px`;
      }
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);

      // Build clusters and a de-duplicated list of "spine points" —
      // one per distinct year, positioned at the cluster's midpoint index.
      const clusters = buildYearClusters(ENTRIES);
      const uniqueYears = Array.from(new Set(ENTRIES.map((e) => e.year)));

      // Map each unique year → canonical spine index (midpoint of cluster)
      const yearCanonical: Record<string, number> = {};
      uniqueYears.forEach((yr) => {
        yearCanonical[yr] = getClusterCanonicalIndex(yr, clusters);
      });

      // The number of "spine slots" equals number of unique years
      const N_SPINE = uniqueYears.length; // 5 distinct years

      const R = H;
      const SPREAD_DEG = 60;
      const circleCX = W * 0.54 - R;
      const circleCY = H * 0.54;
      const progress = Math.min(1, scrollPct / 0.8);
      const rawActiveF = progress * (ENTRIES.length - 1); // still 0..5 over full scroll

      // Apply quadratic ease-out to the fractional part so canvas transitions (spine, pips, color)
      // happen earlier on scroll, matching the snappier card transitions.
      const flRaw = Math.floor(rawActiveF);
      const frRaw = rawActiveF - flRaw;
      const easedFr = 1 - Math.pow(1 - frRaw, 2);
      const activeF = flRaw + easedFr;

      // Build a continuous entry→spine mapping. By mapping all entries in a
      // cluster to the exact same spine slot index, the canvas will stay
      // perfectly stationary when scrolling between entries of the same year.
      const entrySpinePos: number[] = ENTRIES.map((entry) => {
        return uniqueYears.indexOf(entry.year);
      });
      const flAF = Math.floor(Math.max(0, Math.min(ENTRIES.length - 1, activeF)));
      const clAF = Math.min(flAF + 1, ENTRIES.length - 1);
      const frAF = activeF - flAF;
      const spineActiveF = entrySpinePos[flAF] + (entrySpinePos[clAF] - entrySpinePos[flAF]) * frAF;

      const degPerSpine = SPREAD_DEG / Math.max(N_SPINE - 1, 1);
      const spineOffset = R * 0.03;
      const midCX = circleCX + spineOffset / 2;

      const spineAngle = (si: number) => ((si - spineActiveF) * degPerSpine * Math.PI) / 180;
      const spinePos = (si: number) => {
        const a = spineAngle(si);
        return { x: midCX + R * Math.cos(a), y: circleCY + R * Math.sin(a) };
      };

      /* BG RINGS */
      const ringCX = W * 0.5, ringCY = H * 0.5;
      const easedScroll = 1 - Math.pow(1 - Math.min(scrollPct * 1.6, 1), 2.2);
      const baseR = H * 0.04 + easedScroll * (Math.max(W, H) * 0.88 - H * 0.04);
      const RINGS = [
        { scale: 0.18, dotCount: 22, rotSpeed: 0.14, dotBaseR: 1.5, alpha: 0.42 },
        { scale: 0.32, dotCount: 36, rotSpeed: -0.11, dotBaseR: 1.3, alpha: 0.35 },
        { scale: 0.48, dotCount: 52, rotSpeed: 0.08, dotBaseR: 1.1, alpha: 0.28 },
        { scale: 0.64, dotCount: 68, rotSpeed: -0.06, dotBaseR: 0.95, alpha: 0.22 },
        { scale: 0.8, dotCount: 86, rotSpeed: 0.045, dotBaseR: 0.8, alpha: 0.18 },
        { scale: 0.94, dotCount: 104, rotSpeed: -0.03, dotBaseR: 0.7, alpha: 0.14 },
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
          const dotR =
            (di % 4 === 0 ? ring.dotBaseR * 2.6 : ring.dotBaseR * 1.3) * (1 + scrollPct * 0.6);
          const edgeFade = Math.min(1, (dx + 40) / 80, (W - dx + 40) / 80, (dy + 40) / 80, (H - dy + 40) / 80);
          const alpha = ring.alpha * Math.max(0, edgeFade) * ringFadeIn;
          if (alpha < 0.005) continue;
          ctx.beginPath();
          ctx.arc(dx, dy, Math.max(0.4, dotR), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }
      });

      /* SPINE DOTS — travel using spine slots */
      const scrollShiftDeg = spineActiveF * degPerSpine;
      for (let s = 0; s < 150; s++) {
        const baseDeg = (s / 150) * 360 - 180;
        const shiftedDeg = baseDeg - scrollShiftDeg;
        const wrappedDeg = ((shiftedDeg + 180) % 360 + 360) % 360 - 180;
        const angleRad = (wrappedDeg * Math.PI) / 180;
        const px = circleCX + R * Math.cos(angleRad);
        const py = circleCY + R * Math.sin(angleRad);
        // Skip dot if it lands right on a spine node
        const iF = spineActiveF + wrappedDeg / degPerSpine;
        const nearEntryI = Math.round(iF);
        const nearEntry = Math.abs(iF - nearEntryI);
        if (nearEntry < 0.08 && nearEntryI >= 0 && nearEntryI < N_SPINE) continue;
        const distFromActive = Math.abs(wrappedDeg) / degPerSpine;
        const onArc = Math.abs(wrappedDeg) <= SPREAD_DEG / 2 + 8;
        const sizeBoost = nearEntry < 0.25 ? 2.5 : nearEntry < 0.45 ? 1.6 : 1.0;
        const r = sizeBoost * (onArc ? Math.max(0.4, 1.1 - distFromActive * 0.08) : 0.5);
        const alpha = onArc ? Math.max(0.06, 0.75 - distFromActive * 0.2) : 0.04;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha})`;
        ctx.fill();
      }

      /* SPINE DOTS — MIRRORED */
      const circleCX2 = circleCX + spineOffset;
      for (let s = 0; s < 150; s++) {
        const baseDeg = (s / 150) * 360 - 180;
        const shiftedDeg2 = baseDeg + scrollShiftDeg;
        const wrappedDeg2 = ((shiftedDeg2 + 180) % 360 + 360) % 360 - 180;
        const angleRad2 = (wrappedDeg2 * Math.PI) / 180;
        const px2 = circleCX2 + R * Math.cos(angleRad2);
        const py2 = circleCY + R * Math.sin(angleRad2);
        const iF2 = spineActiveF + wrappedDeg2 / degPerSpine;
        const nearEntryI2 = Math.round(iF2);
        const nearEntry2 = Math.abs(iF2 - nearEntryI2);
        const distFromActive2 = Math.abs(wrappedDeg2) / degPerSpine;
        const onArc2 = Math.abs(wrappedDeg2) <= SPREAD_DEG / 2 + 8;
        const sizeBoost2 = nearEntry2 < 0.25 ? 2.5 : nearEntry2 < 0.45 ? 1.6 : 1.0;
        const r2 = sizeBoost2 * (onArc2 ? Math.max(0.4, 1.1 - distFromActive2 * 0.08) : 0.5);
        const alpha2 = onArc2 ? Math.max(0.06, 0.75 - distFromActive2 * 0.2) : 0.04;
        ctx.beginPath();
        ctx.arc(px2, py2, r2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${alpha2})`;
        ctx.fill();
      }

      /* CLUSTER SCATTER — one scatter bloom per spine slot */
      uniqueYears.forEach((yr, si) => {
        const { x: ex, y: ey } = spinePos(si);
        if (ex < -60 || ex > W + 60 || ey < -60 || ey > H + 60) return;
        const distFromActive = Math.abs(si - spineActiveF);
        const rand = seededRand(si * 7919 + 42);
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
          const dotR =
            (sizeT > 0.92 ? 3.6 + rand() * 2.2 : sizeT > 0.75 ? 1.8 + rand() * 1.2 : 0.7 + rand() * 0.9) *
            (1 + scrollPct * 0.5);
          const falloff = 1 - dist / (spreadR * 1.4);
          const alpha = Math.min(
            1,
            Math.max(0.04, (0.85 - distFromActive * 0.22) * falloff * (sizeT > 0.92 ? 1.1 : 0.85))
          );
          ctx.beginPath();
          ctx.arc(sx, sy, dotR, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255,255,255,${alpha})`;
          ctx.fill();
        }
      });

      /* NODES + YEAR LABELS
         One node per unique year. Color is interpolated between the cluster
         members' colors as activeF moves through the cluster.
      */
      uniqueYears.forEach((yr, si) => {
        const { x: ex, y: ey } = spinePos(si);
        if (ex < -80 || ex > W + 80 || ey < -80 || ey > H + 80) return;

        const distFromActive = Math.abs(si - spineActiveF);
        // Wider active zone for smoother transition halo
        const activeFactor = Math.max(0, 1 - distFromActive * 1.5); // 0..1 smooth falloff
        const isActive = distFromActive < 0.55;

        // Interpolate color across cluster members
        const idxs = clusters[yr];
        const localF = Math.max(0, Math.min(idxs.length - 1, activeF - idxs[0]));
        const p0 = Math.floor(localF);
        const p1 = Math.min(idxs.length - 1, p0 + 1);
        const tFrac = localF - p0;
        const c0 = hexRgb(ENTRIES[idxs[p0]].color);
        const c1 = hexRgb(ENTRIES[idxs[p1]].color);
        const lerp = (a: number, b: number, tt: number) => Math.round(a + (b - a) * tt);
        const nodeColor = `#${[
          lerp(c0[0], c1[0], tFrac),
          lerp(c0[1], c1[1], tFrac),
          lerp(c0[2], c1[2], tFrac),
        ].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
        const col = [lerp(c0[0], c1[0], tFrac), lerp(c0[1], c1[1], tFrac), lerp(c0[2], c1[2], tFrac)];
        const colA = (a: number) => `rgba(${col[0]},${col[1]},${col[2]},${a})`;

        if (isActive) {
          // ── ACTIVE MARBLE BALL ──
          const marbleR = 14;

          // 1. Outer colored glow (subsurface scattering)
          const outerGlow = ctx.createRadialGradient(ex, ey, 0, ex, ey, 42);
          outerGlow.addColorStop(0, colA(0.22));
          outerGlow.addColorStop(0.5, colA(0.08));
          outerGlow.addColorStop(1, colA(0));
          ctx.save(); ctx.fillStyle = outerGlow;
          ctx.beginPath(); ctx.arc(ex, ey, 42, 0, Math.PI * 2); ctx.fill(); ctx.restore();

          // 2. Colored orbit ring
          ctx.save();
          ctx.beginPath(); ctx.arc(ex, ey, 20, 0, Math.PI * 2);
          ctx.strokeStyle = colA(0.35); ctx.lineWidth = 1.2;
          ctx.shadowBlur = 10; ctx.shadowColor = colA(0.8); ctx.stroke(); ctx.restore();

          // 3. Main marble sphere — multi-layer radial gradient for 3D effect
          // Shadow side (offset down-right)
          const shadowGrad = ctx.createRadialGradient(ex + 2, ey + 3, 0, ex, ey, marbleR);
          shadowGrad.addColorStop(0, "rgba(180,190,210,0.3)");
          shadowGrad.addColorStop(0.7, "rgba(60,70,90,0.5)");
          shadowGrad.addColorStop(1, "rgba(20,25,40,0.8)");
          ctx.save();
          ctx.beginPath(); ctx.arc(ex, ey, marbleR, 0, Math.PI * 2);
          ctx.fillStyle = shadowGrad; ctx.fill(); ctx.restore();

          // Body layer — main marble color (white/grey with color tint)
          const bodyGrad = ctx.createRadialGradient(ex - 3, ey - 4, 1, ex, ey, marbleR);
          bodyGrad.addColorStop(0, "rgba(255,255,255,0.98)");
          bodyGrad.addColorStop(0.25, "rgba(235,240,250,0.95)");
          bodyGrad.addColorStop(0.5, "rgba(200,210,230,0.85)");
          bodyGrad.addColorStop(0.75, "rgba(150,165,195,0.7)");
          bodyGrad.addColorStop(1, "rgba(80,95,130,0.4)");
          ctx.save();
          ctx.beginPath(); ctx.arc(ex, ey, marbleR - 0.5, 0, Math.PI * 2);
          ctx.fillStyle = bodyGrad; ctx.fill(); ctx.restore();

          // Colored subsurface tint
          const tintGrad = ctx.createRadialGradient(ex, ey + 2, 0, ex, ey, marbleR);
          tintGrad.addColorStop(0, colA(0.15));
          tintGrad.addColorStop(0.5, colA(0.08));
          tintGrad.addColorStop(1, colA(0));
          ctx.save();
          ctx.beginPath(); ctx.arc(ex, ey, marbleR, 0, Math.PI * 2);
          ctx.fillStyle = tintGrad; ctx.fill(); ctx.restore();

          // Specular highlight (top-left bright spot)
          const specGrad = ctx.createRadialGradient(ex - 4, ey - 5, 0, ex - 4, ey - 5, 7);
          specGrad.addColorStop(0, "rgba(255,255,255,0.95)");
          specGrad.addColorStop(0.4, "rgba(255,255,255,0.5)");
          specGrad.addColorStop(1, "rgba(255,255,255,0)");
          ctx.save();
          ctx.beginPath(); ctx.arc(ex - 4, ey - 5, 7, 0, Math.PI * 2);
          ctx.fillStyle = specGrad; ctx.fill(); ctx.restore();

          // Secondary specular (smaller, sharper)
          const specGrad2 = ctx.createRadialGradient(ex - 2.5, ey - 3.5, 0, ex - 2.5, ey - 3.5, 3);
          specGrad2.addColorStop(0, "rgba(255,255,255,1)");
          specGrad2.addColorStop(1, "rgba(255,255,255,0)");
          ctx.save();
          ctx.beginPath(); ctx.arc(ex - 2.5, ey - 3.5, 3, 0, Math.PI * 2);
          ctx.fillStyle = specGrad2; ctx.fill(); ctx.restore();

          // Edge rim light (bottom-right)
          const rimGrad = ctx.createRadialGradient(ex + 5, ey + 5, 0, ex + 5, ey + 5, 6);
          rimGrad.addColorStop(0, "rgba(200,220,255,0.25)");
          rimGrad.addColorStop(1, "rgba(200,220,255,0)");
          ctx.save();
          ctx.beginPath(); ctx.arc(ex + 5, ey + 5, 6, 0, Math.PI * 2);
          ctx.fillStyle = rimGrad; ctx.fill(); ctx.restore();

          // Marble veining (subtle curved lines)
          ctx.save();
          ctx.globalAlpha = 0.08;
          ctx.strokeStyle = "rgba(120,130,160,1)";
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(ex - 8, ey - 2);
          ctx.quadraticCurveTo(ex - 2, ey + 4, ex + 6, ey - 1);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(ex - 4, ey + 5);
          ctx.quadraticCurveTo(ex + 2, ey + 1, ex + 8, ey + 4);
          ctx.stroke();
          ctx.restore();

        } else {
          // ── INACTIVE MARBLE BALL ──
          const r2 = Math.max(3.5, 7 - distFromActive * 1.5);
          const alpha = Math.max(0.2, 0.9 - distFromActive * 0.25);

          // Shadow layer
          const shadowGrad = ctx.createRadialGradient(ex + 1, ey + 1.5, 0, ex, ey, r2);
          shadowGrad.addColorStop(0, `rgba(180,190,210,${alpha * 0.4})`);
          shadowGrad.addColorStop(0.7, `rgba(80,90,120,${alpha * 0.5})`);
          shadowGrad.addColorStop(1, `rgba(30,35,50,${alpha * 0.6})`);
          ctx.save();
          ctx.beginPath(); ctx.arc(ex, ey, r2, 0, Math.PI * 2);
          ctx.fillStyle = shadowGrad; ctx.fill(); ctx.restore();

          // Body marble gradient
          const bodyGrad = ctx.createRadialGradient(ex - r2 * 0.2, ey - r2 * 0.3, 0, ex, ey, r2);
          bodyGrad.addColorStop(0, `rgba(255,255,255,${alpha})`);
          bodyGrad.addColorStop(0.35, `rgba(230,235,245,${alpha * 0.9})`);
          bodyGrad.addColorStop(0.7, `rgba(180,190,210,${alpha * 0.6})`);
          bodyGrad.addColorStop(1, `rgba(100,115,145,${alpha * 0.3})`);
          ctx.save();
          ctx.beginPath(); ctx.arc(ex, ey, r2 - 0.3, 0, Math.PI * 2);
          ctx.fillStyle = bodyGrad; ctx.fill(); ctx.restore();

          // Small specular highlight
          const specR = r2 * 0.35;
          const specGrad = ctx.createRadialGradient(ex - r2 * 0.2, ey - r2 * 0.25, 0, ex - r2 * 0.2, ey - r2 * 0.25, specR);
          specGrad.addColorStop(0, `rgba(255,255,255,${alpha * 0.7})`);
          specGrad.addColorStop(1, `rgba(255,255,255,0)`);
          ctx.save();
          ctx.beginPath(); ctx.arc(ex - r2 * 0.2, ey - r2 * 0.25, specR, 0, Math.PI * 2);
          ctx.fillStyle = specGrad; ctx.fill(); ctx.restore();
        }

        /* YEAR LABEL */
        const yearScale = Math.max(0.48, 1 - distFromActive * 0.2);
        const yearAlpha = Math.max(0.15, 1.0 - distFromActive * 0.3);
        const yearSize = Math.round((isActive ? 62 : 36) * yearScale);
        const yearX = ex - (isActive ? 36 : 24);
        const isCluster = idxs.length > 1;

        // Smooth color transition using cubic easing for organic feel
        const colorBlendRaw = Math.max(0, 1 - distFromActive * 0.25);
        const colorBlend = colorBlendRaw * colorBlendRaw * (3 - 2 * colorBlendRaw); // smoothstep
        const inactiveBase = [210, 225, 255];
        const nodeRgb = [Math.round(inactiveBase[0] + (col[0] - inactiveBase[0]) * colorBlend), Math.round(inactiveBase[1] + (col[1] - inactiveBase[1]) * colorBlend), Math.round(inactiveBase[2] + (col[2] - inactiveBase[2]) * colorBlend)];
        const colorBase = isActive ? col.join(",") : nodeRgb.join(",");

        ctx.save();
        ctx.font = `${isActive ? 800 : 600} ${yearSize}px 'Space Grotesk', 'Outfit', sans-serif`;
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.globalAlpha = yearAlpha;

        const grad = ctx.createLinearGradient(0, ey - yearSize / 2, 0, ey + yearSize / 2);
        grad.addColorStop(0, `rgba(${colorBase}, 1)`);
        grad.addColorStop(1, `rgba(${colorBase}, 0.3)`);
        ctx.fillStyle = grad;

        if (isActive) {
          ctx.shadowBlur = 15;
          ctx.shadowColor = colA(0.4);
        }
        // Year stays anchored to the node — pips are drawn below
        ctx.fillText(yr, yearX, ey);
        ctx.restore();

        /* PIP TRACK — only for clusters, rendered BELOW the year label */
        if (isActive && isCluster) {
          // Measure the year text to position pips right below it
          ctx.save();
          ctx.font = `800 ${yearSize}px 'Space Grotesk', 'Outfit', sans-serif`;
          const yearMetrics = ctx.measureText(yr);
          const yearTextHeight = yearMetrics.actualBoundingBoxAscent + yearMetrics.actualBoundingBoxDescent;
          ctx.restore();

          const pipY = ey + Math.round(yearTextHeight / 2) + 12;
          const pipR = 3.5; // Radius for metallic pip dots
          const gap = 8;
          const total = idxs.length;
          const totalW = total * (pipR * 2) + (total - 1) * gap;
          const startX = yearX - totalW + pipR; // center of first pip

          // Continuous local position within cluster: 0..total-1
          const localFClamped = Math.max(0, Math.min(total - 1, activeF - idxs[0]));

          // Draw dim track slots (inactive metallic dots)
          for (let p = 0; p < total; p++) {
            const px = startX + p * (pipR * 2 + gap);
            const memberCol = hexRgb(ENTRIES[idxs[p]].color);
            ctx.save();
            ctx.beginPath();
            ctx.arc(px, pipY, pipR, 0, Math.PI * 2);
            // Dim metallic gradient
            const dimGrad = ctx.createRadialGradient(px - pipR*0.3, pipY - pipR*0.3, 0, px, pipY, pipR);
            dimGrad.addColorStop(0, `rgba(255,255,255,0.4)`);
            dimGrad.addColorStop(0.5, `rgba(${memberCol[0]},${memberCol[1]},${memberCol[2]},0.3)`);
            dimGrad.addColorStop(1, `rgba(30,35,50,0.6)`);
            ctx.fillStyle = dimGrad;
            ctx.fill();
            
            // Subtle specular highlight for dim pips
            const specGrad = ctx.createRadialGradient(px - pipR*0.4, pipY - pipR*0.4, 0, px - pipR*0.4, pipY - pipR*0.4, pipR*0.5);
            specGrad.addColorStop(0, `rgba(255,255,255,0.5)`);
            specGrad.addColorStop(1, `rgba(255,255,255,0)`);
            ctx.beginPath(); ctx.arc(px - pipR*0.4, pipY - pipR*0.4, pipR*0.5, 0, Math.PI * 2);
            ctx.fillStyle = specGrad; ctx.fill();
            
            ctx.restore();
          }

          // Sliding active pip — moves left to right as scroll increases
          const cp0 = Math.floor(localFClamped);
          const cp1 = Math.min(total - 1, cp0 + 1);
          const cFrac = localFClamped - cp0;
          const cc0 = hexRgb(ENTRIES[idxs[cp0]].color);
          const cc1 = hexRgb(ENTRIES[idxs[cp1]].color);
          const lerpC = (a: number, b: number, tt: number) => Math.round(a + (b - a) * tt);
          const pipColor = `rgb(${lerpC(cc0[0], cc1[0], cFrac)},${lerpC(cc0[1], cc1[1], cFrac)},${lerpC(cc0[2], cc1[2], cFrac)})`;
          
          // Pip x position: interpolates from slot 0 to slot total-1
          const activeX = startX + localFClamped * (pipR * 2 + gap);
          const activeR = 5; // slightly larger active pip
          
          ctx.save();
          // Active pip outer glow
          ctx.beginPath(); ctx.arc(activeX, pipY, activeR * 2.5, 0, Math.PI * 2);
          const glowGrad = ctx.createRadialGradient(activeX, pipY, 0, activeX, pipY, activeR * 2.5);
          glowGrad.addColorStop(0, pipColor);
          glowGrad.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = glowGrad;
          ctx.globalAlpha = 0.5;
          ctx.fill();
          
          // Active pip metallic body
          ctx.globalAlpha = 1;
          ctx.beginPath();
          ctx.arc(activeX, pipY, activeR, 0, Math.PI * 2);
          const bodyGrad = ctx.createRadialGradient(activeX - activeR*0.3, pipY - activeR*0.3, 0, activeX, pipY, activeR);
          bodyGrad.addColorStop(0, '#ffffff');
          bodyGrad.addColorStop(0.3, '#e2e8f0');
          bodyGrad.addColorStop(0.7, pipColor);
          bodyGrad.addColorStop(1, '#0f172a');
          ctx.fillStyle = bodyGrad;
          ctx.shadowBlur = 8;
          ctx.shadowColor = pipColor;
          ctx.fill();
          
          // Active pip bright specular highlight
          ctx.beginPath(); ctx.arc(activeX - activeR*0.4, pipY - activeR*0.4, activeR*0.4, 0, Math.PI * 2);
          const activeSpecGrad = ctx.createRadialGradient(activeX - activeR*0.4, pipY - activeR*0.4, 0, activeX - activeR*0.4, pipY - activeR*0.4, activeR*0.4);
          activeSpecGrad.addColorStop(0, 'rgba(255,255,255,0.9)');
          activeSpecGrad.addColorStop(1, 'rgba(255,255,255,0)');
          ctx.fillStyle = activeSpecGrad;
          ctx.shadowBlur = 0;
          ctx.fill();
          
          ctx.restore();
        }
      });
    },
    [scrollPct, W, H, canvasRef, isVisible]
  );

  // `draw` is recreated whenever scrollPct changes (i.e. every scroll frame).
  // Keep the rAF loop itself mounted once and read the latest `draw` via a
  // ref, otherwise the loop would be torn down and restarted on every
  // scroll tick, causing a visible stutter synced to scrolling.
  const drawRef = useRef(draw);
  useEffect(() => {
    drawRef.current = draw;
  }, [draw]);

  useEffect(() => {
    const loop = (ts: number) => {
      drawRef.current(ts);
      animRef.current = requestAnimationFrame(loop);
    };
    animRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  useEffect(() => {
    const resize = () => { lastTsRef.current = null; };
    window.addEventListener("resize", resize);
    const t = setTimeout(() => drawRef.current(), 100);
    return () => {
      window.removeEventListener("resize", resize);
      clearTimeout(t);
    };
  }, []);

  return null;
}

/* ================================================================
   VERTICAL PROGRESS
================================================================ */
function VerticalProgress({
  scrollPct,
  activeI,
  total,
  activeColor,
}: {
  scrollPct: number;
  activeI: number;
  total: number;
  activeColor: string;
}) {
  return (
    <div className="vp-wrap">
      <div className="vp-counter">
        <span className="vp-cur">{String(activeI + 1).padStart(2, "0")}</span>
        <span className="vp-sep">/</span>
        <span className="vp-tot">{String(total).padStart(2, "0")}</span>
      </div>
      <div className="vp-track">
        <div
          className="vp-fill"
          style={{
            height: "100%",
            transform: `scaleY(${scrollPct})`,
            background: `linear-gradient(180deg, ${activeColor}, #38bdf8)`,
            boxShadow: `0 0 8px ${activeColor}88`,
          }}
        />
      </div>
      <div className="vp-dots">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="vp-dot"
            style={{
              background: i === activeI ? activeColor : "rgba(255,255,255,0.18)",
              boxShadow: i === activeI ? `0 0 6px ${activeColor}` : "none",
              transform: i === activeI ? "scale(1.5)" : "scale(1)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/* ================================================================
   YEAR TRANSITION BANNER
================================================================ */
function YearTransitionBanner({
  prevEntry,
  nextEntry,
  transitionProgress,
}: {
  prevEntry: Entry | null;
  nextEntry: Entry | null;
  transitionProgress: number;
}) {
  if (!prevEntry || !nextEntry || prevEntry.year !== nextEntry.year) return null;
  return (
    <div
      className="ytb-wrap"
      style={{ opacity: Math.min(transitionProgress * 4, 1, (1 - transitionProgress) * 4) }}
    >
      <div
        className="ytb-inner"
        style={{
          borderColor: `rgba(${hexRgb(nextEntry.color).join(",")}, 0.4)`,
          color: nextEntry.color,
        }}
      >
        <span className="ytb-dot" style={{ background: nextEntry.color }} />
        <span className="ytb-label">
          {prevEntry.role} → {nextEntry.role}
        </span>
        <span className="ytb-year">{nextEntry.year}</span>
      </div>
    </div>
  );
}

/* ================================================================
   GHOST YEAR — smooth cross-fade when year changes
================================================================ */
function GhostYear({ year, color }: { year: string; color: string }) {
  const [state, setState] = useState({ current: year, prev: null as string | null, animKey: 0 });
  const prevYearRef = useRef(year);

  useEffect(() => {
    if (year !== prevYearRef.current) {
      setState((s) => ({ current: year, prev: prevYearRef.current, animKey: s.animKey + 1 }));
      prevYearRef.current = year;
    }
  }, [year]);

  // Clear the exiting year after animation completes
  useEffect(() => {
    if (state.prev !== null) {
      const t = setTimeout(() => setState((s) => ({ ...s, prev: null })), 750);
      return () => clearTimeout(t);
    }
  }, [state.animKey]);

  const rgb = hexRgb(color).join(",");

  return (
    <div className="tl-ghost-wrap">
      <div className="tl-ghost" style={{ "--ghost-rgb": rgb } as React.CSSProperties}>
        {state.current.split("").map((char, i) => {
          const prevChar = state.prev ? state.prev[i] : null;
          const isChanging = state.prev && prevChar !== char;

          if (!isChanging) {
            return <span key={`static-${i}`}>{char}</span>;
          }

          return (
            <span key={`dyn-${i}-${state.animKey}`} className="tl-ghost-digit-wrap">
              <span className="tl-ghost-exit-digit">{prevChar}</span>
              <span className="tl-ghost-enter-digit">{char}</span>
            </span>
          );
        })}
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
  const activeF = progress * (N - 1);
  // Bias the index calculation slightly so cards switch earlier on scroll (at 0.35 instead of 0.5)
  const activeI = Math.min(Math.floor(activeF + 0.65), N - 1);
  const activeEntry = ENTRIES[Math.max(0, activeI)];

  // Ghost year should transition at the exact same time as the active entry
  const ghostI = Math.min(Math.floor(activeF + 0.65), N - 1);
  const ghostEntry = ENTRIES[Math.max(0, ghostI)];

  const floorI = Math.floor(activeF);
  const ceilI = Math.min(floorI + 1, N - 1);
  const frac = activeF - floorI;
  const isSameYearTransition =
    floorI !== ceilI && ENTRIES[floorI].year === ENTRIES[ceilI].year;

  return (
    <>
      <style>{`
        .tl-outer { position: relative; }
        .tl-sticky {
          position: sticky; top: 0; height: 100vh; width: 100%;
          overflow: hidden; font-family: var(--font-jetbrains-mono), monospace;
          background: #000; border-top: 1px solid rgba(255,255,255,0.05);
          box-shadow: 0 20px 100px rgba(0,0,0,0.9);
        }

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
            radial-gradient(2px 2px at 6% 8%, rgba(255,255,255,1) 0%,transparent 100%),
            radial-gradient(2px 2px at 14% 44%, rgba(255,255,255,0.8) 0%,transparent 100%),
            radial-gradient(2.5px 2.5px at 22% 72%, rgba(255,255,255,0.9) 0%,transparent 100%),
            radial-gradient(2px 2px at 31% 20%, rgba(255,255,255,0.7) 0%,transparent 100%),
            radial-gradient(2px 2px at 40% 88%, rgba(255,255,255,0.85) 0%,transparent 100%),
            radial-gradient(2px 2px at 49% 35%, rgba(255,255,255,0.75) 0%,transparent 100%),
            radial-gradient(2.5px 2.5px at 57% 60%, rgba(255,255,255,0.95) 0%,transparent 100%),
            radial-gradient(2px 2px at 66% 14%, rgba(255,255,255,0.8) 0%,transparent 100%),
            radial-gradient(2px 2px at 74% 80%, rgba(255,255,255,0.7) 0%,transparent 100%),
            radial-gradient(2px 2px at 82% 40%, rgba(255,255,255,0.85) 0%,transparent 100%),
            radial-gradient(2px 2px at 90% 65%, rgba(255,255,255,0.75) 0%,transparent 100%),
            radial-gradient(3px 3px at 95% 22%, rgba(255,255,255,1) 0%,transparent 100%),
            radial-gradient(2px 2px at 10% 95%, rgba(255,255,255,0.65) 0%,transparent 100%),
            radial-gradient(2px 2px at 45% 55%, rgba(255,255,255,0.6) 0%,transparent 100%),
            radial-gradient(2px 2px at 78% 10%, rgba(255,255,255,0.8) 0%,transparent 100%);
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
          color: rgba(var(--tc2-rgb), 0.5); margin-bottom: 10px; display: block;
        }
        .tl-h1 {
          font-family: var(--font-malinton), sans-serif; font-size: clamp(26px, 3.2vw, 42px);
          font-weight: 800; color: #ffffff; letter-spacing: -1.5px;
          line-height: 1.05; margin: 0 0 10px;
        }
        .tl-h1 .tc  { color: #38bdf8; text-shadow: 0 0 20px rgba(var(--tc2-rgb), 0.4); }
        .tl-h1 .tc2 { color: #60a5fa; text-shadow: 0 0 20px rgba(var(--tc10-rgb), 0.3); }
        .tl-version {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 10px; color: rgba(100,180,255,0.45);
          background: rgba(var(--tc2-rgb),0.08);
          border: 1px solid rgba(var(--tc2-rgb),0.2);
          border-radius: 999px; padding: 5px 14px;
          letter-spacing: 0.3px; width: fit-content;
          box-shadow: 0 0 12px rgba(var(--tc2-rgb), 0.08);
        }
        .tl-version .dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: #38bdf8; opacity: 0.7;
          animation: pulse 2s ease-in-out infinite;
          box-shadow: 0 0 8px rgba(var(--tc2-rgb), 0.5);
        }
        @keyframes pulse {
          0%,100% { opacity: 0.4; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }

        /* ══ CARD ══ */
        .ec-stack { display: flex; flex-direction: column; align-items: flex-start; gap: 14px; }
        .ec-outer {
          width: 380px; height: 490px; flex-shrink: 0;
          cursor: pointer; perspective: 1400px;
        }
        .ec-enter { animation: ecEnter 0.7s cubic-bezier(0.16, 1, 0.3, 1) both; }
        @keyframes ecEnter {
          0% { opacity: 0; transform: translateY(28px) scale(0.96) perspective(1400px) rotateX(6deg); filter: blur(6px); }
          60% { opacity: 1; filter: blur(0px); }
          100% { opacity: 1; transform: translateY(0) scale(1) perspective(1400px) rotateX(0deg); filter: blur(0px); }
        }
        .ec-enter .ec-body > * {
          animation: ecBodyIn 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: calc(0.12s + var(--i, 0) * 0.05s);
          opacity: 0;
        }
        .ec-enter .ec-toprow    { --i: 0; }
        .ec-enter .ec-org-wrap  { --i: 1; }
        .ec-enter .ec-role-row  { --i: 2; }
        .ec-enter .ec-pills     { --i: 3; }
        .ec-enter .ec-desc-wrap { --i: 4; }
        .ec-enter .ec-tags      { --i: 5; }
        @keyframes ecBodyIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .ec-enter .ec-tag {
          animation: ecTagIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
          animation-delay: calc(0.32s + var(--ti, 0) * 0.04s);
          opacity: 0;
        }
        @keyframes ecTagIn {
          from { opacity: 0; transform: translateY(6px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ec-enter, .ec-enter .ec-body > *, .ec-enter .ec-tag {
            animation: none !important; opacity: 1 !important;
            filter: none !important; transform: none !important;
          }
        }

        .ec-card {
          position: relative; border-radius: 22px; overflow: hidden;
          width: 100%; height: 100%;
          background: linear-gradient(145deg, rgba(200,225,255,0.06) 0%, rgba(150,200,255,0.02) 50%, rgba(100,180,255,0.04) 100%);
          border: 1px solid rgba(180,220,255,0.14);
          /* was blur(40px) saturate(180%) brightness(1.08) — this card sits in
             front of a continuously-redrawing canvas for the entire (longest)
             section of the page, so a heavy compound backdrop-filter here was
             recomputed on every single frame. A lighter single-property blur
             is dramatically cheaper and visually near-identical. */
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow:
            0 25px 60px rgba(0, 0, 0, 0.5),
            0 8px 24px rgba(0, 20, 60, 0.3),
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            inset 0 -1px 0 rgba(255, 255, 255, 0.04),
            inset 1px 0 0 rgba(255, 255, 255, 0.06),
            inset -1px 0 0 rgba(255, 255, 255, 0.06);
          transition: border-color .5s cubic-bezier(0.2,0.8,0.2,1),
                      box-shadow .6s cubic-bezier(0.2,0.8,0.2,1),
                      transform .55s cubic-bezier(0.16, 1, 0.3, 1),
                      background .5s cubic-bezier(0.2,0.8,0.2,1);
          transform-style: preserve-3d;
          will-change: transform;
        }
        .ec-card.hov {
          background: linear-gradient(145deg, rgba(214,234,255,0.15) 0%, rgba(150,200,255,0.07) 50%, rgba(100,180,255,0.1) 100%);
          border-color: rgba(var(--rgb), 0.5);
          box-shadow:
            0 50px 100px rgba(0, 0, 0, 0.7),
            0 16px 44px rgba(0, 20, 60, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.45),
            0 0 0 1px rgba(var(--rgb), 0.3),
            0 0 60px rgba(var(--rgb), 0.18),
            0 0 130px rgba(var(--rgb), 0.09);
          transform: scale(1.03) translateY(-8px)
            perspective(1400px) rotateX(calc((var(--my) - 0.5) * -6deg)) rotateY(calc((var(--mx) - 0.5) * 6deg));
        }

        .ecl-edge {
          position: absolute; inset: 0; border-radius: inherit;
          pointer-events: none; z-index: 6; padding: 1px;
          opacity: 0; transition: opacity .45s ease;
          background: conic-gradient(from var(--edge-angle, 0deg),
            transparent 0deg,
            rgba(var(--rgb), 0.9) 35deg,
            transparent 90deg,
            transparent 270deg,
            rgba(var(--rgb), 0.5) 325deg,
            transparent 360deg);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          animation: edgeSpin 5s linear infinite;
        }
        .ec-card.hov .ecl-edge { opacity: 1; }
        @keyframes edgeSpin {
          from { --edge-angle: 0deg; }
          to   { --edge-angle: 360deg; }
        }
        @property --edge-angle {
          syntax: '<angle>'; initial-value: 0deg; inherits: false;
        }

        .ecl-spotlight {
          position: absolute; inset: 0; border-radius: inherit;
          pointer-events: none; z-index: 1;
          opacity: 0; transition: opacity .35s ease;
          background: radial-gradient(420px circle at calc(var(--mx,0.5) * 100%) calc(var(--my,0.5) * 100%),
            rgba(255,255,255,0.10), rgba(var(--rgb), 0.07) 40%, transparent 70%);
        }
        .ec-card.hov .ecl-spotlight { opacity: 1; }

        .ecl-scan {
          position: absolute; inset: 0; pointer-events: none; z-index: 4;
          background: linear-gradient(180deg,
            transparent 0%, rgba(var(--tc2-rgb),0.03) 44%,
            rgba(var(--tc2-rgb),0.18) 50%, rgba(var(--tc2-rgb),0.03) 56%, transparent 100%);
          background-size: 100% 300%; transition: opacity .35s;
          animation: scan 2.2s ease-in-out infinite;
        }
        @keyframes scan {
          0%   { background-position-y: -100%; }
          100% { background-position-y: 200%; }
        }

        .ecl-grid {
          position: absolute; inset: 0; pointer-events: none; z-index: 3;
          background-image:
            linear-gradient(rgba(var(--tc2-rgb),0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--tc2-rgb),0.04) 1px, transparent 1px);
          background-size: 24px 24px;
          opacity: 0; transition: opacity .5s;
        }
        .ec-card.hov .ecl-grid { opacity: 1; }

        .ecl-border-line {
          position: absolute; inset: 0; border-radius: inherit;
          border: 1px solid rgba(var(--rgb), 0.3); opacity: 0; transition: opacity .4s;
          pointer-events: none; z-index: 6;
        }
        .ec-card.hov .ecl-border-line { opacity: 1; }

        .ec-corner {
          position: absolute; width: 16px; height: 16px;
          border-color: var(--cc); border-style: solid;
          pointer-events: none; z-index: 6;
          transition: opacity .25s ease, transform .35s cubic-bezier(0.16, 1, 0.3, 1);
          filter: drop-shadow(0 0 6px var(--cc));
          transform: scale(0.6);
        }
        .ec-card.hov .ec-corner { transform: scale(1); }
        .ec-corner-tl { top: 10px; left: 10px; border-width: 1.5px 0 0 1.5px; border-radius: 3px 0 0 0; }
        .ec-corner-tr { top: 10px; right: 10px; border-width: 1.5px 1.5px 0 0; border-radius: 0 3px 0 0; }
        .ec-corner-bl { bottom: 10px; left: 10px; border-width: 0 0 1.5px 1.5px; border-radius: 0 0 0 3px; }
        .ec-corner-br { bottom: 10px; right: 10px; border-width: 0 1.5px 1.5px 0; border-radius: 0 0 3px 0; }

        .ec-hover-cta {
          position: absolute; bottom: 16px; right: 16px; z-index: 7;
          display: flex; align-items: center; gap: 5px;
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 9.5px; letter-spacing: 1.5px; text-transform: uppercase;
          color: var(--cc); pointer-events: none;
          transition: opacity .3s, transform .3s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateX(-4px);
        }
        .ec-card.hov .ec-hover-cta { transform: translateX(0); }

        .ecl-s {
          position: absolute; inset: 0; pointer-events: none;
          background: linear-gradient(145deg, rgba(180,220,255,0.10) 0%, rgba(255,255,255,0.03) 40%, transparent 70%),
                      radial-gradient(circle at 25% 15%, rgba(200,230,255,0.14) 0%, transparent 55%),
                      radial-gradient(circle at 75% 85%, rgba(100,180,255,0.06) 0%, transparent 50%);
          opacity: 0.85;
        }
        .ecl-r { position:absolute;top:0;left:5%;right:5%;height:1px;background:linear-gradient(90deg,transparent 0%,rgba(180,220,255,0.3) 20%,rgba(255,255,255,0.6) 45%,rgba(255,255,255,0.7) 55%,rgba(180,220,255,0.3) 80%,transparent 100%);pointer-events:none;z-index:2; }
        .ecl-n {
          position: absolute; inset: 0; border-radius: inherit;
          opacity: 0.03; pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          mix-blend-mode: overlay;
        }
        .ecl-g { position:absolute;bottom:-1px;left:5%;right:5%;height:90px;background:radial-gradient(ellipse,rgba(140,200,255,0.10) 0%,rgba(255,255,255,0.04) 40%,transparent 70%);pointer-events:none;transition:opacity .4s; }

        /* LOGO SLOT */
        .ec-logo-wrap {
          position: absolute; top: 16px; right: 16px;
          z-index: 5; pointer-events: none;
          width: 64px; height: 64px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.15);
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(8px);
          box-shadow: 0 6px 16px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1);
          overflow: hidden;
          transition: transform .4s cubic-bezier(0.16,1,0.3,1), border-color .4s, box-shadow .4s;
        }
        .ec-card.hov .ec-logo-wrap {
          transform: translateY(-2px) scale(1.04);
          border-color: rgba(var(--rgb), 0.35);
          box-shadow: 0 10px 22px rgba(0,0,0,0.3), 0 0 24px rgba(var(--rgb),0.18), inset 0 1px 0 rgba(255,255,255,0.15);
        }
        .ec-logo-shimmer {
          position: absolute; inset: 0; z-index: 2;
          background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 40%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 60%, transparent 100%);
          transform: translateX(-150%) skewX(-25deg); pointer-events: none;
        }
        .ec-logo-shimmer.active { animation: logoShimmer 1.8s cubic-bezier(0.19,1,0.22,1) infinite; }
        @keyframes logoShimmer {
          0%   { transform: translateX(-150%) skewX(-25deg); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(150%) skewX(-25deg); opacity: 0; }
        }
        .ec-logo-img {
          width: 34px; height: 34px; object-fit: contain;
          filter: drop-shadow(0 4px 8px rgba(0,0,0,0.2));
          position: relative; z-index: 1;
        }
        .ec-logo-ph {
          width: 34px; height: 34px; border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          font-family: var(--font-malinton), sans-serif; font-size: 11px; font-weight: 800;
          letter-spacing: 0.5px; line-height: 1;
        }

        /* CARD BODY */
        .ec-body {
          position: relative; z-index: 3;
          padding: 22px 70px 22px 22px;
          height: 100%; box-sizing: border-box;
          display: flex; flex-direction: column;
          gap: 0; overflow: hidden;
        }

        /* Top row — hash only */
        .ec-toprow { display:flex;align-items:center;gap:7px;margin-bottom:18px;flex-shrink:0; }
        .ec-hash {
          font-size: 11px; padding: 3px 10px; border-radius: 6px;
          font-family: var(--font-jetbrains-mono), monospace;
          background: linear-gradient(135deg, rgba(255,107,43,0.15) 0%, rgba(255,107,43,0.08) 100%);
          border: 1px solid rgba(255,107,43,0.35);
          color: #ff8450; letter-spacing: 0.5px;
          backdrop-filter: blur(4px);
          box-shadow: 0 2px 8px rgba(0,0,0,0.2), inset 1px 1px 0 rgba(255,255,255,0.15);
        }

        /* Role row */
        .ec-role-row {
          display: flex; align-items: center; gap: 8px;
          margin-bottom: 16px; flex-shrink: 0; flex-wrap: nowrap; overflow: hidden;
        }
        .ec-kind-badge {
          font-family: var(--font-jetbrains-mono), monospace;
          font-size: 8.5px; font-weight: 700; letter-spacing: 2px;
          text-transform: uppercase; padding: 3.5px 10px; border-radius: 5px;
          background: linear-gradient(145deg, rgba(var(--rgb),0.2) 0%, rgba(var(--rgb),0.1) 100%);
          border: 1px solid rgba(var(--rgb),0.4);
          color: var(--cc); flex-shrink: 0; line-height: 1;
          box-shadow: 0 4px 8px rgba(0,0,0,0.15), inset 1px 1px 0 rgba(255,255,255,0.1);
        }
        .ec-role {
          font-family:var(--font-jetbrains-mono),monospace; font-size:11px;
          font-weight:500; color:rgba(255,255,255,0.95); margin:0; line-height:1.2;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          flex:1; min-width:0; letter-spacing:0.1px;
        }

        /* Org connector */
        .ec-org-wrap { display:flex;align-items:stretch;gap:0;margin:0 0 14px;flex-shrink:0; }
        .ec-org-line {
          width:1px;margin:2px 10px 2px 4px;flex-shrink:0;
          background:linear-gradient(180deg,var(--cc) 0%,rgba(var(--rgb),0.12) 100%);
          opacity:0.6;border-radius:1px;transition:opacity .4s,box-shadow .4s;
        }
        .ec-card.hov .ec-org-line { opacity:1;box-shadow:0 0 12px var(--cc); }
        .ec-org-inner { display:flex;flex-direction:column;justify-content:center;gap:2px; }
        .ec-org-label {
          font-family:var(--font-jetbrains-mono),monospace;
          font-size:9px;font-weight:400;letter-spacing:3px;text-transform:uppercase;
          color:rgba(var(--rgb),0.55);line-height:1;
        }
        .ec-org-name {
          font-family:var(--font-malinton),sans-serif;
          font-size:clamp(17px,2.1vw,24px);font-weight:500;
          color:#e8f4ff;line-height:1.15;letter-spacing:0.1px;
          margin-top:4px;white-space:pre-line;
        }
        .ec-org-ai { color:#0055FF;text-shadow:0 0 16px rgba(0,85,255,0.55); }

        /* Pills */
        .ec-pills { display:flex;flex-wrap:wrap;gap:8px;margin-bottom:18px;flex-shrink:0; }
        .ec-pill {
          font-size:9.5px;padding:4px 11px;border-radius:8px;
          font-family:var(--font-jetbrains-mono),monospace;
          background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.12);
          color:rgba(200,220,255,0.6);backdrop-filter:blur(4px);
          box-shadow:0 3px 10px rgba(0,0,0,0.15),inset 1px 1px 0 rgba(255,255,255,0.08);
          transition:border-color .3s,color .3s,background .3s,box-shadow .3s;
        }
        .ec-card.hov .ec-pill { border-color:rgba(255,255,255,0.2);color:rgba(220,235,255,0.8); }
        .ec-pill-dur { border-color:rgba(var(--rgb),0.35);color:var(--cc);background:rgba(var(--rgb),0.08); }
        .ec-pill-type { border-color:rgba(var(--tc2-rgb),0.3);color:rgba(130,200,255,0.85);background:rgba(var(--tc2-rgb),0.06); }

        /* Desc */
        .ec-desc-wrap {
          padding-left:14px;border-left:2px solid rgba(var(--rgb),0.3);margin-bottom:16px;flex-shrink:0;
          transition:border-color .4s;
        }
        .ec-card.hov .ec-desc-wrap { border-left-color:rgba(var(--rgb),0.6); }
        .ec-desc {
          font-size:11.5px;line-height:1.72;color:rgba(180,215,255,0.48);margin:0;
          display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden;
          transition:color .4s;
        }
        .ec-card.hov .ec-desc { color:rgba(195,222,255,0.62); }

        /* Tags */
        .ec-tags { display:flex;flex-wrap:wrap;gap:8px;flex-shrink:0; }
        .ec-tag {
          font-size:9.5px;padding:5px 12px;border-radius:6px;
          border:1px solid rgba(255,255,255,0.1);background:rgba(255,255,255,0.03);
          color:rgba(190,215,255,0.5);backdrop-filter:blur(6px);
          box-shadow:0 3px 10px rgba(0,0,0,0.15),inset 1px 1px 0 rgba(255,255,255,0.05);
          transition:all 0.25s cubic-bezier(0.2,0.8,0.2,1);cursor:default;
        }
        .ec-tag:hover {
          border-color:rgba(var(--rgb),0.5);color:var(--cc);background:rgba(var(--rgb),0.08);
          box-shadow:0 8px 16px rgba(0,0,0,0.3),0 0 15px rgba(var(--rgb),0.2);
          transform:translateY(-2px) scale(1.05);
        }

        /* YEAR TRANSITION BANNER */
        .ytb-wrap {
          position:absolute;bottom:80px;left:48px;z-index:9;pointer-events:none;
          transition:opacity 0.25s ease;
        }
        .ytb-inner {
          display:flex;align-items:center;gap:10px;padding:7px 16px 7px 12px;
          border-radius:999px;border:1px solid;background:rgba(0,0,0,0.6);
          backdrop-filter:blur(12px);font-family:var(--font-jetbrains-mono),monospace;
          font-size:9.5px;letter-spacing:0.5px;
        }
        .ytb-dot { width:6px;height:6px;border-radius:50%;flex-shrink:0;animation:pulse 1.5s ease-in-out infinite; }
        .ytb-label { color:rgba(200,220,255,0.55);max-width:280px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
        .ytb-year { font-weight:700;font-size:11px;opacity:0.9; }

        /* GHOST YEAR — container + animated layers */
        .tl-ghost-wrap {
          position:absolute;left:39%;top:55%;transform:translate(-50%,-50%);
          pointer-events:none;z-index:1;
        }
        .tl-ghost {
          position:relative; display:flex;
          font-family:var(--font-malinton),sans-serif;font-size:clamp(100px,14vw,180px);
          font-weight:800;
          letter-spacing:-6px;user-select:none;white-space:nowrap;
        }
        .tl-ghost span {
          background: linear-gradient(180deg, rgba(var(--ghost-rgb), 0.2) 0%, rgba(var(--ghost-rgb), 0) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          -webkit-text-stroke: 1px rgba(var(--ghost-rgb), 0.1);
        }
        .tl-ghost-digit-wrap {
          position:relative; display:inline-flex; align-items:center; justify-content:center;
        }
        .tl-ghost-exit-digit {
          position:absolute; top:0; left:0; right:0; text-align:center;
          animation: ghostExit 0.55s cubic-bezier(0.55, 0, 1, 0.45) both;
        }
        .tl-ghost-enter-digit {
          display:inline-block;
          animation: ghostEnter 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes ghostEnter {
          0%   { opacity: 0; transform: translateY(55px) scale(0.96); filter: blur(8px); }
          50%  { filter: blur(0px); }
          100% { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
        }
        @keyframes ghostExit {
          0%   { opacity: 1; transform: translateY(0) scale(1); filter: blur(0px); }
          100% { opacity: 0; transform: translateY(-45px) scale(1.03); filter: blur(6px); }
        }

        /* VERTICAL PROGRESS */
        .vp-wrap {
          position:absolute;right:28px;top:50%;transform:translateY(-50%);
          display:flex;flex-direction:column;align-items:center;gap:14px;z-index:10;
        }
        .vp-counter { display:flex;flex-direction:column;align-items:center;gap:2px;font-family:var(--font-jetbrains-mono),monospace; }
        .vp-cur { font-size:13px;font-weight:700;color:rgba(220,235,255,0.75);letter-spacing:1px;line-height:1; }
        .vp-sep { font-size:9px;color:rgba(180,200,255,0.25);line-height:1; }
        .vp-tot { font-size:11px;font-weight:400;color:rgba(180,200,255,0.28);letter-spacing:1px;line-height:1; }
        .vp-track { width:2px;height:100px;background:rgba(255,255,255,0.07);border-radius:1px;overflow:hidden;position:relative; }
        .vp-fill { width:100%;position:absolute;top:0;left:0;border-radius:1px;transform-origin:top;transition:transform .08s linear; }
        .vp-dots { display:flex;flex-direction:column;align-items:center;gap:8px; }
        .vp-dot { width:5px;height:5px;border-radius:50%;transition:transform .25s,background .25s,box-shadow .25s; }

        @media(max-width:700px){
          .tl-left { width:90%;padding:0 20px; }
          .ec-outer { width:100%;max-width:360px; }
          .vp-wrap { display:none; }
        }
      `}</style>

      <section
        className="tl-outer"
        ref={outerRef}
        style={{ height: `${(N + 3.5) * 100}vh` }}
      >
        <div className="tl-sticky" ref={stickyRef}>
          <div className="tl-bg" />
          <div className="tl-stars" />
          <GhostYear year={ghostEntry.year} color={ghostEntry.color} />

          <canvas
            ref={canvasRef}
            className="tl-canvas"
            style={{ width: dims.w, height: dims.h }}
          />
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
            <EntryCard key={activeEntry.id} entry={activeEntry} transitionKey={activeEntry.id} />
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