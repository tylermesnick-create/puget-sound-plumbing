"use client";

import React from "react";
import * as Ic from "./icons";
import { BackBtn, PrimaryBtn } from "./shell";

export interface Slot {
  dateISO: string;
  slotId: string;
  label: string;
}

interface SlotDef {
  id: string;
  label: string;
  available: boolean;
  few: boolean;
}

function slotsFor(dateISO: string): SlotDef[] {
  const d = new Date(dateISO);
  const day = d.getDay();
  const dayNum = d.getDate();
  const windows = [
    { id: "0810", label: "8:00 – 10:00 am" },
    { id: "1012", label: "10:00 am – 12:00 pm" },
    { id: "1214", label: "12:00 – 2:00 pm" },
    { id: "1416", label: "2:00 – 4:00 pm" },
    { id: "1618", label: "4:00 – 6:00 pm" },
    { id: "1820", label: "6:00 – 8:00 pm" },
  ];
  return windows.map((w, i) => {
    let available = true;
    const seed = (dayNum * 7 + i * 13 + day * 5) % 11;
    if (day === 0) available = i <= 1;
    else if (day === 6) available = i <= 3 && seed !== 3;
    else available = seed !== 0 && seed !== 4;
    const few = available && seed === 2;
    return { ...w, available, few };
  });
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const DOW = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function Step3({ intent, service: _service, selectedSlot, onSelectSlot, onNext, onBack }: {
  intent: string | null;
  service: string | null;
  selectedSlot: Slot | null;
  onSelectSlot: (slot: Slot) => void;
  onNext: () => void;
  onBack: () => void;
}) {
  const today = React.useMemo(() => {
    const t = new Date(); t.setHours(0, 0, 0, 0); return t;
  }, []);

  const days = React.useMemo(() =>
    Array.from({ length: 7 }, (_, i) => {
      const d = new Date(today); d.setDate(today.getDate() + i); return d;
    }), [today]);

  const [selectedDate, setSelectedDate] = React.useState(() => {
    if (selectedSlot?.dateISO) return selectedSlot.dateISO;
    const i = intent === "emergency" ? 0 : 1;
    return days[i].toISOString().slice(0, 10);
  });

  const slots = slotsFor(selectedDate);
  const isEmergency = intent === "emergency";

  function fmtDate(d: Date) {
    return `${DOW[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`;
  }

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "18px 24px 40px" }}>
      <div style={{ margin: "14px 0 22px", maxWidth: 720 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
          {isEmergency ? "We can be there fast." : "Pick a window that works."}
        </h1>
        <p style={{ fontSize: 16, color: "var(--ink-2)", marginTop: 8, lineHeight: 1.5 }}>
          Two-hour arrival windows. You&apos;ll get a text when your plumber is 30 minutes out —
          no waiting around all day.
        </p>
      </div>

      <div className="sched-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 20, alignItems: "flex-start" }}>
        {/* Left: calendar + slots */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--line)",
          borderRadius: "var(--r-xl)", padding: 20, boxShadow: "var(--shadow-sm)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div>
              <div className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase" }}>
                Next 7 days · {MONTHS[today.getMonth()]} {today.getFullYear()}
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)", marginTop: 4 }}>
                Showing availability in Seattle, WA
              </div>
            </div>
            <div style={{ display: "flex", gap: 14, fontSize: 12, color: "var(--muted)" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--primary-2)" }} /> Selected
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#D7D0C3" }} /> Unavailable
              </span>
            </div>
          </div>

          <div className="day-strip" style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 8, marginBottom: 20 }}>
            {days.map((d, i) => {
              const iso = d.toISOString().slice(0, 10);
              const isSel = selectedDate === iso;
              const isToday = i === 0;
              const daySlots = slotsFor(iso);
              const avail = daySlots.filter(s => s.available).length;
              const disabled = avail === 0;
              return (
                <button key={iso}
                  disabled={disabled}
                  onClick={() => setSelectedDate(iso)}
                  style={{
                    cursor: disabled ? "not-allowed" : "pointer",
                    background: isSel ? "var(--primary)" : disabled ? "var(--surface-2)" : "#fff",
                    color: isSel ? "#fff" : disabled ? "var(--muted)" : "var(--ink)",
                    border: `1.5px solid ${isSel ? "var(--primary)" : "var(--line)"}`,
                    borderRadius: "var(--r-m)",
                    padding: "12px 8px 10px",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                    transition: "all .15s ease",
                    position: "relative"
                  }}>
                  <span style={{
                    fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: isSel ? "rgba(255,255,255,.75)" : "var(--muted)", fontWeight: 500
                  }}>{DOW[d.getDay()]}</span>
                  <span style={{
                    fontFamily: "'Inter Tight', sans-serif", fontSize: 22, fontWeight: 600, lineHeight: 1, marginTop: 2
                  }}>{d.getDate()}</span>
                  <span style={{
                    fontSize: 10.5,
                    color: isSel ? "rgba(255,255,255,.75)" : disabled ? "var(--muted)" : "var(--primary-2)",
                    marginTop: 3, fontWeight: 500
                  }}>
                    {disabled ? "full" : `${avail} open`}
                  </span>
                  {isToday && !isSel && (
                    <span style={{
                      position: "absolute", top: 6, right: 6,
                      width: 6, height: 6, borderRadius: "50%", background: "var(--accent)"
                    }} />
                  )}
                </button>
              );
            })}
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
            <div style={{ fontSize: 15, fontWeight: 600, color: "var(--ink)" }}>
              {fmtDate(new Date(selectedDate + "T12:00:00"))}
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>Arrival window · on-time or $25 off</div>
          </div>

          <div className="slot-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10 }}>
            {slots.map((s) => {
              const isSel = selectedSlot?.slotId === s.id && selectedSlot?.dateISO === selectedDate;
              return (
                <button key={s.id}
                  disabled={!s.available}
                  onClick={() => onSelectSlot({ dateISO: selectedDate, slotId: s.id, label: s.label })}
                  style={{
                    cursor: s.available ? "pointer" : "not-allowed",
                    background: isSel ? "var(--primary)" : s.available ? "#fff" : "var(--surface-2)",
                    color: isSel ? "#fff" : s.available ? "var(--ink)" : "var(--muted)",
                    border: `1.5px solid ${isSel ? "var(--primary)" : "var(--line)"}`,
                    borderRadius: "var(--r-m)",
                    padding: "14px 16px",
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    gap: 10, fontSize: 14.5, fontWeight: 500,
                    textDecoration: !s.available ? "line-through" : "none",
                    textDecorationColor: "rgba(107,120,133,.4)",
                    transition: "all .15s ease",
                    position: "relative"
                  }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                    <Ic.Clock size={16} /> {s.label}
                  </span>
                  {s.few && s.available && !isSel && (
                    <span style={{
                      fontSize: 10.5, letterSpacing: "0.08em", textTransform: "uppercase",
                      color: "var(--accent)", fontWeight: 600,
                      background: "var(--accent-soft)", padding: "3px 7px", borderRadius: 999
                    }}>1 left</span>
                  )}
                  {isSel && <Ic.Check size={16} stroke={3} />}
                </button>
              );
            })}
          </div>

          <div style={{
            marginTop: 16, padding: "12px 14px",
            background: "var(--surface-2)", border: "1px dashed var(--line)",
            borderRadius: "var(--r-m)", fontSize: 13, color: "var(--ink-2)",
            display: "flex", gap: 10, alignItems: "center"
          }}>
            <Ic.Pin size={16} />
            Need a different day or a weekend evening?{" "}
            <a href="#" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none" }}>
              Request a custom time
            </a>
          </div>
        </div>

        {/* Right: plumber card */}
        <aside style={{
          background: "var(--surface)", border: "1px solid var(--line)",
          borderRadius: "var(--r-xl)", padding: 20, boxShadow: "var(--shadow-sm)"
        }}>
          <div className="mono" style={{
            fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase", marginBottom: 10
          }}>Likely your plumber</div>

          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14 }}>
            <div style={{
              width: 56, height: 56, borderRadius: "50%",
              background: "linear-gradient(135deg, #1E6FA8, #0B3B5C)",
              color: "#fff", display: "grid", placeItems: "center",
              fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 20
            }}>MT</div>
            <div>
              <div style={{ fontSize: 16, fontWeight: 600 }}>Marcus T.</div>
              <div style={{ fontSize: 12.5, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ color: "var(--accent)", display: "inline-flex" }}><Ic.Star size={12} /></span>
                4.9 · 212 jobs · 11 yrs
              </div>
            </div>
          </div>

          <div style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.5 }}>
            &quot;Certified on tankless and gas. I keep the work area cleaner than I found it —
            shoe covers on, drop cloths down, no surprises.&quot;
          </div>

          <div style={{
            marginTop: 16, paddingTop: 14, borderTop: "1px solid var(--line)",
            display: "flex", flexDirection: "column", gap: 10
          }}>
            {[
              ["Service area", "Seattle · Bellevue · Shoreline"],
              ["Truck stock", "92% parts on board"],
              ["Languages", "English, Español"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                <span style={{ color: "var(--muted)" }}>{label}</span>
                <span style={{ color: "var(--ink)" }}>{value}</span>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 16, padding: "12px 14px", background: "var(--primary-soft)",
            borderRadius: "var(--r-m)", fontSize: 12.5, color: "var(--ink-2)", lineHeight: 1.5
          }}>
            Final assignment depends on who's closest at dispatch — we'll text your plumber's
            photo and truck number the morning of.
          </div>
        </aside>
      </div>

      <div style={{ marginTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <BackBtn onClick={onBack} />
        <PrimaryBtn onClick={onNext} disabled={!selectedSlot} tone={isEmergency ? "accent" : "primary"}>
          Continue to contact info <Ic.ArrowRight size={16} />
        </PrimaryBtn>
      </div>
    </div>
  );
}
