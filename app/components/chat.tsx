"use client";

import React, { useEffect, useRef, useState } from "react";
import * as Ic from "./icons";

const CANNED_REPLIES = [
  "Got it — sending this to our on-call plumber right now. One sec.",
  "Thanks! Can you share the address so we can check travel time?",
  "Noted. We can have someone out today — want to lock in a window?",
];

interface Message {
  from: "me" | "them";
  text: string;
  attachments?: Attachment[];
  time: string;
}

interface Attachment {
  id: number;
  color: string;
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      from: "them",
      text: "Hi! What's going on with your plumbing? Send us a photo if it helps — we'll get back to you within 10 minutes.",
      time: "now"
    }
  ]);
  const [typing, setTyping] = useState(false);
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing, open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 200);
  }, [open]);

  function send() {
    const text = input.trim();
    if (!text && attachments.length === 0) return;
    const atts = attachments;
    setMessages((m) => [...m, { from: "me", text, attachments: atts, time: "now" }]);
    setInput(""); setAttachments([]);
    setTyping(true);
    setTimeout(() => {
      const reply = CANNED_REPLIES[messages.length % CANNED_REPLIES.length];
      setMessages((m) => [...m, { from: "them", text: reply, time: "now" }]);
      setTyping(false);
    }, 1100 + Math.random() * 600);
  }

  function handleAttach() {
    const colors = ["#2A3A48", "#6B4121", "#3A2810", "#4A3A28", "#7A6A50"];
    setAttachments((a) => [...a, { id: Date.now(), color: colors[a.length % colors.length] }]);
  }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="chat-toggle" style={{
        position: "fixed", right: 20, bottom: 20, zIndex: 40,
        background: "var(--primary)", color: "#fff", border: "none",
        borderRadius: 999, padding: "14px 18px 14px 14px",
        boxShadow: "0 18px 36px -12px rgba(11,59,92,.5)",
        display: "inline-flex", alignItems: "center", gap: 10,
        cursor: "pointer", fontFamily: "inherit"
      }}>
        <span style={{
          width: 32, height: 32, borderRadius: "50%", background: "rgba(255,255,255,.14)",
          display: "grid", placeItems: "center"
        }}>
          <Ic.Chat size={18} stroke={2} />
        </span>
        <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", lineHeight: 1.2 }}>
          <span style={{ fontSize: 13.5, fontWeight: 600 }}>Text us</span>
          <span style={{ fontSize: 11.5, opacity: 0.8, marginTop: 2 }}>reply in under 10 min</span>
        </span>
        <span style={{
          position: "absolute", top: -3, right: -3,
          width: 14, height: 14, borderRadius: "50%", background: "#2E7D5B",
          border: "2px solid var(--primary)"
        }} />
      </button>
    );
  }

  return (
    <div className="chat-window" style={{
      position: "fixed", right: 20, bottom: 20, zIndex: 45,
      width: 360, height: 520, maxWidth: "calc(100vw - 32px)", maxHeight: "calc(100vh - 40px)",
      background: "#fff", borderRadius: "var(--r-l)",
      boxShadow: "0 24px 50px -10px rgba(0,0,0,.32), 0 0 0 1px rgba(14,27,36,.08)",
      display: "flex", flexDirection: "column", overflow: "hidden",
      fontFamily: "inherit",
      animation: "chatIn .22s cubic-bezier(.2,.9,.3,1.1)"
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "14px 16px",
        background: "linear-gradient(180deg, var(--primary), #082C46)",
        color: "#fff"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: "50%",
            background: "linear-gradient(135deg, #3D8BC6, #0B3B5C)",
            display: "grid", placeItems: "center",
            fontFamily: "'Inter Tight'", fontWeight: 700, fontSize: 14,
            border: "2px solid rgba(255,255,255,.2)"
          }}>RP</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>Rainier Plumbing</div>
            <div style={{ fontSize: 11.5, opacity: 0.78, display: "flex", alignItems: "center", gap: 5 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7BE495" }} />
              Usually replies in a few minutes
            </div>
          </div>
        </div>
        <button onClick={() => setOpen(false)} style={{
          background: "rgba(255,255,255,.12)", border: "none", color: "#fff",
          width: 30, height: 30, borderRadius: "50%", cursor: "pointer",
          display: "grid", placeItems: "center"
        }}><Ic.X size={16} stroke={2.25} /></button>
      </div>

      {/* Messages */}
      <div ref={scrollRef} style={{
        flex: 1, overflowY: "auto", padding: "18px 14px",
        background: "var(--surface-2)",
        display: "flex", flexDirection: "column", gap: 8
      }}>
        <div style={{
          textAlign: "center", fontSize: 11, letterSpacing: "0.06em",
          color: "var(--muted)", margin: "2px 0 6px", fontFamily: "'JetBrains Mono'"
        }}>iMessage · today 2:14 pm</div>

        {messages.map((m, i) => <MessageBubble key={i} msg={m} />)}

        {typing && (
          <div style={{ alignSelf: "flex-start", display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
            <div style={{
              background: "#E7E3DC", borderRadius: 18, padding: "10px 14px",
              display: "flex", gap: 4, alignItems: "center"
            }}>
              {[0, 1, 2].map((i) => (
                <span key={i} style={{
                  width: 6, height: 6, borderRadius: "50%", background: "#7A8088",
                  display: "inline-block",
                  animation: `typingDot 1.2s ${i * 0.15}s infinite`
                }} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Attachments preview */}
      {attachments.length > 0 && (
        <div style={{
          display: "flex", gap: 8, padding: "8px 12px", background: "#F0ECE3",
          borderTop: "1px solid var(--line)", overflowX: "auto"
        }}>
          {attachments.map((a) => (
            <div key={a.id} style={{
              width: 54, height: 54, borderRadius: 8, background: a.color, position: "relative",
              flexShrink: 0, overflow: "hidden"
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,.15), rgba(0,0,0,.3))"
              }} />
              <button onClick={() => setAttachments((x) => x.filter((i) => i.id !== a.id))}
                style={{
                  position: "absolute", top: 2, right: 2, width: 18, height: 18, borderRadius: "50%",
                  background: "rgba(0,0,0,.6)", color: "#fff", border: "none", cursor: "pointer",
                  display: "grid", placeItems: "center", fontSize: 10
                }}>×</button>
            </div>
          ))}
        </div>
      )}

      {/* Input row */}
      <div style={{
        padding: "10px 10px 12px", background: "#fff",
        borderTop: "1px solid var(--line)",
        display: "flex", alignItems: "flex-end", gap: 8
      }}>
        <button onClick={handleAttach} title="Attach photo" style={{
          background: "var(--surface-2)", border: "1px solid var(--line)", borderRadius: "50%",
          width: 36, height: 36, display: "grid", placeItems: "center",
          cursor: "pointer", color: "var(--ink-2)", flexShrink: 0
        }}><Ic.Paperclip size={16} /></button>

        <div style={{
          flex: 1, display: "flex", alignItems: "center",
          background: "var(--surface-2)", border: "1px solid var(--line)",
          borderRadius: 22, padding: "4px 6px 4px 14px", minHeight: 36
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            placeholder="iMessage"
            style={{
              flex: 1, border: "none", outline: "none", background: "transparent",
              fontSize: 14, fontFamily: "inherit", color: "var(--ink)"
            }}
          />
          <button
            onClick={send}
            disabled={!input.trim() && attachments.length === 0}
            style={{
              width: 30, height: 30, borderRadius: "50%",
              background: (input.trim() || attachments.length > 0) ? "var(--primary)" : "#C5CFD7",
              color: "#fff", border: "none",
              cursor: (input.trim() || attachments.length > 0) ? "pointer" : "default",
              display: "grid", placeItems: "center", marginLeft: 4
            }}><Ic.ArrowRight size={14} stroke={2.5} /></button>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const me = msg.from === "me";
  return (
    <div style={{
      alignSelf: me ? "flex-end" : "flex-start",
      maxWidth: "78%",
      display: "flex", flexDirection: "column", gap: 4,
      alignItems: me ? "flex-end" : "flex-start"
    }}>
      {msg.attachments && msg.attachments.length > 0 && (
        <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: me ? "flex-end" : "flex-start" }}>
          {msg.attachments.map((a) => (
            <div key={a.id} style={{
              width: 140, height: 100, borderRadius: 14, background: a.color,
              position: "relative", overflow: "hidden"
            }}>
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,.14), rgba(0,0,0,.35))"
              }} />
              <span style={{
                position: "absolute", bottom: 6, left: 8, fontSize: 10,
                color: "rgba(255,255,255,.75)", fontFamily: "'JetBrains Mono'"
              }}>IMG_{String(a.id).slice(-4)}.jpg</span>
            </div>
          ))}
        </div>
      )}
      {msg.text && (
        <div style={{
          background: me ? "#1E6FA8" : "#E7E3DC",
          color: me ? "#fff" : "var(--ink)",
          borderRadius: me ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
          padding: "9px 13px", fontSize: 14, lineHeight: 1.4
        }}>
          {msg.text}
        </div>
      )}
    </div>
  );
}
