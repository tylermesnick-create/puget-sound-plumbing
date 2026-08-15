"use client";

import React, { ReactNode } from "react";
import * as Ic from "./icons";
import { BackBtn, PrimaryBtn } from "./shell";

export interface Service {
  id: string;
  name: string;
  icon: ReactNode;
  price: string;
  meta: string;
  time: string;
}

export const SERVICES: Service[] = [
  { id: "drain", name: "Drain clog", icon: <Ic.Wrench size={26} />, price: "129", meta: "Kitchen, bath, main line", time: "45–90 min" },
  { id: "heater", name: "Water heater", icon: <Ic.Flame size={26} />, price: "180", meta: "Repair or replacement", time: "1–4 hr" },
  { id: "leak", name: "Leak repair", icon: <Ic.Drop size={26} />, price: "149", meta: "Slab, wall, or fixture leak", time: "1–3 hr" },
  { id: "toilet", name: "Toilet repair", icon: <Ic.Toilet size={26} />, price: "119", meta: "Running, clogged, or leaking", time: "30–60 min" },
  { id: "inspect", name: "Pipe inspection", icon: <Ic.Search size={26} />, price: "99", meta: "Camera scope & report", time: "60 min" },
  { id: "other", name: "Something else", icon: <Ic.Dots size={26} />, price: "—", meta: "Describe it at checkout", time: "Quoted after call" },
];

export function Step2({ intent, selected, onSelect, onNext, onBack }: {
  intent: string | null;
  selected: string | null;
  onSelect: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const [hover, setHover] = React.useState<string | null>(null);
  const isEmergency = intent === "emergency";

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "18px 24px 40px" }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 14,
        margin: "14px 0 22px", flexWrap: "wrap"
      }}>
        <div style={{ maxWidth: 720 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            {isEmergency ? (
              <span className="mono" style={{
                fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--accent)", fontWeight: 600,
                background: "var(--accent-soft)", padding: "6px 10px", borderRadius: 0,
                display: "inline-flex", alignItems: "center", gap: 6
              }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%", background: "var(--accent)",
                  animation: "pulse 1.4s ease-in-out infinite"
                }} />
                Emergency path
              </span>
            ) : (
              <span className="mono" style={{
                fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                color: "var(--primary-2)", fontWeight: 600,
                background: "var(--primary-soft)", padding: "6px 10px", borderRadius: 0
              }}>Scheduled visit</span>
            )}
          </div>
          <h1 style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
            {isEmergency ? "What's going wrong?" : "What can we help with?"}
          </h1>
          <p style={{ fontSize: 16, color: "var(--ink-2)", marginTop: 8, lineHeight: 1.5 }}>
            Pick the closest match — we&apos;ll confirm the exact scope with you by phone before dispatch.
          </p>
        </div>
      </div>

      <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
        {SERVICES.map((s) => {
          const isSelected = selected === s.id;
          const isHover = hover === s.id;
          return (
            <button key={s.id}
              onMouseEnter={() => setHover(s.id)}
              onMouseLeave={() => setHover(null)}
              onClick={() => onSelect(s.id)}
              style={{
                textAlign: "left", cursor: "pointer",
                background: isSelected ? "linear-gradient(180deg, #F0F6FB, #fff)" : "var(--surface)",
                border: `1.5px solid ${isSelected ? "var(--primary-2)" : "var(--line)"}`,
                borderRadius: "var(--r-l)",
                padding: "20px",
                position: "relative",
                boxShadow: isSelected ? "0 0 0 3px rgba(30,111,168,.10), var(--shadow-md)" : isHover ? "var(--shadow-md)" : "var(--shadow-sm)",
                transform: isHover && !isSelected ? "translateY(-1px)" : "translateY(0)",
                transition: "all .18s ease",
                display: "flex", flexDirection: "column", gap: 14, minHeight: 168
              }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 0,
                  background: isSelected ? "var(--primary)" : "var(--surface-2)",
                  color: isSelected ? "#fff" : "var(--primary)",
                  display: "grid", placeItems: "center",
                  border: isSelected ? "none" : "1px solid var(--line)",
                  transition: "all .18s ease"
                }}>{s.icon}</div>
                <span style={{
                  width: 24, height: 24, borderRadius: "50%",
                  border: `1.5px solid ${isSelected ? "var(--primary-2)" : "var(--line)"}`,
                  background: isSelected ? "var(--primary-2)" : "#fff",
                  color: "#fff", display: "grid", placeItems: "center",
                  transition: "all .18s ease"
                }}>
                  {isSelected && <Ic.Check size={14} stroke={3} />}
                </span>
              </div>

              <div>
                <div style={{
                  fontFamily: "'Inter Tight', sans-serif", fontSize: 19, fontWeight: 600,
                  letterSpacing: "-0.01em", color: "var(--ink)"
                }}>{s.name}</div>
                <div style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 3 }}>{s.meta}</div>
              </div>

              <div style={{ flex: 1 }} />

              <div style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                paddingTop: 12, borderTop: "1px dashed var(--line-2)"
              }}>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>
                  <span className="mono" style={{ color: "var(--ink-2)" }}>{s.time}</span>
                </div>
                <div style={{ fontSize: 13, color: "var(--ink)", fontWeight: 500 }}>
                  {s.price === "—"
                    ? <span style={{ color: "var(--muted)" }}>Custom quote</span>
                    : <>starts at <span style={{ fontWeight: 700 }}>${s.price}</span></>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {isEmergency && (
        <div style={{
          marginTop: 18, padding: "14px 16px",
          background: "var(--accent-soft)", border: "1px solid rgba(214,74,43,.22)",
          borderRadius: "var(--r-m)", display: "flex", gap: 12, alignItems: "flex-start"
        }}>
          <div style={{ color: "var(--accent)", marginTop: 2 }}><Ic.Alert size={20} /></div>
          <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.45 }}>
            <strong style={{ color: "var(--ink)" }}>Water still running?</strong> Shut off the main valve (usually
            near the water heater or where the supply enters the house). Text us a photo at
            <span className="mono" style={{ color: "var(--accent)" }}> (206) 420-1188</span> and we'll walk you through it.
          </div>
        </div>
      )}

      <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <BackBtn onClick={onBack} />
        <PrimaryBtn onClick={onNext} disabled={!selected} tone={isEmergency ? "accent" : "primary"}>
          Continue <Ic.ArrowRight size={16} />
        </PrimaryBtn>
      </div>
    </div>
  );
}
