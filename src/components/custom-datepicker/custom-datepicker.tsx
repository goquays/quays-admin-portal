import { cn } from "@/utils/cn";
import { getYear } from "date-fns";
import React from "react";

type Props = {
  className?: string;
  onChangeDay: (value: string) => void;
  onChangeMonth: (value: string) => void;
  onChangeYear: (value: string) => void;
  error?: string | boolean;
  value?: string;
  inputClass?: string;
};

export default function CustomDatePicker({
  className,
  onChangeDay,
  onChangeMonth,
  onChangeYear,
  error,
  value,
  inputClass,
}: Props) {
  return (
    <div className={cn("w-full h-fit", className)}>
      <div
        className={`border w-full h-[67px] grid grid-cols-3 rounded-lg bg-background overflow-clip py-[15px] ${error ? "border-red" : "border-border"}`}
      >
        <input
          placeholder="DD"
          type="number"
          min={1}
          max={31}
          value={value?.split("-")[2]}
          onChange={(e) => {
            if ((e.target.value && Number(e.target.value) > 31) || (e.target.value && Number(e.target.value) < 1))
              return;
            onChangeDay(e.target.value);
          }}
          className={cn("bg-transparent h-full border-none pl-6", inputClass)}
        />
        <input
          placeholder="MM"
          type="number"
          min={1}
          max={12}
          value={value?.split("-")[1]}
          onChange={(e) => {
            if ((e.target.value && Number(e.target.value) > 12) || (e.target.value && Number(e.target.value) < 1))
              return;
            // const val = e.target.value.replace(/[^0-9+]/g, "");
            onChangeMonth(e.target.value);
          }}
          className={cn("bg-transparent h-full border-y-0 focus:border-black text-center", inputClass)}
        />
        <input
          placeholder="YYYY"
          type="number"
          min={1}
          max={getYear(new Date())}
          value={value?.split("-")[0]}
          onChange={(e) => {
            if (
              e.target.value.length === 5 ||
              (e.target.value && Number(e.target.value) > getYear(new Date())) ||
              (e.target.value && Number(e.target.value) < 1)
            )
              return;
            onChangeYear(e.target.value);
          }}
          className={cn("bg-transparent h-full border-none px-6 text-center", inputClass)}
        />
      </div>

      {error && <span className="text-red text-sm mt-1 block w-fit">{error}</span>}
    </div>
  );
}
