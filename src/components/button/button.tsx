import React, { ComponentProps } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/cn";
import Link from "next/link";
import LoadingSpinner from "../loading-spinner/loading-spinner";

const buttonStyles = cva(
  [
    "font-medium",
    "text-base",
    "h-20",
    "w-fit",
    "whitespace-nowrap",
    "flex",
    "items-center",
    "justify-center",
    "gap-[10px]",
    "p-[10px]",
    "rounded-[37px]",
  ],
  {
    variants: {
      intent: {
        primary: ["bg-purple", "text-white", "disabled:bg-[#C8BCF6]"],
      },
    },
    compoundVariants: [
      {
        intent: "primary",
        // size: "medium",
      },
    ],
    defaultVariants: {
      intent: "primary",
      // size: "medium",
    },
  },
);

type ButtonOrLinkProps = ComponentProps<"button"> & ComponentProps<"a">;

export interface ButtonProps extends ButtonOrLinkProps, VariantProps<typeof buttonStyles> {
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  spinnerColor?: string;
}

export default function Button({
  className,
  intent,
  // size,
  loading,
  disabled,
  children,
  href,
  spinnerColor,
  ...props
}: ButtonProps) {
  const isLink = typeof href !== "undefined";

  const ButtonOrLink = isLink ? "a" : "button";

  const content = (
    <ButtonOrLink
      className={cn(
        buttonStyles({
          intent,
          // size,
          className,
        }),
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoadingSpinner spinnerColor={spinnerColor} /> : children}
    </ButtonOrLink>
  );

  if (isLink)
    return (
      <Link href={href} legacyBehavior>
        {content}
      </Link>
    );

  return content;
}
