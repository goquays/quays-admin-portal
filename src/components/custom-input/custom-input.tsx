import { cn } from "@/utils/cn";
import React from "react";

type Props = {
  className?: string;
  label?: string;
  inputClass?: string;
  name: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value?: string | number | readonly string[];
  placeholder?: string;
  icon?: React.ElementType;
  error?: string | boolean;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  iconClassName?: string;
  rightIcon?: React.ElementType;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function CustomInput({
  className,
  label,
  name,
  onChange,
  value,
  placeholder,
  icon,
  inputClass,
  error,
  onBlur,
  iconClassName,
  rightIcon,
  ...props
}: Props) {
  const Icon = icon ? icon : null;
  const RightIcon = rightIcon ? rightIcon : null;
  const [_, setIsFocused] = React.useState(false);

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label htmlFor={props.id ? props.id : name} className="mb-4 text-base font-medium w-fit block">
          {label}
        </label>
      )}

      <div className="w-full relative">
        {Icon && (
          <label
            htmlFor={props.id ? props.id : name}
            className="absolute top-[50%] translate-y-[-50%] z-[1] left-[12px]"
          >
            {Icon ? <Icon className={cn("w-4 h-4", iconClassName)} /> : null}
          </label>
        )}

        <input
          name={name}
          placeholder={placeholder}
          id={props.id ? props.id : name}
          onChange={onChange}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur?.(e);
          }}
          className={cn(
            `block h-[67px] py-[10px] text-base w-full rounded-[8px] bg-[#FFFAF6] border ${
              Icon ? "px-[38px]" : RightIcon ? "pr-[30px] pl-[14px]" : "px-[24px]"
            } ${error ? "border-red focus:border-red" : "border-[#9B9B9B]"}`,
            inputClass,
          )}
          {...props}
        />

        {RightIcon && (
          <label
            htmlFor={props.id ? props.id : name}
            className="flex items-center justify-center w-6 h-6 absolute top-[50%] translate-y-[-50%] right-2 z-[1]"
          >
            <RightIcon className="w-4 h-4" />
          </label>
        )}
      </div>

      {error && <span className="text-red text-sm mt-1 block w-fit">{error}</span>}
    </div>
  );
}
