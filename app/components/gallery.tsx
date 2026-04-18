"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import * as Ic from "./icons";

function svgUrl(svg: string) {
  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const pipeBefore = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='wall' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0' stop-color='#D8CFB8'/><stop offset='1' stop-color='#9A8E74'/>
    </linearGradient>
    <pattern id='stains' width='60' height='60' patternUnits='userSpaceOnUse'>
      <circle cx='20' cy='20' r='8' fill='rgba(60,30,10,.15)'/>
      <circle cx='40' cy='45' r='4' fill='rgba(60,30,10,.1)'/>
    </pattern>
    <pattern id='rusty' width='12' height='12' patternUnits='userSpaceOnUse'>
      <rect width='12' height='12' fill='#7A3A1E'/>
      <circle cx='3' cy='4' r='1.5' fill='#4A2410'/>
      <circle cx='8' cy='9' r='1' fill='#2A1208'/>
    </pattern>
  </defs>
  <rect width='400' height='300' fill='url(#wall)'/>
  <rect width='400' height='300' fill='url(#stains)'/>
  <rect x='0' y='130' width='400' height='26' fill='#6B4121'/>
  <rect x='0' y='130' width='400' height='26' fill='url(#rusty)' opacity='.6'/>
  <rect x='180' y='124' width='40' height='38' fill='#4A2410'/>
  <circle cx='200' cy='165' r='18' fill='#3A2010'/>
  <path d='M200 168 Q198 200 195 240 Q197 260 200 280' stroke='#3A5A6A' stroke-width='3' fill='none' opacity='.6'/>
  <ellipse cx='202' cy='280' rx='18' ry='4' fill='#2A4050' opacity='.5'/>
  <rect width='400' height='300' fill='rgba(40,25,10,.15)'/>
</svg>`);

const pipeAfter = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='wall2' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0' stop-color='#F3ECDE'/><stop offset='1' stop-color='#D8CFB8'/>
    </linearGradient>
    <linearGradient id='copper' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0' stop-color='#E8B489'/><stop offset='.5' stop-color='#C97A48'/><stop offset='1' stop-color='#8E4E25'/>
    </linearGradient>
  </defs>
  <rect width='400' height='300' fill='url(#wall2)'/>
  <rect x='0' y='130' width='400' height='26' fill='url(#copper)'/>
  <rect x='0' y='132' width='400' height='3' fill='#FFE2CC' opacity='.7'/>
  <rect x='180' y='124' width='40' height='38' fill='#8E4E25'/>
  <rect x='180' y='126' width='40' height='3' fill='#E8B489'/>
  <rect x='178' y='124' width='44' height='4' fill='#6B3815'/>
  <rect x='178' y='158' width='44' height='4' fill='#6B3815'/>
  <circle cx='200' cy='143' r='6' fill='#C0392B'/>
  <circle cx='200' cy='143' r='3' fill='#FFE2CC'/>
</svg>`);

const heaterBefore = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'>
  <rect width='400' height='300' fill='#C4B89E'/>
  <rect width='400' height='300' fill='rgba(40,25,10,.1)'/>
  <defs>
    <pattern id='rustTank' width='8' height='8' patternUnits='userSpaceOnUse'>
      <rect width='8' height='8' fill='transparent'/>
      <circle cx='2' cy='3' r='1' fill='#4A2410' opacity='.5'/>
      <circle cx='6' cy='6' r='.8' fill='#2A1208' opacity='.4'/>
    </pattern>
  </defs>
  <rect x='140' y='60' width='140' height='210' rx='8' fill='#7A6A50'/>
  <rect x='140' y='60' width='140' height='210' rx='8' fill='url(#rustTank)'/>
  <rect x='140' y='60' width='140' height='20' fill='#3A2010'/>
  <rect x='170' y='40' width='10' height='25' fill='#6B4121'/>
  <rect x='240' y='40' width='10' height='25' fill='#6B4121'/>
  <ellipse cx='210' cy='275' rx='90' ry='8' fill='#3A5A6A' opacity='.55'/>
  <rect x='165' y='130' width='80' height='30' fill='#D4C4A0' opacity='.5'/>
  <rect x='180' y='220' width='50' height='28' fill='#2A1810' stroke='#5A3020'/>
  <circle cx='205' cy='234' r='4' fill='#4A2410'/>
</svg>`);

const heaterAfter = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'>
  <rect width='400' height='300' fill='#F3ECDE'/>
  <defs>
    <linearGradient id='shine' x1='0' y1='0' x2='1' y2='0'>
      <stop offset='0' stop-color='#fff' stop-opacity='.5'/>
      <stop offset='.4' stop-color='#fff' stop-opacity='0'/>
      <stop offset='1' stop-color='#000' stop-opacity='.08'/>
    </linearGradient>
  </defs>
  <rect x='150' y='50' width='100' height='170' rx='10' fill='#E8E2D3'/>
  <rect x='150' y='50' width='100' height='170' rx='10' fill='url(#shine)'/>
  <rect x='165' y='70' width='70' height='40' rx='4' fill='#0E1B24'/>
  <rect x='170' y='75' width='60' height='12' fill='#1E6FA8' opacity='.6'/>
  <text x='172' y='102' font-size='8' fill='#7AC7FF' font-family='monospace'>120F</text>
  <circle cx='175' cy='135' r='4' fill='#1E6FA8'/>
  <circle cx='190' cy='135' r='4' fill='#D8CFB8'/>
  <circle cx='205' cy='135' r='4' fill='#D8CFB8'/>
  <rect x='170' y='20' width='8' height='35' fill='#C97A48'/>
  <rect x='222' y='20' width='8' height='35' fill='#C97A48'/>
  <rect x='140' y='100' width='10' height='20' fill='#8E4E25'/>
  <rect x='250' y='100' width='10' height='20' fill='#8E4E25'/>
</svg>`);

const leakBefore = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'>
  <defs>
    <linearGradient id='ceilingWet' x1='0' y1='0' x2='0' y2='1'>
      <stop offset='0' stop-color='#D8D0B8'/><stop offset='1' stop-color='#B8A878'/>
    </linearGradient>
  </defs>
  <rect width='400' height='300' fill='url(#ceilingWet)'/>
  <ellipse cx='180' cy='150' rx='120' ry='80' fill='#8A6A38' opacity='.55'/>
  <ellipse cx='180' cy='150' rx='90' ry='60' fill='#6A4A20' opacity='.6'/>
  <ellipse cx='180' cy='150' rx='60' ry='40' fill='#3A2810' opacity='.55'/>
  <ellipse cx='180' cy='150' rx='30' ry='20' fill='#1A1008' opacity='.7'/>
  <ellipse cx='180' cy='190' rx='5' ry='3' fill='#3A5A6A'/>
  <path d='M180 192 Q180 230 181 270' stroke='#3A5A6A' stroke-width='3' fill='none' opacity='.7'/>
  <circle cx='181' cy='275' r='5' fill='#3A5A6A'/>
  <path d='M100 80 L170 130' stroke='#2A1810' stroke-width='.8' opacity='.6'/>
  <path d='M250 100 L200 140' stroke='#2A1810' stroke-width='.8' opacity='.6'/>
</svg>`);

const leakAfter = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'>
  <rect width='400' height='300' fill='#F5EFE0'/>
  <defs>
    <pattern id='speckle' width='40' height='40' patternUnits='userSpaceOnUse'>
      <rect width='40' height='40' fill='transparent'/>
      <circle cx='10' cy='15' r='.6' fill='#D0C5A8'/>
      <circle cx='30' cy='25' r='.5' fill='#C8BA9C'/>
    </pattern>
  </defs>
  <rect width='400' height='300' fill='url(#speckle)' opacity='.5'/>
  <rect x='140' y='110' width='90' height='80' fill='#F8F2E3' opacity='.7' stroke='#E6DFD4' stroke-width='.5' stroke-dasharray='3 3'/>
  <rect x='0' y='285' width='400' height='15' fill='#fff'/>
  <rect x='0' y='283' width='400' height='2' fill='#E6DFD4'/>
</svg>`);

const drainBefore = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'>
  <rect width='400' height='300' fill='#4A3A28'/>
  <defs>
    <pattern id='concrete' width='40' height='40' patternUnits='userSpaceOnUse'>
      <rect width='40' height='40' fill='#3A2A18'/>
      <circle cx='10' cy='12' r='1' fill='#2A1810'/>
    </pattern>
  </defs>
  <rect width='400' height='300' fill='url(#concrete)' opacity='.5'/>
  <rect x='0' y='180' width='400' height='120' fill='#2A3A48' opacity='.85'/>
  <path d='M0 180 Q100 175 200 180 T400 180' stroke='#4A6A80' stroke-width='1.5' fill='none'/>
  <circle cx='80' cy='195' r='4' fill='#1A1008' opacity='.7'/>
  <circle cx='150' cy='210' r='3' fill='#1A1008' opacity='.7'/>
  <circle cx='280' cy='200' r='5' fill='#1A1008' opacity='.7'/>
  <circle cx='200' cy='230' r='20' fill='#1A1008'/>
  <circle cx='200' cy='230' r='15' fill='#0A0604'/>
  <ellipse cx='200' cy='230' rx='40' ry='20' fill='#2A1810' opacity='.5'/>
</svg>`);

const drainAfter = svgUrl(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300' preserveAspectRatio='xMidYMid slice'>
  <rect width='400' height='300' fill='#D8CFB8'/>
  <defs>
    <pattern id='cleanConcrete' width='40' height='40' patternUnits='userSpaceOnUse'>
      <rect width='40' height='40' fill='#E8E0CE'/>
      <circle cx='15' cy='15' r='.4' fill='#C8BA9C'/>
    </pattern>
  </defs>
  <rect width='400' height='300' fill='url(#cleanConcrete)' opacity='.6'/>
  <circle cx='200' cy='200' r='30' fill='#8A8275'/>
  <circle cx='200' cy='200' r='24' fill='#6A6258'/>
  <line x1='180' y1='180' x2='180' y2='220' stroke='#2A2520' stroke-width='2'/>
  <line x1='188' y1='180' x2='188' y2='220' stroke='#2A2520' stroke-width='2'/>
  <line x1='196' y1='180' x2='196' y2='220' stroke='#2A2520' stroke-width='2'/>
  <line x1='204' y1='180' x2='204' y2='220' stroke='#2A2520' stroke-width='2'/>
  <line x1='212' y1='180' x2='212' y2='220' stroke='#2A2520' stroke-width='2'/>
  <circle cx='200' cy='200' r='30' fill='none' stroke='#4A4238' stroke-width='1.5'/>
</svg>`);

interface GalleryItem {
  before: string;
  after: string;
  type: string;
  hood: string;
  duration: string;
}

const GALLERY: GalleryItem[] = [
  { before: heaterBefore, after: heaterAfter, type: "Water heater replacement", hood: "Ballard", duration: "3 hr · $1,840" },
  { before: pipeBefore, after: pipeAfter, type: "Burst pipe cleanup", hood: "Queen Anne", duration: "Emergency · 2 hr" },
  { before: leakBefore, after: leakAfter, type: "Ceiling leak repair", hood: "Fremont", duration: "Half day · $680" },
  { before: pipeBefore, after: pipeAfter, type: "Corroded pipe replacement", hood: "Capitol Hill", duration: "4 hr · $920" },
  { before: drainBefore, after: drainAfter, type: "Basement drain repair", hood: "Greenwood", duration: "3 hr · $540" },
  { before: heaterBefore, after: heaterAfter, type: "Tankless water heater install", hood: "Wallingford", duration: "Full day · $3,200" },
];

function BeforeAfterCard({ item }: { item: GalleryItem }) {
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const updateFromEvent = useCallback((clientX: number) => {
    const box = boxRef.current;
    if (!box) return;
    const rect = box.getBoundingClientRect();
    const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
    setPct((x / rect.width) * 100);
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const move = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      updateFromEvent(x);
    };
    const up = () => setDragging(false);
    window.addEventListener("mousemove", move as EventListener);
    window.addEventListener("mouseup", up);
    window.addEventListener("touchmove", move as EventListener);
    window.addEventListener("touchend", up);
    return () => {
      window.removeEventListener("mousemove", move as EventListener);
      window.removeEventListener("mouseup", up);
      window.removeEventListener("touchmove", move as EventListener);
      window.removeEventListener("touchend", up);
    };
  }, [dragging, updateFromEvent]);

  return (
    <figure style={{ margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
      <div
        ref={boxRef}
        onMouseDown={(e) => { setDragging(true); updateFromEvent(e.clientX); }}
        onTouchStart={(e) => { setDragging(true); updateFromEvent(e.touches[0].clientX); }}
        style={{
          position: "relative", aspectRatio: "4/3", borderRadius: "var(--r-l)",
          overflow: "hidden", background: "#222", cursor: dragging ? "grabbing" : "ew-resize",
          boxShadow: "var(--shadow-md)", border: "1px solid var(--line)",
          userSelect: "none"
        }}>
        {/* After (full width) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.after} alt={`${item.type} — after`} draggable={false}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} />

        {/* Before (clipped) */}
        <div style={{ position: "absolute", inset: 0, clipPath: `inset(0 ${100 - pct}% 0 0)`, pointerEvents: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.before} alt={`${item.type} — before`} draggable={false}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
        </div>

        <span style={{
          position: "absolute", top: 10, left: 10, fontSize: 10.5, fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase",
          background: "rgba(14,27,36,.75)", color: "#fff",
          padding: "5px 9px", borderRadius: 999, pointerEvents: "none"
        }}>Before</span>
        <span style={{
          position: "absolute", top: 10, right: 10, fontSize: 10.5, fontWeight: 700,
          letterSpacing: "0.14em", textTransform: "uppercase",
          background: "rgba(11,59,92,.85)", color: "#fff",
          padding: "5px 9px", borderRadius: 999, pointerEvents: "none"
        }}>After</span>

        {/* Slider */}
        <div style={{
          position: "absolute", top: 0, bottom: 0, left: `${pct}%`, width: 2,
          background: "#fff", pointerEvents: "none",
          boxShadow: "0 0 0 1px rgba(0,0,0,.15), 0 0 18px rgba(0,0,0,.35)"
        }} />
        <div style={{
          position: "absolute", top: "50%", left: `${pct}%`, transform: "translate(-50%,-50%)",
          width: 40, height: 40, borderRadius: "50%", background: "#fff",
          boxShadow: "0 2px 10px rgba(0,0,0,.35)",
          display: "grid", placeItems: "center", color: "var(--primary)",
          pointerEvents: "none"
        }}>
          <Ic.Handle size={18} stroke={2.25} />
        </div>
      </div>

      <figcaption style={{
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, padding: "2px 4px"
      }}>
        <div>
          <div style={{
            fontFamily: "'Inter Tight', sans-serif", fontSize: 15, fontWeight: 600,
            color: "var(--ink)", letterSpacing: "-0.01em"
          }}>{item.type}</div>
          <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 2 }}>{item.hood}</div>
        </div>
        <span className="mono" style={{
          fontSize: 11, letterSpacing: "0.1em", color: "var(--muted)", textTransform: "uppercase",
          background: "var(--surface-2)", padding: "4px 8px", borderRadius: 999,
          border: "1px solid var(--line)", whiteSpace: "nowrap"
        }}>{item.duration}</span>
      </figcaption>
    </figure>
  );
}

export function GallerySection() {
  return (
    <section id="gallery" style={{
      borderTop: "1px solid var(--line)", background: "var(--bg)", padding: "64px 24px"
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div style={{
          display: "flex", alignItems: "flex-end", justifyContent: "space-between",
          gap: 16, marginBottom: 28, flexWrap: "wrap"
        }}>
          <div>
            <span className="mono" style={{
              fontSize: 11, letterSpacing: "0.14em", color: "var(--primary-2)",
              textTransform: "uppercase", fontWeight: 600
            }}>Recent jobs · drag the handle</span>
            <h2 style={{
              fontSize: 38, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em",
              marginTop: 10, maxWidth: 640
            }}>See our work.</h2>
            <p style={{ fontSize: 16, color: "var(--ink-2)", marginTop: 10, lineHeight: 1.55, maxWidth: 560 }}>
              Every job, photographed before we start and after we leave. No staged lighting,
              no filters — this is how your home will actually look.
            </p>
          </div>
          <a href="#" style={{
            color: "var(--primary)", fontWeight: 600, fontSize: 14, textDecoration: "none",
            display: "inline-flex", alignItems: "center", gap: 6
          }}>See all 240+ jobs <Ic.ArrowRight size={14} /></a>
        </div>

        <div className="gallery-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
          {GALLERY.map((g, i) => <BeforeAfterCard key={i} item={g} />)}
        </div>
      </div>
    </section>
  );
}
