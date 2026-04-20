"use client";

import React from "react";

interface IconProps {
  size?: number;
  stroke?: number;
  fill?: string;
  className?: string;
}

const S = ({
  size = 22,
  children,
  stroke = 1.75,
  fill = "none",
}: {
  size?: number;
  children: React.ReactNode;
  stroke?: number;
  fill?: string;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={fill}
    stroke="currentColor"
    strokeWidth={stroke}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {children}
  </svg>
);

export const Drop = (p: IconProps) => (
  <S {...p}><path d="M12 3.5c3 4 6 7 6 10.5a6 6 0 1 1-12 0C6 10.5 9 7.5 12 3.5Z" /></S>
);
export const Alert = (p: IconProps) => (
  <S {...p}><path d="M12 3.8 2.8 19.2a1.4 1.4 0 0 0 1.2 2.1h16a1.4 1.4 0 0 0 1.2-2.1Z" /><path d="M12 10v4.5" /><path d="M12 17.5h.01" /></S>
);
export const Calendar = (p: IconProps) => (
  <S {...p}><rect x="3.5" y="4.5" width="17" height="16" rx="2.5" /><path d="M3.5 9.5h17" /><path d="M8 3v3" /><path d="M16 3v3" /></S>
);
export const Check = (p: IconProps) => (
  <S {...p}><path d="M4.5 12.5 10 18 20 7" /></S>
);
export const CheckCircle = (p: IconProps) => (
  <S {...p}><circle cx="12" cy="12" r="9" /><path d="M8 12.5 11 15.5 16.5 9.5" /></S>
);
export const Phone = (p: IconProps) => (
  <S {...p}><path d="M5 4.5h3l1.5 4-2 1.3a12 12 0 0 0 6.7 6.7l1.3-2 4 1.5V19a2 2 0 0 1-2 2 16 16 0 0 1-15-15 2 2 0 0 1 2-1.5Z" /></S>
);
export const Pin = (p: IconProps) => (
  <S {...p}><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z" /><circle cx="12" cy="9.5" r="2.6" /></S>
);
export const Locate = (p: IconProps) => (
  <S {...p}><circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="8" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="M2 12h2" /><path d="M20 12h2" /></S>
);
export const ArrowLeft = (p: IconProps) => (
  <S {...p}><path d="M15 5l-7 7 7 7" /></S>
);
export const ArrowRight = (p: IconProps) => (
  <S {...p}><path d="M9 5l7 7-7 7" /></S>
);
export const Wrench = (p: IconProps) => (
  <S {...p}><path d="M14.5 3.5a4.5 4.5 0 0 0-5.6 5.6L3 15l3 3 5.9-5.9a4.5 4.5 0 0 0 5.6-5.6l-2.6 2.6-2.4-.6-.6-2.4Z" /></S>
);
export const Flame = (p: IconProps) => (
  <S {...p}><path d="M8.5 14.5A2.5 2.5 0 0 0 11 17c1.5 0 2.8-.5 3.6-1.4.7-.7 1.4-2.1 1.4-3.6 0-2-1-3-1.6-4.1A12.3 12.3 0 0 0 12 2c-1 2.5-1 4.5-.5 6 .5 1.5-.1 2.3-1 2.5-.9.2-1.5-.3-1.9-1C8 10.4 8 11 8 12c0 1 .2 1.8.5 2.5Z" /></S>
);
export const Toilet = (p: IconProps) => (
  <S {...p}>
    <path d="M14 3h6v10h-6z" />
    <path d="M3 9h11v4a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5Z" />
    <path d="M6 18v3h5v-3" />
    <path d="M14 11h-2" strokeOpacity={0.6} />
  </S>
);
export const Search = (p: IconProps) => (
  <S {...p}><circle cx="11" cy="11" r="6.5" /><path d="M20 20l-4-4" /></S>
);
export const Dots = (p: IconProps) => (
  <S {...p} fill="currentColor">
    <circle cx="6" cy="12" r="1.2" stroke="none" />
    <circle cx="12" cy="12" r="1.2" stroke="none" />
    <circle cx="18" cy="12" r="1.2" stroke="none" />
  </S>
);
export const Shield = (p: IconProps) => (
  <S {...p}><path d="M12 3 4.5 6v6c0 4.5 3.2 7.6 7.5 9 4.3-1.4 7.5-4.5 7.5-9V6Z" /><path d="M9 12.5 11 14.5 15 10.5" /></S>
);
export const Star = (p: IconProps) => (
  <S {...p} fill="currentColor"><path d="M12 3.5 14.4 9l5.9.5-4.5 3.9 1.4 5.8L12 16l-5.2 3.2 1.4-5.8L3.7 9.5 9.6 9Z" /></S>
);
export const Clock = (p: IconProps) => (
  <S {...p}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></S>
);
export const Chat = (p: IconProps) => (
  <S {...p}><path d="M21 12a8 8 0 0 1-11.5 7.2L4 20.5l1.3-4.4A8 8 0 1 1 21 12Z" /></S>
);
export const Paperclip = (p: IconProps) => (
  <S {...p}><path d="M20 11.5 12.5 19a5 5 0 0 1-7-7l7.8-7.8a3.5 3.5 0 1 1 5 5L10.3 17a2 2 0 1 1-2.8-2.8L14 7.7" /></S>
);
export const X = (p: IconProps) => (
  <S {...p}><path d="M6 6l12 12" /><path d="M18 6 6 18" /></S>
);
export const Handle = (p: IconProps) => (
  <S {...p}><path d="M8 4v16" /><path d="M16 4v16" /></S>
);
export const ArrowRightIcon = ArrowRight;
