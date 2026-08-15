"use client";

import React from "react";
import * as Ic from "./icons";

export function NavBar({ onBook }: { onBook?: () => void }) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Services", href: "#services" },
    { label: "Our Work", href: "#gallery" },
    { label: "Reviews", href: "#reviews" },
    { label: "Coverage", href: "#service-area" },
    { label: "Book Now", href: "#top", emphasis: true },
  ];

  function go(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setOpen(false);
    if (href === "#top") {
      if (onBook) onBook();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.querySelector(href);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 56;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  }

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 25,
      background: scrolled ? "rgba(255,255,255,.92)" : "rgba(255,255,255,.78)",
      backdropFilter: "saturate(160%) blur(12px)",
      WebkitBackdropFilter: "saturate(160%) blur(12px)",
      borderBottom: "1px solid var(--line)",
      transition: "background .2s ease, box-shadow .2s ease",
      boxShadow: scrolled ? "0 1px 0 rgba(14,27,36,.04), 0 8px 20px -16px rgba(14,27,36,.18)" : "none"
    }}>
      <div style={{
        maxWidth: 1180, margin: "0 auto", padding: "0 24px",
        height: 56,
        display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16
      }}>
        <a href="#top" onClick={(e) => go(e, "#top")} style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          textDecoration: "none", color: "var(--ink)"
        }}>
          <svg width="22" height="22" viewBox="0 0 32 32" aria-hidden="true">
            <defs>
              <linearGradient id="navlg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#1E6FA8" />
                <stop offset="1" stopColor="#0B3B5C" />
              </linearGradient>
            </defs>
            <circle cx="16" cy="16" r="15" fill="url(#navlg)" />
            <path d="M22 11.5c-1.6-2-4-3.2-6.5-3.2a8 8 0 0 0 0 15.4c2.5 0 4.9-1.2 6.5-3.2"
              fill="none" stroke="#F5F1EA" strokeWidth="2.25" strokeLinecap="round" />
          </svg>
          <span style={{
            fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 15,
            letterSpacing: "-0.01em"
          }}>Rainier</span>
        </a>

        <ul className="nav-links" style={{
          display: "flex", gap: 4, listStyle: "none", margin: 0, padding: 0, alignItems: "center"
        }}>
          {links.map((l, i) => (
            <NavLink key={i} href={l.href} emphasis={l.emphasis} onClick={(e) => go(e, l.href)}>
              {l.label}
            </NavLink>
          ))}
        </ul>

        <a href="tel:+12064201188" className="nav-phone" style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          color: "var(--ink)", fontSize: 13.5, fontWeight: 600,
          textDecoration: "none", padding: "8px 4px"
        }}>
          <span style={{
            width: 26, height: 26, borderRadius: "50%",
            background: "var(--accent-soft)", color: "var(--accent)",
            display: "grid", placeItems: "center"
          }}><Ic.Phone size={13} stroke={2} /></span>
          <span className="mono" style={{ letterSpacing: "0.01em" }}>(206) 420-1188</span>
        </a>

        <button className="nav-burger" onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
          style={{
            display: "none", width: 40, height: 40, borderRadius: 0,
            background: "transparent", border: "1px solid var(--line)",
            cursor: "pointer", placeItems: "center", color: "var(--ink)"
          }}>
          {open
            ? <Ic.X size={18} />
            : <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 7h16" /><path d="M4 12h16" /><path d="M4 17h16" />
            </svg>}
        </button>
      </div>

      {open && (
        <div className="nav-mobile" style={{
          borderTop: "1px solid var(--line)", background: "#fff",
          padding: "12px 24px 18px"
        }}>
          <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 2 }}>
            {links.map((l, i) => (
              <li key={i}>
                <a href={l.href} onClick={(e) => go(e, l.href)} style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 2px", fontSize: 16, fontWeight: 500,
                  color: l.emphasis ? "var(--primary)" : "var(--ink)",
                  textDecoration: "none", borderBottom: "1px solid var(--line-2)"
                }}>
                  {l.label} <Ic.ArrowRight size={14} />
                </a>
              </li>
            ))}
          </ul>
          <a href="tel:+12064201188" style={{
            marginTop: 14, display: "flex", alignItems: "center", gap: 10,
            background: "var(--ink)", color: "#fff", padding: "14px 18px",
            borderRadius: 0, textDecoration: "none", fontWeight: 600, fontSize: 14,
            justifyContent: "center"
          }}>
            <Ic.Phone size={15} /> Call (206) 420-1188
          </a>
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, emphasis, onClick, children }: {
  href: string; emphasis?: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  children: React.ReactNode;
}) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <li>
      <a href={href} onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "inline-block", padding: "8px 14px",
          fontSize: 13.5, fontWeight: emphasis ? 600 : 500,
          color: emphasis ? "#fff" : hovered ? "var(--ink)" : "var(--ink-2)",
          textDecoration: "none", borderRadius: 0,
          background: emphasis ? (hovered ? "#0B1118" : "var(--primary)") : "transparent",
          transition: "background .15s ease, color .15s ease"
        }}>
        {children}
      </a>
    </li>
  );
}

export function SiteFooter() {
  const services = [
    "Emergency", "Water Heaters", "Drain Cleaning",
    "Leak Repair", "Pipe Inspection", "All Services"
  ];
  const areas = [
    "Seattle", "Ballard", "Fremont", "Capitol Hill",
    "U-District", "Shoreline", "Queen Anne", "Greenwood"
  ];

  return (
    <footer style={{
      background: "var(--ink)", color: "rgba(245,241,234,.85)",
      borderTop: "1px solid rgba(255,255,255,.06)",
      marginTop: "auto"
    }}>
      <div className="footer-grid" style={{
        maxWidth: 1180, margin: "0 auto", padding: "56px 24px 40px",
        display: "grid", gridTemplateColumns: "1.3fr 1fr 1.2fr", gap: 48
      }}>
        {/* Brand */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="36" height="36" viewBox="0 0 32 32" aria-hidden="true">
              <defs>
                <linearGradient id="ftlg" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="#3D8BC6" />
                  <stop offset="1" stopColor="#0B3B5C" />
                </linearGradient>
              </defs>
              <circle cx="16" cy="16" r="15" fill="url(#ftlg)" />
              <path d="M22 11.5c-1.6-2-4-3.2-6.5-3.2a8 8 0 0 0 0 15.4c2.5 0 4.9-1.2 6.5-3.2"
                fill="none" stroke="#F5F1EA" strokeWidth="2.25" strokeLinecap="round" />
              <path d="M20 14.5c-1-1.2-2.4-1.9-4-1.9a4.5 4.5 0 0 0 0 8.8c1.6 0 3-.7 4-1.9"
                fill="none" stroke="#9CC8E6" strokeWidth="1.75" strokeLinecap="round" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
              <span style={{
                fontFamily: "'Inter Tight', sans-serif", fontWeight: 700, fontSize: 22,
                letterSpacing: "-0.02em", color: "#F5F1EA"
              }}>Rainier</span>
              <span style={{
                fontFamily: "'Inter', sans-serif", fontWeight: 500, fontSize: 10.5,
                letterSpacing: "0.18em", color: "rgba(245,241,234,.5)",
                textTransform: "uppercase", marginTop: 4
              }}>Plumbing · Seattle</span>
            </div>
          </div>

          <p style={{
            marginTop: 20, fontSize: 14, lineHeight: 1.55,
            color: "rgba(245,241,234,.72)", maxWidth: 340
          }}>
            {"Seattle's trusted plumbers since 2008."}
          </p>

          <div style={{
            marginTop: 24, padding: "14px 16px",
            background: "rgba(255,255,255,.04)",
            border: "1px solid rgba(255,255,255,.08)",
            borderRadius: "var(--r-m)",
            display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap"
          }}>
            <span style={{ color: "#3D8BC6", display: "inline-flex", alignItems: "center", gap: 6 }}>
              <Ic.Shield size={18} />
            </span>
            <div style={{ fontSize: 12.5, lineHeight: 1.5 }}>
              <div style={{ fontWeight: 600, color: "#F5F1EA", letterSpacing: "0.04em" }}>
                Licensed · Bonded · Insured
              </div>
              <div className="mono" style={{
                color: "rgba(245,241,234,.55)", fontSize: 11.5,
                letterSpacing: "0.06em", marginTop: 2
              }}>WA License #RAINIPL123CC</div>
            </div>
          </div>
        </div>

        {/* Services */}
        <div>
          <FooterHeader>Services</FooterHeader>
          <ul style={{ listStyle: "none", margin: "16px 0 0", padding: 0, display: "grid", gap: 10 }}>
            {services.map((s, i) => (
              <li key={i}>
                <a href="#" style={footerLinkStyle}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F1EA")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,241,234,.72)")}
                >{s}</a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <FooterHeader>Get in touch</FooterHeader>
          <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
            <a href="tel:+12064201188" style={{
              ...footerLinkStyle,
              display: "inline-flex", alignItems: "center", gap: 10,
              fontSize: 18, fontFamily: "'Inter Tight', sans-serif",
              fontWeight: 600, color: "#F5F1EA", letterSpacing: "-0.01em"
            }}>
              <Ic.Phone size={16} /> (206) 420-1188
            </a>
            <a href="mailto:hello@rainierplumbing.com"
              onMouseEnter={(e) => (e.currentTarget.style.color = "#F5F1EA")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(245,241,234,.72)")}
              style={{ ...footerLinkStyle, display: "inline-flex", alignItems: "center", gap: 10, fontSize: 14 }}>
              <Ic.Chat size={14} /> hello@rainierplumbing.com
            </a>
            <div style={{
              fontSize: 13, lineHeight: 1.6, color: "rgba(245,241,234,.72)",
              display: "flex", gap: 10, alignItems: "flex-start"
            }}>
              <Ic.Clock size={14} />
              <div>
                <div><span style={{ color: "#F5F1EA", fontWeight: 500 }}>24/7</span> emergency</div>
                <div>Mon–Sat <span className="mono" style={{ letterSpacing: "0.02em" }}>7am–7pm</span> routine</div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: 24 }}>
            <div style={{
              fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase",
              fontWeight: 600, color: "rgba(245,241,234,.45)",
              fontFamily: "'JetBrains Mono', monospace"
            }}>Service Area</div>
            <ul style={{
              listStyle: "none", margin: "10px 0 0", padding: 0,
              display: "flex", flexWrap: "wrap", gap: "6px 8px"
            }}>
              {areas.map((a, i) => (
                <li key={i} style={{
                  fontSize: 12, color: "rgba(245,241,234,.72)",
                  padding: "4px 10px", borderRadius: 0,
                  background: "rgba(255,255,255,.05)",
                  border: "1px solid rgba(255,255,255,.08)"
                }}>{a}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div className="footer-strip" style={{
          maxWidth: 1180, margin: "0 auto", padding: "18px 24px",
          display: "flex", justifyContent: "space-between", alignItems: "center",
          fontSize: 12, color: "rgba(245,241,234,.5)", gap: 16, flexWrap: "wrap"
        }}>
          <span>© 2026 Rainier Plumbing · Seattle, WA</span>
          <div style={{ display: "flex", gap: 22 }}>
            <a href="#" style={footerBottomLink}>Privacy</a>
            <a href="#" style={footerBottomLink}>Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

const footerLinkStyle: React.CSSProperties = {
  fontSize: 14, color: "rgba(245,241,234,.72)",
  textDecoration: "none", transition: "color .15s ease"
};
const footerBottomLink: React.CSSProperties = {
  color: "rgba(245,241,234,.55)", textDecoration: "none", fontSize: 12
};

function FooterHeader({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: 10.5, letterSpacing: "0.16em", textTransform: "uppercase",
      fontWeight: 600, color: "rgba(245,241,234,.45)",
      fontFamily: "'JetBrains Mono', monospace"
    }}>{children}</div>
  );
}
