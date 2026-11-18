import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as RadixSelect from "@radix-ui/react-select";
import clsx from "clsx";
import { SelectRootProps } from "./select.types";
import * as styles from "./styles.css";

export const SelectRoot = ({
  children,
  onChange,
  value,
  disabled,
  placeholder = "Selecione...",
  className,
}: SelectRootProps) => (
  <div className={clsx(styles.dropdownContainer, className)}>
    <RadixSelect.Root
      value={value}
      onValueChange={onChange}
      disabled={disabled}
    >
      <RadixSelect.Trigger className={styles.selectInput} disabled={disabled}>
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon>
          <ChevronDownIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      {children}
    </RadixSelect.Root>
  </div>
);
