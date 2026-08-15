"use client";

import React from "react";
import * as Ic from "./icons";

interface Job {
  img: string;
  type: string;
  hood: string;
  detail: string;
}

const JOBS: Job[] = [
  { img: "/images/work-pipes-install.jpg", type: "Supply line replacement", hood: "Ballard", detail: "Copper + PEX · 1 day" },
  { img: "/images/work-heater.jpg", type: "Tankless water heater", hood: "Queen Anne", detail: "Same-day install" },
  { img: "/images/work-fittings.jpg", type: "Whole-home repipe", hood: "Fremont", detail: "Copper · 2 days" },
  { img: "/images/work-copper-dark.jpg", type: "Radiant heat lines", hood: "Capitol Hill", detail: "Soldered copper" },
];

function JobCard({ job }: { job: Job }) {
  const [hover, setHover] = React.useState(false);
  return (
    <figure
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        margin: 0, borderRadius: "var(--r-l)", overflow: "hidden",
        border: "1px solid var(--line)", background: "var(--surface)",
        boxShadow: hover ? "var(--shadow-md)" : "none", transition: "box-shadow .18s ease"
      }}>
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "#10151B" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={job.img} alt={`${job.type} in ${job.hood}`}
          style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hover ? "scale(1.04)" : "scale(1)", transition: "transform .4s ease"
          }} />
        <span style={{
          position: "absolute", top: 12, left: 12, fontSize: 10.5, fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase",
          background: "rgba(16,21,27,.82)", color: "#fff", padding: "5px 9px", borderRadius: 0
        }}>{job.hood}</span>
      </div>
      <figcaption style={{ padding: "16px 16px 18px" }}>
        <div style={{ fontFamily: "'Inter Tight', sans-serif", fontSize: 15.5, fontWeight: 700, color: "var(--ink)", letterSpacing: "-0.01em" }}>{job.type}</div>
        <div className="mono" style={{ fontSize: 11.5, color: "var(--muted)", marginTop: 5, letterSpacing: "0.04em" }}>{job.detail}</div>
      </figcaption>
    </figure>
  );
}

export function GallerySection() {
  return (
    <section id="gallery" style={{ borderTop: "1px solid var(--line)", background: "var(--bg)", padding: "76px 24px" }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16, marginBottom: 32, flexWrap: "wrap" }}>
          <div style={{ maxWidth: 620 }}>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.16em", color: "var(--steel)", textTransform: "uppercase", fontWeight: 600 }}>Recent work</div>
            <h2 style={{ fontFamily: "'Fraunces', Georgia, serif", fontSize: 38, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", marginTop: 10, color: "var(--ink)" }}>
              Work we&apos;ll put our name on.
            </h2>
            <p style={{ fontSize: 16, color: "var(--ink-2)", marginTop: 10, lineHeight: 1.55 }}>
              Real jobs across Seattle — clean installs, tidy work areas, and the kind of craftsmanship
              you only notice when it lasts.
            </p>
          </div>
          <a href="#" style={{ color: "var(--steel)", fontWeight: 600, fontSize: 14, textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6 }}>
            See all 240+ jobs <Ic.ArrowRight size={14} />
          </a>
        </div>

        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 18 }}>
          {JOBS.map((j, i) => <JobCard key={i} job={j} />)}
        </div>
      </div>
    </section>
  );
}
