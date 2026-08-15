"use client";

import React, { ReactNode } from "react";
import * as Ic from "./icons";

/* ───────────────────────────  HERO  ─────────────────────────── */

export function Hero({ onBook, onCall }: { onBook: () => void; onCall: () => void }) {
  return (
    <section style={{ position: "relative", background: "#10151B", color: "#fff", overflow: "hidden" }}>
      {/* steel top hairline */}
      <div style={{ height: 3, background: "linear-gradient(90deg, #2F6FB0, #4C8DCB 60%, transparent)" }} />

      <div className="split-grid" style={{
        maxWidth: 1180, margin: "0 auto",
        display: "grid", gridTemplateColumns: "1.05fr .95fr", gap: 0, alignItems: "stretch"
      }}>
        {/* LEFT — copy */}
        <div style={{ padding: "72px 40px 72px 24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div className="mono" style={{
            fontSize: 11.5, letterSpacing: "0.18em", textTransform: "uppercase",
            color: "#8FB4D6", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap"
          }}>
            <span style={{ width: 7, height: 7, background: "#4C8DCB" }} />
            Licensed · Bonded · Insured — Seattle since 2008
          </div>

          <h1 style={{
            fontFamily: "'Fraunces', Georgia, serif", fontWeight: 600,
            fontVariationSettings: "'SOFT' 0, 'WONK' 0",
            fontSize: "clamp(34px, 3.5vw, 45px)", lineHeight: 1.02,
            letterSpacing: "-0.035em", margin: "22px 0 0"
          }}>
            Plumbing done right.<br />
            <span style={{ color: "#4C8DCB" }}>The first time.</span>
          </h1>

          <p style={{ fontSize: 17, lineHeight: 1.6, color: "rgba(255,255,255,.72)", margin: "20px 0 0", maxWidth: 480 }}>
            Two-hour arrival windows, flat-rate pricing you approve before we start,
            and workmanship guaranteed in writing. No surprises, no runaround.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 30 }}>
            <button onClick={onBook} style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              background: "#2F6FB0", color: "#fff", border: "none",
              borderRadius: 0, padding: "15px 24px", fontSize: 15.5, fontWeight: 600, cursor: "pointer"
            }}>
              Book a plumber <Ic.ArrowRight size={16} stroke={2.25} />
            </button>
            <a href="tel:+12064201188" onClick={onCall} style={{
              display: "inline-flex", alignItems: "center", gap: 9,
              background: "transparent", color: "#fff",
              border: "1.5px solid rgba(255,255,255,.25)",
              borderRadius: 0, padding: "15px 22px", fontSize: 15.5, fontWeight: 600, textDecoration: "none"
            }}>
              <Ic.Phone size={16} /> (206) 420-1188
            </a>
          </div>

          <div style={{
            display: "flex", gap: 26, flexWrap: "wrap", marginTop: 32,
            paddingTop: 26, borderTop: "1px solid rgba(255,255,255,.1)"
          }}>
            <TrustBit icon={<Ic.Star size={15} />} main="4.9 / 5" sub="500+ reviews" />
            <TrustBit icon={<Ic.Shield size={16} />} main="Licensed & insured" sub="WA #RAINIPL123CC" />
            <TrustBit icon={<Ic.Clock size={16} />} main="On-time or $25 off" sub="Every visit" />
          </div>
        </div>

        {/* RIGHT — photo */}
        <div style={{ position: "relative", minHeight: 440 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/work-pipes-install.jpg" alt="Rainier plumber fitting new supply lines"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, #10151B 0%, rgba(16,21,27,.35) 22%, rgba(16,21,27,0) 55%)"
          }} />
          {/* response stat */}
          <div style={{
            position: "absolute", left: 22, bottom: 22,
            background: "rgba(16,21,27,.82)", border: "1px solid rgba(255,255,255,.14)",
            backdropFilter: "blur(6px)", borderRadius: 0, padding: "12px 16px",
            display: "flex", alignItems: "center", gap: 12
          }}>
            <span style={{ width: 40, height: 40, borderRadius: 0, background: "#2F6FB0", display: "grid", placeItems: "center" }}>
              <Ic.Clock size={20} />
            </span>
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ fontFamily: "'Inter Tight'", fontSize: 20, fontWeight: 700 }}>22 min</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>avg. emergency response</div>
            </div>
          </div>
        </div>
      </div>

      {/* BOOKING BAR — quick actions */}
      <BookingBar onBook={onBook} />
    </section>
  );
}

function TrustBit({ icon, main, sub }: { icon: ReactNode; main: string; sub: string }) {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <span style={{ width: 32, height: 32, borderRadius: 0, display: "grid", placeItems: "center", background: "rgba(255,255,255,.08)", color: "#8FB4D6", flexShrink: 0 }}>{icon}</span>
      <div style={{ lineHeight: 1.25 }}>
        <div style={{ fontSize: 13.5, fontWeight: 600 }}>{main}</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,.5)" }}>{sub}</div>
      </div>
    </div>
  );
}

function BookingBar({ onBook }: { onBook: () => void }) {
  const slots = [
    { day: "Today", time: "2:00–4:00 PM" },
    { day: "Today", time: "4:30–6:30 PM" },
    { day: "Tomorrow", time: "8:00–10:00 AM" },
    { day: "Tomorrow", time: "11:00–1:00 PM" },
  ];
  return (
    <div style={{ background: "#1D2733", borderTop: "1px solid rgba(255,255,255,.08)" }}>
      <div className="booking-bar" style={{
        maxWidth: 1180, margin: "0 auto", padding: "18px 24px",
        display: "flex", alignItems: "center", gap: 18, flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#fff", flexShrink: 0 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#3FBF7F", boxShadow: "0 0 0 3px rgba(63,191,127,.22)" }} />
          <span style={{ fontSize: 14, fontWeight: 600 }}>Same-day availability</span>
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", flex: 1 }}>
          {slots.map((s, i) => (
            <button key={i} onClick={onBook} style={{
              display: "flex", flexDirection: "column", alignItems: "flex-start",
              background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)",
              borderRadius: 0, padding: "8px 14px", cursor: "pointer", color: "#fff"
            }}>
              <span className="mono" style={{ fontSize: 9.5, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,.5)" }}>{s.day}</span>
              <span style={{ fontSize: 13.5, fontWeight: 600 }}>{s.time}</span>
            </button>
          ))}
        </div>
        <button onClick={onBook} style={{
          display: "inline-flex", alignItems: "center", gap: 8, flexShrink: 0,
          background: "#fff", color: "#10151B", border: "none",
          borderRadius: 0, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer"
        }}>
          Book now <Ic.ArrowRight size={15} stroke={2.25} />
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────  SERVICES  ───────────────────────── */

interface Service { icon: ReactNode; title: string; desc: string; price: string; }

const SERVICES: Service[] = [
  { icon: <Ic.Alert size={22} />, title: "Emergency & burst pipes", desc: "24/7 response with shut-off help over the phone while we drive.", price: "2-hr arrival" },
  { icon: <Ic.Flame size={22} />, title: "Water heaters", desc: "Repair, replacement, and tankless upgrades — same-day when we can.", price: "From $1,200" },
  { icon: <Ic.Drop size={22} />, title: "Drain cleaning", desc: "Hydro-jetting and snaking for kitchen, bath, and main lines.", price: "From $149" },
  { icon: <Ic.Search size={22} />, title: "Leak detection", desc: "We find hidden leaks fast and fix them before they cost you.", price: "From $180" },
  { icon: <Ic.Toilet size={22} />, title: "Toilets & fixtures", desc: "Installs and repairs for toilets, faucets, and disposals.", price: "From $160" },
  { icon: <Ic.Wrench size={22} />, title: "Repiping", desc: "Whole-home copper and PEX, done clean with minimal wall damage.", price: "Free estimate" },
  { icon: <Ic.Search size={22} />, title: "Sewer camera inspection", desc: "See the real problem on video before you spend a dollar.", price: "From $250" },
  { icon: <Ic.Drop size={22} />, title: "Kitchen & bath", desc: "Garbage disposals, supply lines, and remodel rough-ins.", price: "From $140" },
];

export function ServicesSection({ onBook }: { onBook: () => void }) {
  return (
    <section id="services" style={{ background: "var(--bg)", padding: "76px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <SectionHead eyebrow="What we do" title="Every plumbing job, one trusted crew."
          sub="From a 2 a.m. burst pipe to a planned repipe, the same licensed plumbers handle it — no subcontractors, no runaround." />

        <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginTop: 36 }}>
          {SERVICES.map((s, i) => <ServiceCard key={i} s={s} onBook={onBook} />)}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ s, onBook }: { s: Service; onBook: () => void }) {
  const [hover, setHover] = React.useState(false);
  return (
    <button onClick={onBook} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      style={{
        textAlign: "left", cursor: "pointer", background: "var(--surface)",
        border: `1px solid ${hover ? "var(--steel)" : "var(--line)"}`,
        borderRadius: "var(--r-m)", padding: "22px 20px",
        boxShadow: hover ? "var(--shadow-md)" : "none",
        transition: "border-color .16s ease, box-shadow .16s ease",
        display: "flex", flexDirection: "column", gap: 12, minHeight: 184, width: "100%",
        borderTop: `3px solid ${hover ? "var(--steel)" : "var(--line)"}`
      }}>
      <span style={{ width: 44, height: 44, borderRadius: 0, display: "grid", placeItems: "center", background: "var(--primary-soft)", color: "var(--steel)" }}>{s.icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: "'Inter Tight'", fontSize: 16.5, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>{s.title}</div>
        <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.5, marginTop: 6 }}>{s.desc}</p>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 12, borderTop: "1px solid var(--line-2)" }}>
        <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: "var(--steel)" }}>{s.price}</span>
        <span style={{ color: "var(--steel)", transform: hover ? "translateX(3px)" : "none", transition: "transform .16s ease", display: "inline-flex" }}><Ic.ArrowRight size={15} stroke={2.25} /></span>
      </div>
    </button>
  );
}

/* ─────────────────────────  WHY US  ───────────────────────── */

export function WhyUsSection() {
  const items = [
    { icon: <Ic.CheckCircle size={22} />, title: "Upfront flat-rate pricing", desc: "You approve the exact price before any work begins. No hourly meter, no surprise line items." },
    { icon: <Ic.Shield size={22} />, title: "Licensed & background-checked", desc: "Every plumber is a full-time employee — drug-tested, background-checked, and factory-trained." },
    { icon: <Ic.Clock size={22} />, title: "Two-hour arrival windows", desc: "We text when your plumber is 30 minutes out, with their name and photo. No all-day waiting." },
    { icon: <Ic.Check size={22} />, title: "Guaranteed workmanship", desc: "Parts and labor backed in writing. If it isn't right, we come back and fix it — no charge." },
  ];
  return (
    <section id="why" style={{ borderTop: "1px solid var(--line)", background: "var(--surface)", padding: "76px 24px" }}>
      <div className="about-section" style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "0.9fr 1.1fr", gap: 48, alignItems: "center" }}>
        {/* photo */}
        <div style={{ position: "relative" }}>
          <div style={{ position: "relative", borderRadius: "var(--r-l)", overflow: "hidden", aspectRatio: "4/5", border: "1px solid var(--line)" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/work-plumber.jpg" alt="A licensed Rainier plumber on the job"
              style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div style={{
            position: "absolute", right: -14, bottom: -14, background: "var(--ink)", color: "#fff",
            borderRadius: "var(--r-m)", padding: "16px 20px", boxShadow: "var(--shadow-lg)"
          }}>
            <div style={{ fontFamily: "'Inter Tight'", fontSize: 26, fontWeight: 700, letterSpacing: "-0.02em" }}>16 yrs</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)" }}>serving Puget Sound</div>
          </div>
        </div>

        {/* text */}
        <div>
          <SectionHead eyebrow="Why Rainier" title="The plumber you'd recommend to your family." />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 30 }}>
            {items.map((it, i) => (
              <div key={i}>
                <span style={{ width: 44, height: 44, borderRadius: 0, display: "grid", placeItems: "center", background: "var(--primary-soft)", color: "var(--steel)" }}>{it.icon}</span>
                <div style={{ fontFamily: "'Inter Tight'", fontSize: 16, fontWeight: 700, color: "var(--ink)", marginTop: 12, letterSpacing: "-0.01em" }}>{it.title}</div>
                <p style={{ fontSize: 13.5, color: "var(--ink-2)", lineHeight: 1.55, marginTop: 6 }}>{it.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  PROCESS  ───────────────────────── */

export function ProcessSection({ onBook }: { onBook: () => void }) {
  const steps = [
    { n: "01", icon: <Ic.Phone size={20} />, title: "Call or book online", desc: "Tell us what's going on. A live dispatcher answers 24/7 — no phone trees." },
    { n: "02", icon: <Ic.Calendar size={20} />, title: "We confirm & text your ETA", desc: "You get a two-hour window plus your plumber's name and photo before they arrive." },
    { n: "03", icon: <Ic.CheckCircle size={20} />, title: "Upfront quote, your approval", desc: "We diagnose, then quote a flat price. Work only starts once you say yes." },
    { n: "04", icon: <Ic.Shield size={20} />, title: "Fixed & guaranteed", desc: "We fix it, clean up, and back the work in writing. That's the whole deal." },
  ];
  return (
    <section id="process" style={{ background: "var(--ink)", color: "#fff", padding: "76px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, flexWrap: "wrap", marginBottom: 36 }}>
          <div style={{ maxWidth: 560 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "#8FB4D6", textTransform: "uppercase", fontWeight: 600 }}>How it works</div>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 38, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", marginTop: 10 }}>Four steps. No surprises.</h2>
          </div>
          <button onClick={onBook} style={{
            display: "inline-flex", alignItems: "center", gap: 9, background: "#2F6FB0", color: "#fff",
            border: "none", borderRadius: 0, padding: "14px 22px", fontSize: 15, fontWeight: 600, cursor: "pointer"
          }}>
            Book your plumber <Ic.ArrowRight size={16} />
          </button>
        </div>

        <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ background: "#1D2733", border: "1px solid rgba(255,255,255,.08)", borderRadius: "var(--r-m)", padding: "24px 22px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ width: 44, height: 44, borderRadius: 0, display: "grid", placeItems: "center", background: "rgba(76,141,203,.16)", color: "#6FA8DC" }}>{s.icon}</span>
                <span className="mono" style={{ fontSize: 24, fontWeight: 500, color: "rgba(255,255,255,.18)" }}>{s.n}</span>
              </div>
              <div style={{ fontFamily: "'Inter Tight'", fontSize: 16.5, fontWeight: 700, marginTop: 16, letterSpacing: "-0.01em" }}>{s.title}</div>
              <p style={{ fontSize: 13.5, color: "rgba(255,255,255,.62)", lineHeight: 1.55, marginTop: 8 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  GUARANTEE BAND  ───────────────────────── */

export function GuaranteeBand({ onBook }: { onBook: () => void }) {
  const promises = [
    { icon: <Ic.CheckCircle size={20} />, title: "Flat-rate pricing", sub: "Approved before we start" },
    { icon: <Ic.Shield size={20} />, title: "Licensed & insured", sub: "WA #RAINIPL123CC" },
    { icon: <Ic.Star size={18} />, title: "Financing available", sub: "On approved credit" },
  ];
  return (
    <section style={{ background: "var(--steel)", color: "#fff" }}>
      <div className="guarantee-inner" style={{
        maxWidth: 1180, margin: "0 auto", padding: "26px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 28, flexWrap: "wrap"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{ width: 46, height: 46, borderRadius: 0, background: "rgba(255,255,255,.14)", display: "grid", placeItems: "center", flexShrink: 0 }}>
            <Ic.Shield size={24} />
          </span>
          <div>
            <div style={{ fontFamily: "'Inter Tight'", fontSize: 20, fontWeight: 700, letterSpacing: "-0.01em" }}>Fixed right, or we make it right.</div>
            <div style={{ fontSize: 13.5, color: "rgba(255,255,255,.8)", marginTop: 2 }}>Every job backed by our written workmanship guarantee.</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {promises.map((p, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ color: "#fff", opacity: 0.9 }}>{p.icon}</span>
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontSize: 13.5, fontWeight: 600 }}>{p.title}</div>
                <div style={{ fontSize: 11.5, color: "rgba(255,255,255,.7)" }}>{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <button onClick={onBook} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "#fff", color: "var(--steel)", border: "none",
          borderRadius: 0, padding: "12px 20px", fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap"
        }}>
          Get started <Ic.ArrowRight size={15} stroke={2.25} />
        </button>
      </div>
    </section>
  );
}

/* ─────────────────────────  TESTIMONIALS  ───────────────────────── */

function GoogleG({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#4285F4" d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z" />
      <path fill="#34A853" d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.69 28.18c-.44-1.32-.69-2.73-.69-4.18s.25-2.86.69-4.18v-5.7H4.34C2.85 17.09 2 20.45 2 24s.85 6.91 2.34 9.88l7.35-5.7z" />
      <path fill="#EA4335" d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z" />
    </svg>
  );
}

function Stars({ n = 5, size = 15 }: { n?: number; size?: number }) {
  return (
    <div style={{ display: "inline-flex", gap: 2, color: "#F4B400" }}>
      {Array.from({ length: n }).map((_, i) => <Ic.Star key={i} size={size} />)}
    </div>
  );
}

const REVIEWS = [
  { name: "Sarah M.", hood: "Ballard", when: "2 weeks ago", text: "Woke up to a flooded basement at 6 a.m. Rainier had someone at my door in under an hour, quoted a flat price, and had it fixed by lunch. No upsell, no drama." },
  { name: "David T.", hood: "Queen Anne", when: "1 month ago", text: "Replaced our water heater same day and left the space cleaner than they found it. They texted me a photo of the tech before he arrived — nice touch." },
  { name: "Priya R.", hood: "Capitol Hill", when: "1 month ago", text: "Got three quotes for a repipe. Rainier wasn't the cheapest, but they were the clearest about what we were paying for. Zero surprises on the invoice." },
];

export function TestimonialsSection() {
  return (
    <section id="reviews" style={{ borderTop: "1px solid var(--line)", background: "var(--surface)", padding: "76px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 20, flexWrap: "wrap", marginBottom: 32 }}>
          <SectionHead eyebrow="Reviews" title="Seattle keeps calling us back." />
          <div style={{ display: "flex", alignItems: "center", gap: 12, border: "1px solid var(--line)", borderRadius: "var(--r-m)", padding: "12px 16px", background: "var(--surface)", boxShadow: "var(--shadow-sm)" }}>
            <GoogleG size={22} />
            <div style={{ lineHeight: 1.2 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontFamily: "'Inter Tight'", fontSize: 20, fontWeight: 700, color: "var(--ink)" }}>4.9</span>
                <Stars n={5} size={14} />
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>512 Google reviews</div>
            </div>
          </div>
        </div>

        <div className="svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {REVIEWS.map((r, i) => (
            <div key={i} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-l)", padding: "24px 22px", display: "flex", flexDirection: "column", gap: 14 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <Stars n={5} />
                <GoogleG size={16} />
              </div>
              <p style={{ fontSize: 14.5, color: "var(--ink-2)", lineHeight: 1.6, flex: 1 }}>&ldquo;{r.text}&rdquo;</p>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 12, borderTop: "1px solid var(--line-2)" }}>
                <span style={{ width: 38, height: 38, borderRadius: "50%", background: "var(--primary-soft)", color: "var(--steel)", display: "grid", placeItems: "center", fontWeight: 700, fontFamily: "'Inter Tight'", fontSize: 15 }}>{r.name.charAt(0)}</span>
                <div style={{ lineHeight: 1.3 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, color: "var(--ink)" }}>{r.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{r.hood} · {r.when}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  FAQ  ───────────────────────── */

const FAQS = [
  { q: "Are you licensed and insured?", a: "Yes — fully licensed, bonded, and insured in Washington (WA #RAINIPL123CC). Every plumber on our team is a background-checked, drug-tested employee, never a subcontractor." },
  { q: "How does pricing work?", a: "Flat-rate, never hourly. We diagnose the problem and give you one clear price before any work starts. You approve it first — the meter never runs while we work." },
  { q: "Do you charge for estimates?", a: "Diagnostic visits are a flat, upfront fee that we credit toward the repair if you hire us. Larger jobs like repipes and water heater replacements are quoted free." },
  { q: "How fast can you come out?", a: "For emergencies, we dispatch in about 22 minutes on average, with a plumber typically at your door within two hours. Scheduled visits usually have same-week — often same-day — openings." },
  { q: "Do you offer financing?", a: "Yes. For larger jobs we offer financing on approved credit, so a new water heater or a whole-home repipe doesn't have to be paid all at once." },
  { q: "What's your guarantee?", a: "Parts and labor are backed in writing. If something isn't right, we come back and make it right at no charge." },
];

export function FaqSection() {
  const [open, setOpen] = React.useState<number | null>(0);
  return (
    <section id="faq" style={{ borderTop: "1px solid var(--line)", background: "var(--bg)", padding: "76px 24px" }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <SectionHead eyebrow="FAQ" title="Straight answers." />
        <div style={{ marginTop: 28, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: "var(--r-l)", overflow: "hidden" }}>
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={i} onClick={() => setOpen(isOpen ? null : i)}
                style={{ padding: "20px 22px", cursor: "pointer", borderTop: i === 0 ? "none" : "1px solid var(--line-2)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16 }}>
                  <h3 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 16, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>{f.q}</h3>
                  <span style={{ fontSize: 20, color: isOpen ? "var(--steel)" : "var(--muted)", transition: "transform .25s ease", transform: isOpen ? "rotate(45deg)" : "none", flexShrink: 0, lineHeight: 1 }}>+</span>
                </div>
                <div style={{ maxHeight: isOpen ? 200 : 0, overflow: "hidden", transition: "max-height .3s ease" }}>
                  <p style={{ fontSize: 14, color: "var(--ink-2)", lineHeight: 1.65, paddingTop: 12 }}>{f.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────  shared  ───────────────────────── */

function SectionHead({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div style={{ maxWidth: 620 }}>
      <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--steel)", textTransform: "uppercase", fontWeight: 600 }}>{eyebrow}</div>
      <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 38, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", marginTop: 10, color: "var(--ink)" }}>{title}</h2>
      {sub && <p style={{ fontSize: 16, color: "var(--ink-2)", marginTop: 10, lineHeight: 1.55 }}>{sub}</p>}
    </div>
  );
}
