import { cn } from "@/utils/cn";
import React from "react";
import Select from "react-select";
import type { Props as ReactSelectProps } from "react-select";

const customStyles = (
  error?: string | boolean,
  height: string = "67px",
  zIndex = 40,
  flexDirection = "row",
  variant?: "secondary" | "primary",
  menuPaddingHorizontal: string = "0px",
  menuListPaddingVertical: string = "0px",
  optionPaddingVertical: string = "24px",
  paddingLeft: string = "24px",
) => {
  const style = {
    control: (provided: any, state: any) => {
      return {
        ...provided,
        cursor: "pointer",
        width: "100%",
        height,
        minHeight: "unset",
        fontSize: "16px",
        fontWeight: "400",
        color: state.isDisabled ? "#ccc" : "#000",
        borderRadius: "8px",
        backgroundColor: "#FFFAF6",
        borderColor: error
          ? "#E01507 !important"
          : state.menuIsOpen || state.isFocused
            ? "#9B9B9B !important"
            : "#9B9B9B !important",
        transition: "all 300ms ease-out",
        flexDirection,
      };
    },

    valueContainer: (provided: any, state: any) => {
      return {
        ...provided,
        height: "100%",
        padding: "0px",
        paddingLeft: flexDirection === "row-reverse" ? "0px" : paddingLeft,
        paddingRight: "24px",
      };
    },

    // placeholder: (provided: any, state: any) => {
    //   return {
    //     ...provided,
    //     fontSize: "16px",
    //     color: "#4D4D4D",
    //   };
    // },

    singleValue: (provided: any, state: any) => {
      return {
        ...provided,
        color: "inherit",
      };
    },

    indicatorsContainer: (provided: any, state: any) => {
      return {
        ...provided,
        height: "100%",
      };
    },

    indicatorSeparator: (provided: any, state: any) => {
      return {
        ...provided,
        display: "none",
      };
    },

    dropdownIndicator: (provided: any, state: any) => {
      return {
        ...provided,
        // color: state.isFocused ? "#B1B0B9 !important" : "#ccc",
        color: "#000000",
      };
    },

    clearIndicator: (provided: any, state: any) => {
      return {
        ...provided,
        position: "absolute",
        right: 0,
      };
    },

    loadingIndicator: (provided: any, state: any) => {
      return {
        ...provided,
        position: "absolute",
        right: flexDirection === "row-reverse" ? 0 : "24px",
      };
    },

    menu: (provided: any, state: any) => {
      return {
        ...provided,
        paddingLeft: variant === "secondary" ? "6px" : menuPaddingHorizontal,
        paddingRight: variant === "secondary" ? "6px" : menuPaddingHorizontal,
        borderRadius: "12px",
        backgroundColor: "#FFFAF6",
        overflow: "clip",
      };
    },

    menuList: (provided: any, state: any) => {
      return {
        ...provided,
        maxHeight: "259px",
        backgroundColor: "inherit",
        paddingTop: variant === "secondary" ? "0px !important" : menuListPaddingVertical,
        paddingBottom: variant === "secondary" ? "0px !important" : menuListPaddingVertical,
      };
    },

    option: (provided: any, state: any) => {
      return {
        ...provided,
        paddingLeft: "24px",
        paddingRight: "24px",
        marginTop: "0px",
        marginBottom: "0px",
        paddingTop: variant === "secondary" ? "0px !important" : optionPaddingVertical,
        paddingBottom: variant === "secondary" ? "0px !important" : optionPaddingVertical,
        fontSize: "16px",
        lineHeight: 1.3,
        cursor: "pointer",
        color: "#000",
        backgroundColor: state.isSelected ? "rgba(217, 213, 242, 0.4)" : "inherit !important",
        transition: "all 300ms ease-out",
        display: "flex !important",
        alignItems: "center",
        height: "48px",
        marginLeft: "0px",
      };
    },

    menuPortal: (base: any) => ({ ...base, zIndex }), // in conjuction with menuPortalTarget
  };

  return style;
};

type Props = {
  label?: string;
  requiredSymbol?: string;
  name: string;
  placeholder?: string;
  error?: string | boolean;
  zIndex?: number;
  height?: string;
  isSearchable?: boolean;
  className?: string;
  flexDirection?: string;
  variant?: "secondary" | "primary";
  menuPaddingHorizontal?: string;
  menuListPaddingVertical?: string;
  optionPaddingVertical?: string;
  icon?: React.ElementType;
  iconClassName?: string;
  paddingLeft?: string;
} & ReactSelectProps;

export default function CustomSelect({
  label,
  requiredSymbol,
  name,
  placeholder = "Search",
  error,
  isSearchable = false,
  height,
  zIndex,
  className,
  flexDirection,
  variant = "primary",
  menuPaddingHorizontal,
  menuListPaddingVertical,
  optionPaddingVertical,
  icon,
  iconClassName,
  paddingLeft,
  ...props
}: Props) {
  const Icon = icon ? icon : null;

  return (
    <div className={cn("select-container", className)}>
      {label && (
        <label className="mb-[6px] text-base font-medium w-fit block" htmlFor={name}>
          {label} {requiredSymbol && <span className="text-red">{requiredSymbol}</span>}
        </label>
      )}

      <div className="w-full relative">
        {Icon && (
          <label htmlFor={name} className="absolute top-[50%] translate-y-[-50%] z-[1] left-[12px]">
            {Icon ? <Icon className={cn("w-4 h-4", iconClassName)} /> : null}
          </label>
        )}

        <Select
          name={name}
          inputId={name}
          instanceId={name}
          isSearchable={isSearchable}
          styles={customStyles(
            error,
            height,
            zIndex,
            flexDirection,
            variant,
            menuPaddingHorizontal,
            menuListPaddingVertical,
            optionPaddingVertical,
            paddingLeft,
          )}
          classNamePrefix="react-select"
          placeholder={placeholder}
          options={props.options}
          menuPortalTarget={typeof window !== "undefined" ? document.body : undefined}
          blurInputOnSelect={false}
          {...props}
        />
      </div>

      {error && <span className="text-red text-sm mt-1 block w-fit">{error}</span>}
    </div>
  );
}
