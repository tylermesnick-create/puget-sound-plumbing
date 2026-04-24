"use client";

import React, { useState } from "react";

// Replace with client's Google review URL. Get it from their Google Business Profile:
// Google Business → Home → "Get more reviews" → copy short link
// Format looks like: https://g.page/r/[UNIQUE_ID]/review
const GOOGLE_REVIEW_URL = "https://www.google.com/maps/place/Salish+Plumbing+Co/@47.753642,-122.4195317,13z/data=!4m11!1m2!2m1!1splumber+seattle!3m7!1s0x2bb666adb4fd7973:0x2fdc6d1197ce9c98!8m2!3d47.7536423!4d-122.3433143!9m1!1b1!16s%2Fg%2F11vwf9cwft?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D/review";

interface ReviewCaptureProps {
  businessName?: string;
  googleReviewUrl?: string;
  recipientEmail?: string;
}

type Phase = "stars" | "form" | "done";

interface FormData {
  name: string;
  phone: string;
  email: string;
  what_went_wrong: string;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 16px",
  border: "1.5px solid var(--line)",
  borderRadius: "var(--r-m)",
  fontSize: 15,
  fontFamily: "'Inter', sans-serif",
  color: "var(--ink)",
  background: "var(--surface)",
  outline: "none",
  transition: "border-color .15s ease",
};

export function ReviewCaptureSection({
  businessName = "Rainier Plumbing",
  googleReviewUrl = GOOGLE_REVIEW_URL,
  recipientEmail = "tyler@cascadedigital.co",
}: ReviewCaptureProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [phase, setPhase] = useState<Phase>("stars");
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    what_went_wrong: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function handleStarClick(star: number) {
    setRating(star);
    if (star >= 4) {
      window.open(googleReviewUrl, "_blank", "noopener,noreferrer");
    } else {
      setPhase("form");
    }
  }

  function handleStarKey(e: React.KeyboardEvent, star: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleStarClick(star);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.phone || form.what_went_wrong.length < 10) return;
    setSubmitting(true);
    try {
      await fetch("/api/private-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, ...form, businessName, recipientEmail }),
      });
    } catch {
      // Network error — the API itself handles graceful degradation and console logging
    }
    setPhase("done");
    setSubmitting(false);
  }

  const displayStars = hovered ?? rating ?? 0;
  const canSubmit =
    !submitting && form.name.trim() && form.phone.trim() && form.what_went_wrong.length >= 10;

  return (
    <section
      id="review-capture"
      style={{
        borderTop: "1px solid var(--line)",
        background: "var(--surface-2)",
        padding: "64px 24px",
      }}
    >
      <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
        {/* Eyebrow */}
        <span
          className="mono"
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            color: "var(--primary-2)",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Share your experience
        </span>

        {/* Heading */}
        <h2
          style={{
            fontFamily: "'Inter Tight', sans-serif",
            fontSize: 32,
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
            marginTop: 10,
            color: "var(--ink)",
          }}
        >
          How was your service?
        </h2>

        <p
          style={{
            marginTop: 12,
            fontSize: 16,
            color: "var(--ink-2)",
            lineHeight: 1.6,
          }}
        >
          Had work done by {businessName}? Let us know how it went.
        </p>

        {/* Stars — always visible until done */}
        {phase !== "done" && (
          <div
            role="group"
            aria-label="Rate your experience from 1 to 5 stars"
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 6,
              marginTop: 32,
            }}
          >
            {[1, 2, 3, 4, 5].map((star) => {
              const filled = star <= displayStars;
              return (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  onKeyDown={(e) => handleStarKey(e, star)}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(null)}
                  aria-label={`Rate ${star} star${star !== 1 ? "s" : ""}`}
                  aria-pressed={rating === star}
                  style={{
                    /* min 44px tap target */
                    width: 52,
                    height: 52,
                    padding: 6,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    borderRadius: "var(--r-s)",
                    color: filled ? "var(--primary-2)" : "var(--line)",
                    transition: "color 0.15s ease, transform 0.12s ease",
                    transform: filled ? "scale(1.12)" : "scale(1)",
                    display: "grid",
                    placeItems: "center",
                  }}
                >
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    fill={filled ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={filled ? 0 : 1.5}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 3.5 14.4 9l5.9.5-4.5 3.9 1.4 5.8L12 16l-5.2 3.2 1.4-5.8L3.7 9.5 9.6 9Z" />
                  </svg>
                </button>
              );
            })}
          </div>
        )}

        {/* Inline feedback form — slides in for 1–3 stars */}
        {phase === "form" && (
          <form
            onSubmit={handleSubmit}
            noValidate
            style={{
              marginTop: 28,
              textAlign: "left",
              animation: "fadeUp .35s ease both",
            }}
          >
            <div
              style={{
                background: "var(--surface)",
                borderRadius: "var(--r-l)",
                border: "1px solid var(--line)",
                padding: "28px 24px 24px",
                boxShadow: "var(--shadow-sm)",
              }}
            >
              <p
                style={{
                  fontSize: 14,
                  color: "var(--ink-2)",
                  lineHeight: 1.6,
                  marginBottom: 22,
                }}
              >
                We&apos;re sorry to hear that. Tell us what happened — the owner
                reviews every response personally.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {/* Name */}
                <div>
                  <label
                    htmlFor="rc-name"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 6,
                    }}
                  >
                    Your name{" "}
                    <span style={{ color: "var(--accent)" }}>*</span>
                  </label>
                  <input
                    id="rc-name"
                    type="text"
                    required
                    autoComplete="name"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="rc-phone"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 6,
                    }}
                  >
                    Phone number{" "}
                    <span style={{ color: "var(--accent)" }}>*</span>
                  </label>
                  <input
                    id="rc-phone"
                    type="tel"
                    required
                    autoComplete="tel"
                    placeholder="(206) 555-0100"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="rc-email"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 6,
                    }}
                  >
                    Email{" "}
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: 400,
                        color: "var(--muted)",
                      }}
                    >
                      (optional)
                    </span>
                  </label>
                  <input
                    id="rc-email"
                    type="email"
                    autoComplete="email"
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    style={inputStyle}
                  />
                </div>

                {/* What went wrong */}
                <div>
                  <label
                    htmlFor="rc-feedback"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 600,
                      color: "var(--ink)",
                      marginBottom: 6,
                    }}
                  >
                    What went wrong?{" "}
                    <span style={{ color: "var(--accent)" }}>*</span>
                  </label>
                  <textarea
                    id="rc-feedback"
                    required
                    minLength={10}
                    rows={4}
                    placeholder="Please describe what happened and how we can make it right…"
                    value={form.what_went_wrong}
                    onChange={(e) =>
                      setForm({ ...form, what_went_wrong: e.target.value })
                    }
                    style={{ ...inputStyle, resize: "vertical", minHeight: 100 }}
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={!canSubmit}
                  style={{
                    marginTop: 4,
                    background: canSubmit ? "var(--ink)" : "#BFC8D1",
                    color: "#fff",
                    border: "none",
                    borderRadius: 999,
                    padding: "14px 24px",
                    fontSize: 15,
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    cursor: canSubmit ? "pointer" : "not-allowed",
                    width: "100%",
                    transition: "background .15s ease",
                    boxShadow: canSubmit
                      ? "0 8px 18px -10px rgba(14,27,36,.4)"
                      : "none",
                  }}
                >
                  {submitting ? "Sending…" : "Send Feedback"}
                </button>
              </div>

              <p
                style={{
                  marginTop: 16,
                  fontSize: 12,
                  color: "var(--muted)",
                  lineHeight: 1.6,
                  textAlign: "center",
                }}
              >
                This feedback goes directly to the owner and won&apos;t be
                posted publicly. We&apos;ll reach out within 24 hours to make it
                right.
              </p>
            </div>
          </form>
        )}

        {/* Confirmation */}
        {phase === "done" && (
          <div
            style={{
              marginTop: 32,
              animation: "fadeUp .35s ease both",
              background: "var(--surface)",
              borderRadius: "var(--r-l)",
              border: "1px solid var(--line)",
              padding: "44px 28px",
              boxShadow: "var(--shadow-sm)",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(46,125,91,.1)",
                color: "var(--ok)",
                display: "grid",
                placeItems: "center",
                margin: "0 auto 16px",
              }}
              aria-hidden="true"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4.5 12.5 10 18 20 7" />
              </svg>
            </div>
            <h3
              style={{
                fontFamily: "'Inter Tight', sans-serif",
                fontSize: 20,
                fontWeight: 700,
                color: "var(--ink)",
                marginBottom: 8,
              }}
            >
              Thanks — we&apos;ll make it right.
            </h3>
            <p
              style={{
                fontSize: 15,
                color: "var(--ink-2)",
                lineHeight: 1.6,
              }}
            >
              The owner will reach out within 24 hours.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
