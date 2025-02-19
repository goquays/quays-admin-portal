import { cn } from "@/utils/cn";
import React from "react";

type Props = {
  className?: string;
  heading?: string;
  text?: string;
  children?: React.ReactNode;
};

export default function TipBanner({ className, heading, text, children }: Props) {
  return (
    <div
      className={cn(
        "min-h-[189px] rounded-lg px-5 py-6 lg:px-6 bg-[rgba(0,0,52,0.1)] overflow-clip relative after:absolute after:left-0 after:top-0 after:h-full after:w-[6px] after:bg-[rgba(0,0,52,0.5)] after:z-[1]",
        className,
      )}
    >
      <div className="relative z-[2] flex flex-col gap-6">
        {heading && <h4 className="font-semibold lg:text-xl text-lg">{heading}</h4>}
        {text && <p className="lg:text-base text-sm text-[rgba(0,0,52,0.7)] max-w-[907px]">{text}</p>}
        {children}
      </div>
    </div>
  );
}
