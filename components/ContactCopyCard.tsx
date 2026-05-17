"use client";

import { useState } from "react";

type ContactCopyCardProps = {
  label: string;
  value: string;
  copyValue?: string;
};

export default function ContactCopyCard({
  copyValue,
  label,
  value,
}: ContactCopyCardProps) {
  const [isCopied, setIsCopied] = useState(false);
  const contactValue = copyValue ?? value;

  async function copyContact() {
    if (!navigator.clipboard) {
      return;
    }

    await navigator.clipboard.writeText(contactValue);
    setIsCopied(true);
    window.setTimeout(() => setIsCopied(false), 1600);
  }

  return (
    <button
      type="button"
      onClick={copyContact}
      className="group rounded-[26px] border border-zinc-200/80 bg-white p-5 text-left shadow-[0_14px_48px_rgba(15,23,42,0.035)] outline-none transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-[0_22px_64px_rgba(15,23,42,0.07)] focus-visible:border-zinc-400"
    >
      <span className="mb-2.5 block text-sm leading-6 text-zinc-500">
        {label}
      </span>
      <span className="block text-[1.12rem] font-semibold leading-snug tracking-tight text-zinc-950">
        {value}
      </span>
      <span className="mt-4 block text-sm leading-6 text-zinc-500 transition group-hover:text-zinc-700">
        {isCopied ? "Скопировано" : "Скопировать"}
      </span>
    </button>
  );
}
