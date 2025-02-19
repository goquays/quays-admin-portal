"use client";
import { cn } from "@/utils/cn";
import Image from "next/image";
import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

type Props = {
  children: React.ReactNode;
  petDetailsProgress?: number;
  ownerDetailsProgress?: number;
  className?: string;
};

export default function QuoteLayout({
  children,
  className,
  petDetailsProgress = 100,
  ownerDetailsProgress = 0,
}: Props) {
  return (
    <div className={cn("w-full h-full bg-background", className)}>
      <div className="wrapper h-full w-full relative">
        <div className="flex items-center gap-4 min-h-[97px] lg:h-[97px] py-8 w-full sticky top-0 left-0 mx-auto z-[300] bg-background">
          <Image
            priority
            alt="Quays Logo"
            width={200}
            height={200}
            src="/assets/images/quays-logo-compact.png"
            className="lg:w-[116px] h-12 w-[90px] object-contain flex-shrink-0"
          />

          <div className="flex gap-5 lg:gap-8 flex-1 max-w-[828px] mx-auto h-full">
            <div className="flex flex-col gap-3 flex-1">
              <ProgressBar
                completed={petDetailsProgress}
                isLabelVisible={false}
                height="16px"
                bgColor="#000034"
                baseBgColor="#EAEAEA"
              />
              <p className="lg:text-lg text-base font-semibold text-center">Pet details</p>
            </div>

            <div className="flex flex-col gap-3 flex-1">
              <ProgressBar
                completed={ownerDetailsProgress}
                isLabelVisible={false}
                height="16px"
                bgColor="#000034"
                baseBgColor="#EAEAEA"
              />
              <p className="lg:text-lg text-base font-semibold text-center">Owner details</p>
            </div>
          </div>
        </div>

        {/* mt-[97px] */}
        <div className="w-full mt-[26px] max-w-[1124px] mx-auto">{children}</div>
      </div>
    </div>
  );
}
