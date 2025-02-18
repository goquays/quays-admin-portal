import { Tooltip } from "react-tooltip";
import React from "react";
import { cn } from "@/utils/cn";
import ExclamationIcon from "../../../public/assets/icons/exclamation-icon.svg";

type Props = {
  className?: string;
  tooltipClass?: string;
  toolTipId: string;
  toolTipContent: string;
  toolTipPlace?: string;
};

export default function HelpTooltip({
  className,
  tooltipClass,
  toolTipId,
  toolTipContent,
  toolTipPlace = "bottom",
}: Props) {
  return (
    // @ts-ignore
    <div
      className={cn("w-fit cursor-pointer", className)}
      data-tooltip-id={toolTipId}
      data-tooltip-content={toolTipContent}
      data-tooltip-place={toolTipPlace}
    >
      <ExclamationIcon className="h-6 w-6 mr-4 align-middle inline" /> <span className="underline">Need help?</span>
      <Tooltip
        id={toolTipId}
        className={cn("max-w-[270px] sm:max-w-[381px] w-full", tooltipClass)}
        border="2px solid #000034"
      />
    </div>
  );
}
