import { cn } from "@/utils/cn";
import React from "react";

type Props = {
  className?: string;
  label: string;
  value: string;
  selectedValue: string;
  onSelect: (value: string) => void;
};

export default function OptionsPill({ className, label, value, selectedValue, onSelect }: Props) {
  const isSelected = selectedValue === value;

  return (
    <div
      role="button"
      onClick={() => onSelect(value)}
      className={cn(
        `w-full h-[67px] flex items-center gap-[10px] px-4 lg:px-6 py-[10px] border rounded-lg ${isSelected ? "bg-[rgba(0,0,219,0.15)] border-primary" : "bg-transparent border-border"}`,
        className,
      )}
    >
      <span className="w-6 h-6 rounded-[50%] border border-border flex items-center justify-center flex-shrink-0">
        <span className={`h-[18px] w-[18px] rounded-[50%] ${isSelected ? "bg-primary" : "bg-transparent"}`}></span>
      </span>
      <span className="text-base font-medium">{label}</span>
    </div>
  );
}
