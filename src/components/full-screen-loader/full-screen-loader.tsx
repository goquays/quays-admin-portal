import React from "react";
import LoadingSpinner from "../loading-spinner/loading-spinner";
import { cn } from "@/utils/cn";

export default function FullScreenLoader({ className }: { className?: string }) {
  return (
    <div>
      <div
        className={cn(
          "w-full h-screen bg-white fixed top-0 left-0 z-[1000] flex flex-col items-center justify-center",
          className,
        )}
      >
        <LoadingSpinner className="h-6 w-6" />
        <p className="text-sm font-medium text-center mt-1">Please wait...</p>
      </div>
    </div>
  );
}
