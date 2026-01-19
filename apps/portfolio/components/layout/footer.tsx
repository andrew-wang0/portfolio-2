"use client";

import React from "react";

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-6xl justify-end px-6 py-2">
      <button
        className="text-muted-foreground/75 cursor-pointer"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Andrew Wang
      </button>
    </footer>
  );
}
