"use client";

import React, { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Subtle 200ms smooth fade-in for editorial page mount
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return null;
}
