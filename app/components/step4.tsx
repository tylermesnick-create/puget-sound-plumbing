"use client";

import React, { CSSProperties, ReactNode } from "react";
import * as Ic from "./icons";
import { BackBtn, PrimaryBtn } from "./shell";
import { SERVICES } from "./step2";
import { Slot } from "./step3";

export interface Contact {
  name: string;
  phone: string;
  address: string;
  notes: string;
}

const inputStyle: CSSProperties = {
  width: "100%", background: "#fff", border: "1.5px solid var(--line)",
  borderRadius: 12, padding: "13px 14px", fontSize: 15, color: "var(--ink)",
  outline: "none", fontFamily: "inherit", transition: "border-color .15s ease, box-shadow .15s ease"
};

function Field({ label, hint, children, required }: {
  label: string; hint?: string; children: ReactNode; required?: boolean;
}) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>
        {label}{required && <span style={{ color: "var(--accent)", marginLeft: 4 }}>*</span>}
        {hint && <span style={{ fontWeight: 400, color: "var(--muted)", marginLeft: 8 }}>{hint}</span>}
      </span>
      {children}
    </label>
  );
}

function Row({ icon, label, value }: { icon: ReactNode; label: string; value: ReactNode }) {
  return (
    <div style={{ display: "flex", gap: 12, alignItems: "flex-start", fontSize: 14 }}>
      <div style={{
        width: 28, height: 28, borderRadius: 8, background: "var(--surface-2)",
        display: "grid", placeItems: "center", color: "var(--primary)",
        border: "1px solid var(--line)", flexShrink: 0
      }}>{icon}</div>
      <div style={{ display: "flex", flexDirection: "column", flex: 1, minWidth: 0 }}>
        <span style={{ fontSize: 11.5, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</span>
        <span style={{ color: "var(--ink)", fontWeight: 500, marginTop: 2, overflow: "hidden", textOverflow: "ellipsis" }}>{value}</span>
      </div>
    </div>
  );
}

export function Step4({ intent, service, slot, contact, setContact, onBack, onConfirm }: {
  intent: string | null;
  service: string | null;
  slot: Slot;
  contact: Contact;
  setContact: React.Dispatch<React.SetStateAction<Contact>>;
  onBack: () => void;
  onConfirm: () => void;
}) {
  const svc = SERVICES.find((s) => s.id === service);
  const isEmergency = intent === "emergency";
  const [focus, setFocus] = React.useState<string | null>(null);
  const [locating, setLocating] = React.useState(false);
  const [agree, setAgree] = React.useState(true);

  const valid = contact.name.trim().length >= 2
    && contact.phone.replace(/\D/g, "").length >= 10
    && contact.address.trim().length >= 5;

  function fieldStyle(id: string): CSSProperties {
    return {
      ...inputStyle,
      borderColor: focus === id ? "var(--primary-2)" : "var(--line)",
      boxShadow: focus === id ? "0 0 0 4px rgba(30,111,168,.12)" : "none"
    };
  }

  function useLocation() {
    setLocating(true);
    setTimeout(() => {
      setContact((c) => ({ ...c, address: "1423 E Olive Way, Seattle, WA 98122" }));
      setLocating(false);
    }, 900);
  }

  const estimates: Record<string, [number, number]> = {
    drain: [149, 325], heater: [180, 350], leak: [149, 520], toilet: [119, 280],
    inspect: [99, 260], other: [120, 400]
  };
  const [lo, hi] = estimates[service ?? "other"] ?? [100, 300];
  const emergencySurcharge = isEmergency ? 75 : 0;
  const loTotal = lo + emergencySurcharge;
  const hiTotal = hi + emergencySurcharge;

  const d = new Date(slot.dateISO + "T12:00:00");
  const WD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const MO = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dateStr = `${WD[d.getDay()]}, ${MO[d.getMonth()]} ${d.getDate()}`;

  return (
    <div style={{ maxWidth: 1180, margin: "0 auto", padding: "18px 24px 40px" }}>
      <div style={{ margin: "14px 0 22px", maxWidth: 720 }}>
        <h1 style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.08, letterSpacing: "-0.02em" }}>
          Where should we come?
        </h1>
        <p style={{ fontSize: 16, color: "var(--ink-2)", marginTop: 8, lineHeight: 1.5 }}>
          One last step. We&apos;ll text you to confirm — and again when your plumber is on the way.
        </p>
      </div>

      <div className="confirm-wrap" style={{ display: "grid", gridTemplateColumns: "1fr 400px", gap: 20, alignItems: "flex-start" }}>
        {/* Form */}
        <div style={{
          background: "var(--surface)", border: "1px solid var(--line)",
          borderRadius: "var(--r-xl)", padding: 24, boxShadow: "var(--shadow-sm)",
          display: "flex", flexDirection: "column", gap: 18
        }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <Field label="Your name" required>
              <input
                value={contact.name}
                onChange={(e) => setContact((c) => ({ ...c, name: e.target.value }))}
                onFocus={() => setFocus("name")} onBlur={() => setFocus(null)}
                placeholder="e.g. Sarah Chen"
                style={fieldStyle("name")}
              />
            </Field>
            <Field label="Mobile phone" required hint="for confirmation text">
              <input
                value={contact.phone}
                onChange={(e) => setContact((c) => ({ ...c, phone: e.target.value }))}
                onFocus={() => setFocus("phone")} onBlur={() => setFocus(null)}
                placeholder="(206) 420-2299"
                inputMode="tel"
                style={fieldStyle("phone")}
              />
            </Field>
          </div>

          <Field label="Service address" required>
            <div style={{ position: "relative" }}>
              <input
                value={contact.address}
                onChange={(e) => setContact((c) => ({ ...c, address: e.target.value }))}
                onFocus={() => setFocus("addr")} onBlur={() => setFocus(null)}
                placeholder="Street, city, ZIP"
                style={{ ...fieldStyle("addr"), paddingRight: 140 }}
              />
              <button onClick={useLocation} type="button" disabled={locating} style={{
                position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                background: "var(--surface-2)", border: "1px solid var(--line)",
                borderRadius: 10, padding: "8px 12px", fontSize: 12.5, fontWeight: 600,
                color: "var(--primary)", cursor: locating ? "wait" : "pointer",
                display: "inline-flex", alignItems: "center", gap: 6
              }}>
                {locating ? (
                  <>
                    <span style={{
                      width: 12, height: 12, borderRadius: "50%",
                      border: "2px solid var(--primary-soft)", borderTopColor: "var(--primary)",
                      animation: "spin 0.8s linear infinite", display: "inline-block"
                    }} />
                    Locating
                  </>
                ) : (
                  <><Ic.Locate size={13} /> Use my location</>
                )}
              </button>
            </div>
          </Field>

          <Field label="Anything we should know?" hint="optional">
            <textarea
              value={contact.notes}
              onChange={(e) => setContact((c) => ({ ...c, notes: e.target.value }))}
              onFocus={() => setFocus("notes")} onBlur={() => setFocus(null)}
              placeholder="Dog in the yard, apartment gate code, which fixture is leaking…"
              style={{ ...fieldStyle("notes"), minHeight: 90, resize: "vertical", lineHeight: 1.5 }}
            />
          </Field>

          <div style={{ display: "flex", gap: 10, alignItems: "flex-start", paddingTop: 4 }}>
            <button type="button" onClick={() => setAgree(!agree)} style={{
              width: 20, height: 20, borderRadius: 6, flexShrink: 0,
              border: `1.5px solid ${agree ? "var(--primary-2)" : "var(--line)"}`,
              background: agree ? "var(--primary-2)" : "#fff",
              color: "#fff", display: "grid", placeItems: "center", cursor: "pointer", marginTop: 2
            }}>
              {agree && <Ic.Check size={12} stroke={3} />}
            </button>
            <div style={{ fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5 }}>
              Text me updates about this booking. Standard message rates may apply. We don&apos;t sell your info — ever.
            </div>
          </div>
        </div>

        {/* Summary card */}
        <aside style={{ position: "sticky", top: 100 }}>
          <div style={{
            background: "var(--surface)", border: "1px solid var(--line)",
            borderRadius: "var(--r-xl)", padding: 22, boxShadow: "var(--shadow-md)",
            display: "flex", flexDirection: "column", gap: 14
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span className="mono" style={{
                fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase"
              }}>Your booking</span>
              {isEmergency && (
                <span className="mono" style={{
                  fontSize: 10.5, letterSpacing: "0.14em", textTransform: "uppercase",
                  color: "var(--accent)", fontWeight: 600,
                  background: "var(--accent-soft)", padding: "4px 8px", borderRadius: 999
                }}>Emergency</span>
              )}
            </div>

            <div style={{
              display: "flex", gap: 12, alignItems: "center", paddingBottom: 14,
              borderBottom: "1px solid var(--line-2)"
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, background: "var(--primary-soft)",
                color: "var(--primary)", display: "grid", placeItems: "center"
              }}>{svc?.icon}</div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, fontFamily: "'Inter Tight', sans-serif" }}>{svc?.name}</div>
                <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{svc?.meta}</div>
              </div>
            </div>

            <Row icon={<Ic.Calendar size={16} />} label="Date" value={dateStr} />
            <Row icon={<Ic.Clock size={16} />} label="Window" value={slot.label} />
            <Row icon={<Ic.Pin size={16} />} label="Where"
              value={contact.address || <span style={{ color: "var(--muted)" }}>Enter address</span>} />
            <Row icon={<Ic.Phone size={16} />} label="Contact"
              value={contact.name
                ? `${contact.name}${contact.phone ? ` · ${contact.phone}` : ""}`
                : <span style={{ color: "var(--muted)" }}>Enter name & phone</span>} />

            <div style={{
              marginTop: 4, padding: "14px 0 0", borderTop: "1px dashed var(--line)",
              display: "flex", justifyContent: "space-between", alignItems: "flex-end"
            }}>
              <div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>Estimated range</div>
                <div style={{
                  fontFamily: "'Inter Tight', sans-serif", fontSize: 24, fontWeight: 700,
                  letterSpacing: "-0.02em", marginTop: 2
                }}>
                  ${loTotal}<span style={{ color: "var(--muted)", fontWeight: 500 }}> – </span>${hiTotal}
                </div>
              </div>
              <div style={{ fontSize: 11.5, color: "var(--muted)", textAlign: "right", lineHeight: 1.4 }}>
                Confirmed on-site<br />before any work starts
              </div>
            </div>

            <PrimaryBtn onClick={onConfirm} tone={isEmergency ? "accent" : "primary"} disabled={!valid || !agree}>
              {isEmergency ? "Dispatch now" : "Confirm booking"} <Ic.ArrowRight size={16} />
            </PrimaryBtn>

            <div style={{ fontSize: 11.5, color: "var(--muted)", textAlign: "center", lineHeight: 1.5 }}>
              Free to cancel up to 2 hours before. No card on file — pay after the work is done.
            </div>
          </div>
        </aside>
      </div>

      <div style={{ marginTop: 28, display: "flex", justifyContent: "flex-start" }}>
        <BackBtn onClick={onBack} />
      </div>
    </div>
  );
}

export function Success({ intent, service, slot, contact, onReset }: {
  intent: string | null;
  service: string | null;
  slot: Slot;
  contact: Contact;
  onReset: () => void;
}) {
  const svc = SERVICES.find((s) => s.id === service);
  const isEmergency = intent === "emergency";
  const d = new Date(slot.dateISO + "T12:00:00");
  const WD = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const MO = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const dateStr = `${WD[d.getDay()]}, ${MO[d.getMonth()]} ${d.getDate()}`;
  const bookingId = "RNR-" + Math.random().toString(36).slice(2, 6).toUpperCase() + "-" + (Math.floor(Math.random() * 900) + 100);

  return (
    <div style={{ maxWidth: 720, margin: "60px auto 40px", padding: "0 24px" }}>
      <div style={{
        background: "var(--surface)", border: "1px solid var(--line)",
        borderRadius: "var(--r-xl)", padding: "40px 36px", boxShadow: "var(--shadow-lg)",
        textAlign: "center", position: "relative", overflow: "hidden"
      }}>
        <div aria-hidden style={{
          position: "absolute", inset: "-40% -40% auto auto", width: 320, height: 320, borderRadius: "50%",
          background: isEmergency
            ? "radial-gradient(circle, rgba(214,74,43,.14), transparent 70%)"
            : "radial-gradient(circle, rgba(30,111,168,.14), transparent 70%)"
        }} />

        <div style={{
          width: 72, height: 72, borderRadius: "50%", background: "var(--primary-soft)",
          display: "grid", placeItems: "center", margin: "0 auto 18px",
          color: "var(--primary)", position: "relative",
          animation: "pop .5s cubic-bezier(.2,1.3,.4,1)"
        }}>
          <Ic.CheckCircle size={40} stroke={2} />
        </div>

        <h1 style={{ fontSize: 32, fontWeight: 700, letterSpacing: "-0.02em", animation: "slidein .5s .1s backwards" }}>
          You&apos;re booked.
        </h1>
        <p style={{ fontSize: 16, color: "var(--ink-2)", marginTop: 8, lineHeight: 1.5, animation: "slidein .5s .2s backwards" }}>
          {isEmergency
            ? "Dispatch received. We'll text you the plumber's ETA within 5 minutes."
            : `We'll text you a confirmation shortly to ${contact.phone}.`}
        </p>

        <div style={{
          marginTop: 26, padding: 18,
          background: "var(--surface-2)", border: "1px solid var(--line)",
          borderRadius: "var(--r-l)", textAlign: "left", position: "relative",
          animation: "slidein .5s .3s backwards"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span className="mono" style={{ fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase" }}>
              Booking · {bookingId}
            </span>
            <span style={{ fontSize: 12, color: "var(--primary)", fontWeight: 600 }}>Confirmed</span>
          </div>
          <div style={{
            fontFamily: "'Inter Tight', sans-serif", fontSize: 18, fontWeight: 600, color: "var(--ink)", lineHeight: 1.4
          }}>
            Rainier Plumbing — {svc?.name}<br />
            <span style={{ color: "var(--ink-2)", fontWeight: 500 }}>{dateStr} · {slot.label}</span>
          </div>
          <div style={{
            marginTop: 12, paddingTop: 12, borderTop: "1px dashed var(--line)",
            fontSize: 13, color: "var(--ink-2)", lineHeight: 1.5
          }}>
            {contact.address}<br />
            For {contact.name} · {contact.phone}
          </div>
        </div>

        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10, animation: "slidein .5s .4s backwards" }}>
          <Steplet num="1" text="Confirmation text sent to your phone (check it now)" />
          <Steplet num="2" text={isEmergency ? "Dispatcher calls within 5 min to confirm address" : "Reminder text the day before, with your plumber's photo"} />
          <Steplet num="3" text="Live truck tracking 30 min before arrival" />
        </div>

        <div style={{
          marginTop: 24, display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap",
          animation: "slidein .5s .5s backwards"
        }}>
          <button onClick={onReset} style={{
            background: "transparent", border: "1px solid var(--line)",
            borderRadius: 999, padding: "11px 18px", fontSize: 14, fontWeight: 500,
            color: "var(--ink-2)", cursor: "pointer"
          }}>Book another visit</button>
          <a href="tel:+12064201188" style={{
            background: "var(--ink)", color: "#fff", textDecoration: "none",
            borderRadius: 999, padding: "11px 18px", fontSize: 14, fontWeight: 600,
            display: "inline-flex", alignItems: "center", gap: 8
          }}>
            <Ic.Phone size={14} /> Call dispatch
          </a>
        </div>
      </div>
    </div>
  );
}

function Steplet({ num, text }: { num: string; text: string }) {
  return (
    <div style={{
      display: "flex", gap: 12, alignItems: "center", fontSize: 13.5, color: "var(--ink-2)",
      textAlign: "left", padding: "10px 12px", background: "#fff",
      border: "1px solid var(--line)", borderRadius: 12
    }}>
      <span style={{
        width: 22, height: 22, borderRadius: "50%", background: "var(--primary)",
        color: "#fff", fontSize: 12, fontWeight: 700, display: "grid", placeItems: "center", flexShrink: 0
      }}>{num}</span>
      <span>{text}</span>
    </div>
  );
}
