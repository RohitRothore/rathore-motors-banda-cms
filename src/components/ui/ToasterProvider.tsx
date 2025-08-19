"use client";

import { Toaster } from "sonner";

export default function ToasterProvider() {
  return (
    <Toaster richColors position="top-right" expand visibleToasts={3} />
  );
}


