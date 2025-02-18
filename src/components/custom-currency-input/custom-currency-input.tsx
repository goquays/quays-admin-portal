import React from "react";
import { cn } from "@/utils/cn";
import CurrencyInput, { CurrencyInputOnChangeValues } from "react-currency-input-field";
import PoundsIcon from "../../../public/assets/icons/pounds.svg";

type Props = {
  className?: string;
  label?: string;
  requiredSymbol?: string;
  inputClass?: string;
  name: string;
  onChange:
    | ((value: string | undefined, name?: string | undefined, values?: CurrencyInputOnChangeValues | undefined) => void)
    | undefined;
  value?: string | number | readonly string[];
  placeholder?: string;
  error?: string | boolean;
  extraInfo?: string;
  icon?: React.ElementType;
  suffix?: string;
  showArrows?: boolean;
  innerContainerClassName?: string;
  onDecrease?: () => void;
  onIncrease?: () => void;
  rightIcon?: React.ElementType;
} & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export default function CustomCurrencyInput({
  className,
  label,
  requiredSymbol,
  name,
  onChange,
  value,
  placeholder = "0.00",
  inputClass,
  error,
  extraInfo,
  icon,
  suffix,
  showArrows,
  innerContainerClassName,
  onDecrease,
  onIncrease,
  rightIcon,
  ...props
}: Props) {
  const Icon = icon ? icon : PoundsIcon;
  const RightIcon = rightIcon ? rightIcon : null;

  function handleDecrease() {
    if (!value || value === 1 || !onDecrease) return;
    onDecrease();
  }

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label htmlFor={props.id ? props.id : name} className="mb-[6px] text-base font-medium w-fit block">
          {label} {requiredSymbol && <span className="text-red">{requiredSymbol}</span>}
        </label>
      )}

      <div className={cn("w-full relative", innerContainerClassName)}>
        {Icon && (
          <label
            htmlFor={props.id ? props.id : name}
            className="absolute top-[50%] translate-y-[-50%] z-[1] left-[12px]"
          >
            {Icon ? <Icon className="w-4 h-4" /> : null}
          </label>
        )}

        <CurrencyInput
          // @ts-ignore
          step={1}
          name={name}
          allowNegativeValue={false}
          decimalScale={2}
          decimalsLimit={2}
          id={props.id ? props.id : name}
          onValueChange={onChange}
          placeholder={placeholder}
          value={value}
          intlConfig={{ locale: "en" }}
          className={cn(
            `block h-[67px] py-[10px] text-base w-full rounded-[8px] bg-[#FFFAF6] border pl-8  ${error ? "!border-red !focus:border-red" : "!border-border"}
						${suffix ? "pr-6" : RightIcon ? "pr-[30px] pl-6" : "pr-6"}`,
            inputClass,
          )}
          {...props}
        />

        {suffix && (
          <label
            htmlFor={props.id ? props.id : name}
            className="text-sm font-medium absolute top-[50%] translate-y-[-50%] z-[1] right-[12px]"
          >
            {suffix}
          </label>
        )}

        {RightIcon && (
          <label
            htmlFor={props.id ? props.id : name}
            className="flex items-center justify-center w-6 h-6 absolute top-[50%] translate-y-[-50%] right-2 z-[1]"
          >
            <RightIcon className="w-4 h-4" />
          </label>
        )}

        {/* {!suffix && !rightIcon && showArrows && !!onDecrease && !!onIncrease && (
          <div className="absolute top-[50%] translate-y-[-50%] z-[1] right-[12px] bg-[#ECEFF3] w-[14px] h-6 rounded flex flex-col items-center justify-between py-[2px]">
            <button type="button" disabled={!value} className="rotate-[180deg] w-fit" onClick={onIncrease}>
              <PolygonArrow className="w-2 h-2 flex-shrink-0" />
            </button>
            <button type="button" disabled={!value || value === 1} className="w-fit" onClick={handleDecrease}>
              <PolygonArrow className="w-2 h-2 flex-shrink-0" />
            </button>
          </div>
        )} */}
      </div>

      {extraInfo && <span className="block w-fit text-sm mt-1 text-secondary">{extraInfo}</span>}
      {error && <span className="text-red text-sm mt-1 block w-fit">{error}</span>}
    </div>
  );
}
