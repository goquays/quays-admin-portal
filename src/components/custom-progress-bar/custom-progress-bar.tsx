import { cn } from "@/utils/cn";
import React from "react";

type Props = {
  className?: string;
  length?: number;
  currentIndex?: number;
};

export default function CustomProgressBar({ className, length = 4, currentIndex = 1 }: Props) {
  return (
    <ul className={cn("flex w-full gap-1", className)}>
      {new Array(length).fill(0).map((_, index) => {
        const isActive = currentIndex > index;

        return <li key={index} className={`flex-1 rounded-2xl h-[6px] ${isActive ? "bg-primary" : "bg-[#EAEAEA]"}`} />;
      })}
    </ul>
  );
}
