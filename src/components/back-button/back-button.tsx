import { cn } from "@/utils/cn";
import React from "react";
import ArrowLeft from "../../../public/assets/icons/left-arrow-circle.svg";
import { useRouter } from "next/navigation";

type Props = {
  className?: string;
  onClick?: () => void;
};

export default function BackButton({ className, onClick }: Props) {
  const router = useRouter();

  return (
    <button
      className={cn("w-fit h-fit flex items-center justify-center", className)}
      onClick={() => {
        router.back();
        onClick?.();
      }}
    >
      <ArrowLeft className="lg:w-10 lg:h-10 w-8 h-8" />
    </button>
  );
}
