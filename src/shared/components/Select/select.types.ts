import type { ReactNode } from "react";

export interface SelectRootProps {
  children: ReactNode;
  onChange: (value: string) => void;
  value?: string;
  disabled?: boolean;
  placeholder?: string;
  className?: string;
}

export interface SelectOption {
  label: ReactNode;
  value: string;
  disabled?: boolean;
}

export interface SelectGroup {
  label?: string;
  options: SelectOption[];
}

export type SelectItem = SelectOption | SelectGroup;

export const isGroup = (item: SelectItem): item is SelectGroup =>
  "options" in item;

export interface SelectContentProps {
  options: SelectItem[];
}
