"use client";

import React, { ReactNode } from "react";
import * as Ic from "./icons";

export function Step1({ onPick }: { onPick: (id: string) => void }) {
  const [hover, setHover] = React.useState<string | null>(null);

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "18px 24px 40px" }}>
      <div style={{ margin: "14px 0 26px", maxWidth: 720 }}>
        <h1 style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          What brings you in today?
        </h1>
        <p style={{ fontSize: 16.5, color: "var(--ink-2)", marginTop: 10, lineHeight: 1.5 }}>
          Tell us whether this is urgent or something you'd like to schedule.
          A licensed plumber will handle your job from start to finish — no middlemen.
        </p>
      </div>

      <div className="split-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <IntentCard
          id="emergency"
          tone="accent"
          eyebrow="Under 2 hr response"
          title={<>I have an<br />emergency.</>}
          sub="Burst pipe, flooding, no hot water, sewer backup — call it in and we'll dispatch the nearest truck."
          bullets={[
            "Live dispatcher answers 24/7",
            "Flat-rate emergency fee, quoted upfront",
            "Shut-off help over the phone while we drive",
          ]}
          icon={<Ic.Alert size={28} stroke={2} />}
          cta="Start emergency booking"
          hover={hover === "emergency"}
          onMouseEnter={() => setHover("emergency")}
          onMouseLeave={() => setHover(null)}
          onClick={() => onPick("emergency")}
        />
        <IntentCard
          id="schedule"
          tone="primary"
          eyebrow="Same-week openings"
          title={<>Schedule routine<br />service.</>}
          sub="Inspections, installations, and repairs booked for a window that works — evenings and Saturdays available."
          bullets={[
            "Up-front pricing before any wrench turns",
            "Two-hour arrival windows, not all-day",
            "Text updates when your plumber is 30 minutes out",
          ]}
          icon={<Ic.Calendar size={28} stroke={2} />}
          cta="Pick a service"
          hover={hover === "schedule"}
          onMouseEnter={() => setHover("schedule")}
          onMouseLeave={() => setHover(null)}
          onClick={() => onPick("schedule")}
        />
      </div>

      <div style={{
        marginTop: 22, padding: "16px 18px", borderRadius: "var(--r-l)",
        background: "var(--surface)", border: "1px solid var(--line)",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: "var(--surface-2)",
            display: "grid", placeItems: "center", color: "var(--primary)", border: "1px solid var(--line)"
          }}><Ic.Phone size={16} /></div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Rather just talk to someone?</div>
            <div style={{ fontSize: 13, color: "var(--muted)" }}>Hannah is on dispatch — average pickup 14 seconds.</div>
          </div>
        </div>
        <a href="tel:+12064201188" style={{
          color: "var(--primary)", fontWeight: 600, fontSize: 14, textDecoration: "none",
          display: "inline-flex", alignItems: "center", gap: 6
        }}>(206) 420-1188 <Ic.ArrowRight size={14} /></a>
      </div>
    </div>
  );
}

function IntentCard({ id, tone, eyebrow, title, sub, bullets, icon, cta, hover, onMouseEnter, onMouseLeave, onClick }: {
  id: string;
  tone: "accent" | "primary";
  eyebrow: string;
  title: ReactNode;
  sub: string;
  bullets: string[];
  icon: ReactNode;
  cta: string;
  hover: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick: () => void;
}) {
  const isEmergency = tone === "accent";
  const accent = isEmergency ? "var(--accent)" : "var(--primary-2)";
  const accentSoft = isEmergency ? "var(--accent-soft)" : "var(--primary-soft)";

  return (
    <button
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      style={{
        textAlign: "left", cursor: "pointer",
        background: "var(--surface)",
        border: `1.5px solid ${hover ? accent : "var(--line)"}`,
        borderRadius: "var(--r-xl)",
        padding: "28px 28px 24px",
        display: "flex", flexDirection: "column", gap: 18,
        boxShadow: hover ? "var(--shadow-lg)" : "var(--shadow-sm)",
        transform: hover ? "translateY(-2px)" : "translateY(0)",
        transition: "transform .25s ease, box-shadow .25s ease, border-color .2s ease",
        position: "relative", overflow: "hidden",
        minHeight: 360, width: "100%"
      }}>
      {isEmergency && (
        <span aria-hidden style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: hover
            ? "radial-gradient(600px 200px at 80% 0%, rgba(214,74,43,.10), transparent 70%)"
            : "radial-gradient(600px 200px at 80% 0%, rgba(214,74,43,.05), transparent 70%)"
        }} />
      )}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative" }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, background: accentSoft, color: accent,
          display: "grid", placeItems: "center"
        }}>{icon}</div>
        <span className="mono" style={{
          fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
          color: accent, fontWeight: 600,
          background: "transparent", padding: "6px 10px",
          border: `1px solid ${isEmergency ? "rgba(214,74,43,.25)" : "rgba(30,111,168,.25)"}`,
          borderRadius: 999
        }}>{eyebrow}</span>
      </div>

      <div style={{ position: "relative" }}>
        <h2 style={{ fontSize: 30, fontWeight: 700, lineHeight: 1.08, color: "var(--ink)" }}>{title}</h2>
        <p style={{ marginTop: 10, fontSize: 15.5, lineHeight: 1.5, color: "var(--ink-2)", maxWidth: 440 }}>{sub}</p>
      </div>

      <ul style={{ listStyle: "none", padding: 0, margin: "4px 0 0", display: "flex", flexDirection: "column", gap: 8, position: "relative" }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, color: "var(--ink-2)" }}>
            <span style={{
              width: 18, height: 18, borderRadius: "50%", display: "grid", placeItems: "center",
              background: accentSoft, color: accent
            }}><Ic.Check size={12} stroke={2.5} /></span>
            {b}
          </li>
        ))}
      </ul>

      <div style={{ flex: 1 }} />

      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        paddingTop: 14, borderTop: "1px dashed var(--line)", position: "relative"
      }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: accent }}>{cta}</span>
        <span style={{
          width: 40, height: 40, borderRadius: "50%", background: accent,
          color: "#fff", display: "grid", placeItems: "center",
          transform: hover ? "translateX(4px)" : "translateX(0)",
          transition: "transform .25s ease"
        }}><Ic.ArrowRight size={16} stroke={2.25} /></span>
      </div>
    </button>
  );
}
