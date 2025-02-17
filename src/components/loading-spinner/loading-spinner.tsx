import { cn } from "@/utils/cn";
import React from "react";
import { CgSpinner } from "react-icons/cg";

export default function LoadingSpinner({ spinnerColor, className }: { spinnerColor?: string; className?: string }) {
  return <CgSpinner className={cn("w-6 h-6 animate-spin", className)} color={spinnerColor} />;
}
