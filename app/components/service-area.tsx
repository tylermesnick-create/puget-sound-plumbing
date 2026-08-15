"use client";

import React from "react";
import * as Ic from "./icons";

const VALID_ZIPS = ["98101", "98103", "98105", "98107", "98109", "98115", "98117", "98122", "98125", "98133", "98144"];

const ZIP_TO_LABEL: Record<string, string> = {
  "98101": "Downtown Seattle", "98103": "Fremont & Wallingford", "98105": "University District",
  "98107": "Ballard", "98109": "Queen Anne", "98115": "Ravenna",
  "98117": "Greenwood & Loyal Heights", "98122": "Capitol Hill & Central District",
  "98125": "Lake City", "98133": "Shoreline", "98144": "Mount Baker & Leschi"
};

interface CheckResult {
  status: "in" | "out" | "error";
  zip?: string;
  hood?: string;
  eta?: number;
  msg?: string;
}

const linkBtnStyle: React.CSSProperties = {
  background: "none", border: "none", padding: 0, color: "var(--primary)",
  fontWeight: 600, cursor: "pointer", fontSize: 12.5, marginLeft: 4, marginRight: 4
};

export function ServiceAreaSection() {
  const [zip, setZip] = React.useState("");
  const [result, setResult] = React.useState<CheckResult | null>(null);
  const [checking, setChecking] = React.useState(false);

  function check(e: React.FormEvent | null, overrideZip?: string) {
    if (e) e.preventDefault();
    const z = (overrideZip ?? zip).trim();
    if (!/^\d{5}$/.test(z)) {
      setResult({ status: "error", msg: "Enter a 5-digit ZIP code." });
      return;
    }
    setChecking(true);
    setTimeout(() => {
      if (VALID_ZIPS.includes(z)) {
        const hood = ZIP_TO_LABEL[z];
        const eta = 14 + ((parseInt(z.slice(-2), 10) * 3) % 22);
        setResult({ status: "in", zip: z, hood, eta });
      } else {
        setResult({ status: "out", zip: z });
      }
      setChecking(false);
    }, 400);
  }

  return (
    <section id="service-area" style={{
      borderTop: "1px solid var(--line)", background: "var(--surface-2)",
      padding: "64px 24px"
    }}>
      <div style={{ maxWidth: 1180, margin: "0 auto" }}>
        <div
          className="svc-area-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: 40, alignItems: "center" }}
        >
          <div>
            <span className="mono" style={{
              fontSize: 11, letterSpacing: "0.14em", color: "var(--primary-2)",
              textTransform: "uppercase", fontWeight: 600
            }}>Coverage · Puget Sound</span>
            <h2 style={{
              fontSize: 38, fontWeight: 700, lineHeight: 1.05, letterSpacing: "-0.02em", marginTop: 10
            }}>Do we serve your area?</h2>
            <p style={{ fontSize: 16, color: "var(--ink-2)", marginTop: 10, lineHeight: 1.55, maxWidth: 520 }}>
              Type in your ZIP and we&apos;ll tell you on the spot. We cover most of Seattle
              and the close-in Eastside; if we can&apos;t reach you we&apos;ll refer you to a plumber we trust.
            </p>

            <form onSubmit={check} style={{
              marginTop: 24, display: "flex", gap: 10, maxWidth: 440,
              background: "#fff", border: "1.5px solid var(--line)",
              borderRadius: 0, padding: 6, boxShadow: "var(--shadow-sm)"
            }}>
              <input
                value={zip}
                onChange={(e) => setZip(e.target.value.replace(/\D/g, "").slice(0, 5))}
                inputMode="numeric"
                placeholder="e.g. 98103"
                style={{
                  flex: 1, border: "none", outline: "none", padding: "12px 18px",
                  fontSize: 16, background: "transparent", color: "var(--ink)",
                  fontFamily: "inherit", letterSpacing: "0.02em"
                }}
              />
              <button type="submit" disabled={checking} style={{
                background: "var(--primary)", color: "#fff", border: "none",
                borderRadius: 0, padding: "12px 22px", fontSize: 14, fontWeight: 600,
                cursor: checking ? "wait" : "pointer", display: "inline-flex", alignItems: "center", gap: 6,
                whiteSpace: "nowrap"
              }}>
                {checking ? "Checking…" : <><span>Check</span> <Ic.ArrowRight size={14} /></>}
              </button>
            </form>

            <div style={{ marginTop: 12, fontSize: 12.5, color: "var(--muted)" }}>
              Try{" "}
              <button type="button" onClick={() => { setZip("98107"); check(null, "98107"); }} style={linkBtnStyle}>
                98107 (Ballard)
              </button>
              ·
              <button type="button" onClick={() => { setZip("98122"); check(null, "98122"); }} style={linkBtnStyle}>
                98122 (Cap Hill)
              </button>
              ·
              <button type="button" onClick={() => { setZip("98052"); check(null, "98052"); }} style={linkBtnStyle}>
                98052 (Redmond)
              </button>
            </div>

            {result && (
              <div style={{
                marginTop: 22, padding: "18px 20px",
                background: result.status === "in" ? "linear-gradient(180deg, #E9F5EE, #fff)"
                  : result.status === "out" ? "#FFF6F0" : "#fff",
                border: `1.5px solid ${result.status === "in" ? "#BEE3CE"
                  : result.status === "out" ? "rgba(214,74,43,.25)" : "var(--line)"}`,
                borderRadius: "var(--r-l)", maxWidth: 540,
                animation: "fadeUp .3s ease"
              }}>
                {result.status === "in" && (
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: "50%", background: "#2E7D5B",
                      color: "#fff", display: "grid", placeItems: "center", flexShrink: 0
                    }}><Ic.Check size={18} stroke={3} /></span>
                    <div>
                      <div style={{ fontFamily: "'Inter Tight'", fontSize: 20, fontWeight: 700, color: "var(--ink)" }}>
                        Yes — we serve {result.hood}.
                      </div>
                      <div style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 4, lineHeight: 1.5 }}>
                        Average response time in <span className="mono">{result.zip}</span>:
                        <strong style={{ color: "var(--ink)" }}> {result.eta} minutes</strong> for emergencies.
                      </div>
                    </div>
                  </div>
                )}
                {result.status === "out" && (
                  <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <span style={{
                      width: 36, height: 36, borderRadius: "50%", background: "var(--accent-soft)",
                      color: "var(--accent)", display: "grid", placeItems: "center", flexShrink: 0
                    }}><Ic.Pin size={18} /></span>
                    <div>
                      <div style={{ fontFamily: "'Inter Tight'", fontSize: 20, fontWeight: 700, color: "var(--ink)" }}>
                        We don't reach this area yet.
                      </div>
                      <div style={{ fontSize: 14, color: "var(--ink-2)", marginTop: 4, lineHeight: 1.5 }}>
                        <span className="mono">{result.zip}</span> is outside our zone — but we can refer
                        you to a trusted partner with the same background checks.
                      </div>
                      <button style={{
                        marginTop: 12, background: "var(--ink)", color: "#fff", border: "none",
                        borderRadius: 0, padding: "9px 16px", fontSize: 13.5, fontWeight: 600, cursor: "pointer"
                      }}>Get a referral</button>
                    </div>
                  </div>
                )}
                {result.status === "error" && (
                  <div style={{ display: "flex", gap: 10, alignItems: "center", fontSize: 14, color: "var(--ink-2)" }}>
                    <Ic.Alert size={18} /> {result.msg}
                  </div>
                )}
              </div>
            )}
          </div>

          <ServiceAreaMap result={result} />
        </div>
      </div>
    </section>
  );
}

function ServiceAreaMap({ result }: { result: CheckResult | null }) {
  return (
    <div style={{
      background: "#fff", border: "1px solid var(--line)",
      borderRadius: "var(--r-xl)", padding: 18, boxShadow: "var(--shadow-md)",
      position: "relative", overflow: "hidden"
    }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        marginBottom: 12, padding: "0 4px"
      }}>
        <div className="mono" style={{
          fontSize: 11, letterSpacing: "0.14em", color: "var(--muted)", textTransform: "uppercase"
        }}>Service map · Seattle</div>
        <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 10, height: 10, borderRadius: 0, background: "var(--primary-2)", opacity: 0.32 }} />
            coverage
          </span>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#E8F0F6", border: "1px solid #CFE0EC" }} />
            water
          </span>
        </div>
      </div>

      {/* Real embedded Google map (no API key required) */}
      <div style={{
        position: "relative",
        aspectRatio: "4/3",
        width: "100%",
        borderRadius: "var(--r-l)",
        overflow: "hidden",
        border: "1px solid var(--line)"
      }}>
        <iframe
          title="Rainier Plumbing service area — Seattle"
          src="https://maps.google.com/maps?q=Seattle,WA&z=10&output=embed"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, filter: "grayscale(0.12) contrast(1.03)" }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <div style={{
        marginTop: 12, fontSize: 11, color: "var(--muted)", textAlign: "center",
        fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.08em"
      }}>
        SEATTLE · SHORELINE · EASTSIDE · PUGET SOUND
      </div>
    </div>
  );
}
