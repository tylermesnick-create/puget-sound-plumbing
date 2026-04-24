"use client";

import React from "react";
import { Header, Progress, TrustStrip } from "./components/shell";
import { NavBar, SiteFooter } from "./components/nav-footer";
import { Step1 } from "./components/step1";
import { Step2 } from "./components/step2";
import { Step3, Slot } from "./components/step3";
import { Step4, Success, Contact } from "./components/step4";
import { ServiceAreaSection } from "./components/service-area";
import { GallerySection } from "./components/gallery";
import { ReviewCaptureSection } from "./components/review-capture";
import { ChatWidget } from "./components/chat";
import * as Ic from "./components/icons";

const STEP_LABELS = ["Intent", "Service", "Schedule", "Confirm"];

export default function RainierPlumbing() {
  const [step, setStep] = React.useState(1);
  const [intent, setIntent] = React.useState<string | null>(null);
  const [service, setService] = React.useState<string | null>(null);
  const [slot, setSlot] = React.useState<Slot | null>(null);
  const [contact, setContact] = React.useState<Contact>({ name: "", phone: "", address: "", notes: "" });
  const [done, setDone] = React.useState(false);

  function onCall() {
    alert("📞 Calling (206) 420-1188…\n\nIn a real app this would start a phone call.");
  }

  function handlePickIntent(id: string) {
    setIntent(id);
    goTo(2);
  }

  function goTo(n: number) {
    setStep(n);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function reset() {
    setStep(1); setIntent(null); setService(null); setSlot(null);
    setContact({ name: "", phone: "", address: "", notes: "" });
    setDone(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <div id="top" />
      <Header onCall={onCall} />
      <NavBar onBook={() => { if (step !== 1) goTo(1); }} />

      {!done && <Progress step={step} total={4} labels={STEP_LABELS} />}

      <main style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {done ? (
          <Success
            intent={intent}
            service={service}
            slot={slot!}
            contact={contact}
            onReset={reset}
          />
        ) : step === 1 ? (
          <>
            <Step1 onPick={handlePickIntent} />
            <ServiceAreaSection />
            <GallerySection />
            <ReviewCaptureSection />
          </>
        ) : step === 2 ? (
          <Step2
            intent={intent}
            selected={service}
            onSelect={setService}
            onBack={() => goTo(1)}
            onNext={() => goTo(3)}
          />
        ) : step === 3 ? (
          <Step3
            intent={intent}
            service={service}
            selectedSlot={slot}
            onSelectSlot={setSlot}
            onBack={() => goTo(2)}
            onNext={() => goTo(4)}
          />
        ) : (
          <Step4
            intent={intent}
            service={service}
            slot={slot!}
            contact={contact}
            setContact={setContact}
            onBack={() => goTo(3)}
            onConfirm={() => { setDone(true); window.scrollTo({ top: 0, behavior: "smooth" }); }}
          />
        )}
      </main>

      <TrustStrip />
      <SiteFooter />

      {/* Persistent SMS chat widget */}
      <ChatWidget />

      {/* Floating call button on mobile */}
      <a href="tel:+12064201188" className="fab-call" style={{
        position: "fixed", right: 16, bottom: 16, zIndex: 30,
        background: "var(--ink)", color: "#fff", textDecoration: "none",
        borderRadius: 999, padding: "14px 18px",
        boxShadow: "0 12px 30px -10px rgba(0,0,0,.4)",
        display: "none", alignItems: "center", gap: 8, fontWeight: 600, fontSize: 14
      }}>
        <Ic.Phone size={16} /> Call us
      </a>
    </>
  );
}
