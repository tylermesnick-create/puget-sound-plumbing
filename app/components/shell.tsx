"use client";

import React, { ReactNode } from "react";
import * as Ic from "./icons";

export function Logo({ size = 28 }: { size?: number }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden="true">
        <defs>
          <linearGradient id="lg" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#1E6FA8" />
            <stop offset="1" stopColor="#0B3B5C" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="15" fill="url(#lg)" />
        <path
          d="M22 11.5c-1.6-2-4-3.2-6.5-3.2a8 8 0 0 0 0 15.4c2.5 0 4.9-1.2 6.5-3.2"
          fill="none" stroke="#F5F1EA" strokeWidth="2.25" strokeLinecap="round"
        />
        <path
          d="M20 14.5c-1-1.2-2.4-1.9-4-1.9a4.5 4.5 0 0 0 0 8.8c1.6 0 3-.7 4-1.9"
          fill="none" stroke="#9CC8E6" strokeWidth="1.75" strokeLinecap="round"
        />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span style={{
          fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 19,
          letterSpacing: "-0.02em", color: "var(--ink)"
        }}>Rainier</span>
        <span style={{
          fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 10.5,
          letterSpacing: "0.16em", color: "var(--muted)", textTransform: "uppercase", marginTop: 3
        }}>Plumbing · Seattle</span>
      </div>
    </div>
  );
}

export function Header({ onCall }: { onCall: () => void }) {
  return (
    <header style={{
      position: "sticky", top: 0, zIndex: 20,
      background: "rgba(245,241,234,.85)",
      backdropFilter: "saturate(150%) blur(10px)",
      WebkitBackdropFilter: "saturate(150%) blur(10px)",
      borderBottom: "1px solid var(--line)"
    }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto", padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16
      }}>
        <Logo />
        <div className="hdr-right" style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div className="hdr-hours" style={{
            display: "flex", alignItems: "center", gap: 8, color: "var(--ink-2)", fontSize: 13,
            paddingRight: 12, borderRight: "1px solid var(--line)"
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: "50%", background: "#2E7D5B",
              boxShadow: "0 0 0 3px rgba(46,125,91,.18)"
            }} />
            <span>Dispatcher on now · 24/7</span>
          </div>
          <button onClick={onCall} className="call-btn" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "var(--ink)", color: "#fff",
            border: "none", borderRadius: 999, padding: "10px 16px",
            fontSize: 14, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap",
            boxShadow: "0 1px 0 rgba(255,255,255,.1) inset"
          }}>
            <Ic.Phone size={16} /> <span>(206) 420-1188</span>
          </button>
        </div>
      </div>
    </header>
  );
}

export function Progress({ step, total = 4, labels }: { step: number; total?: number; labels: string[] }) {
  const pct = Math.min(100, (step / total) * 100);
  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "22px 24px 6px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 10, gap: 16 }}>
        <span className="prog-label mono" style={{
          fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase", whiteSpace: "nowrap", flexShrink: 0
        }}>Step {String(step).padStart(2, "0")} / {String(total).padStart(2, "0")}</span>
        <span className="prog-steps" style={{ fontSize: 12, color: "var(--muted)", display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "flex-end" }}>
          {labels.map((l, i) => (
            <span key={i} style={{
              color: i + 1 === step ? "var(--ink)" : i + 1 < step ? "var(--primary-2)" : "var(--muted)",
              fontWeight: i + 1 === step ? 600 : 500, whiteSpace: "nowrap"
            }}>
              {i + 1 < step ? "✓ " : ""}{l}
            </span>
          ))}
        </span>
      </div>
      <div style={{ height: 6, background: "var(--line-2)", borderRadius: 999, overflow: "hidden", position: "relative" }}>
        <div style={{
          width: `${pct}%`, height: "100%",
          background: "linear-gradient(90deg, #1E6FA8, #0B3B5C)",
          borderRadius: 999, transition: "width .5s cubic-bezier(.2,.8,.2,1)"
        }} />
      </div>
    </div>
  );
}

export function TrustStrip() {
  const items = [
    { icon: <Ic.Shield size={18} />, text: "Licensed & insured", sub: "WA #RAINIP*812LK" },
    { icon: <Ic.Star size={16} />, text: "4.9 · 500+ reviews", sub: "Google · Yelp · Nextdoor" },
    { icon: <Ic.Pin size={18} />, text: "Serving Seattle since 2008", sub: "Puget Sound · Eastside" },
    { icon: <Ic.Clock size={18} />, text: "On-time or $25 off", sub: "Every appointment" },
  ];
  return (
    <footer style={{ borderTop: "1px solid var(--line)", background: "var(--surface-2)", marginTop: "auto" }}>
      <div className="trust-row" style={{
        maxWidth: 1180, margin: "0 auto", padding: "22px 24px",
        display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 18
      }}>
        {items.map((it, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10, display: "grid", placeItems: "center",
              background: "#fff", border: "1px solid var(--line)", color: "var(--primary)"
            }}>{it.icon}</div>
            <div>
              <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{it.text}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{it.sub}</div>
            </div>
          </div>
        ))}
      </div>
      <div style={{
        borderTop: "1px solid var(--line)",
        padding: "14px 24px", maxWidth: 1180, margin: "0 auto",
        display: "flex", justifyContent: "space-between", color: "var(--muted)", fontSize: 12
      }}>
        <span>© Rainier Plumbing LLC · Seattle, WA</span>
        <span>Privacy · Terms · Accessibility</span>
      </div>
    </footer>
  );
}

export function BackBtn({ onClick, children = "Back" }: { onClick: () => void; children?: ReactNode }) {
  return (
    <button onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", gap: 8,
      background: "transparent", border: "1px solid var(--line)",
      color: "var(--ink-2)", padding: "10px 14px", borderRadius: 999,
      fontWeight: 500, fontSize: 14, cursor: "pointer"
    }}>
      <Ic.ArrowLeft size={16} /> {children}
    </button>
  );
}

export function PrimaryBtn({
  onClick, children, disabled, tone = "primary", size = "lg"
}: {
  onClick?: () => void;
  children: ReactNode;
  disabled?: boolean;
  tone?: "primary" | "accent" | "dark";
  size?: "lg" | "sm";
}) {
  const [hovered, setHovered] = React.useState(false);
  const bg = tone === "accent" ? "var(--accent)" : tone === "dark" ? "var(--ink)" : "var(--primary)";
  const bgH = tone === "accent" ? "var(--accent-2)" : "#082C46";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
        background: disabled ? "#BFC8D1" : hovered ? bgH : bg,
        color: "#fff", border: "none", borderRadius: 999,
        padding: size === "lg" ? "15px 24px" : "11px 18px",
        fontSize: size === "lg" ? 15.5 : 14, fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        boxShadow: disabled ? "none" : "0 8px 18px -10px rgba(11,59,92,.55)",
        transition: "background .15s ease, transform .05s ease"
      }}
    >
      {children}
    </button>
  );
}
