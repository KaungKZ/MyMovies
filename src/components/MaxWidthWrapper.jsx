import React from "react";

import { cn } from "@/lib/utils";

export default function MaxWidthWrapper({ children, cls = "" }) {
  return (
    <div
      className={cn("max-w-[1280px] mx-auto px-20 lgmx:px-10 smmx:px-4", cls)}
    >
      {children}
    </div>
  );
}
