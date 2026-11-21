import { ChevronDownIcon, Cross2Icon } from "@radix-ui/react-icons";
import * as RadixSelect from "@radix-ui/react-select";
import clsx from "clsx";
import type { MouseEvent } from "react";
import { SelectRootProps } from "./select.types";
import * as styles from "./styles.css";

export const SelectRoot = ({
  children,
  onChange,
  value,
  disabled,
  placeholder = "Selecione...",
  className,
  ariaLabel,
  showClear,
  onClear,
}: SelectRootProps) => {
  const handleClear = (e: MouseEvent<HTMLSpanElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (onClear) {
      onClear();
    } else {
      onChange("");
    }
  };

  return (
    <div className={clsx(styles.dropdownContainer, className)}>
      <RadixSelect.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <RadixSelect.Trigger
          aria-label={ariaLabel}
          className={styles.selectInput}
          disabled={disabled}
        >
          <RadixSelect.Value
            className={styles.selectValue}
            placeholder={placeholder}
          />

          <div className={styles.selectIcons}>
            {showClear && (
              <span
                role="button"
                aria-label="Limpar seleção"
                onClick={handleClear}
                onPointerDown={(e) => e.stopPropagation()}
                className={styles.clearButton}
              >
                <Cross2Icon />
              </span>
            )}
            <RadixSelect.Icon>
              <ChevronDownIcon />
            </RadixSelect.Icon>
          </div>
        </RadixSelect.Trigger>

        {children}
      </RadixSelect.Root>
    </div>
  );
};
