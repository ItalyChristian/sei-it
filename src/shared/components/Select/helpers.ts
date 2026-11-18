import type { SelectOption } from "./select.types";

export const ALL_OPTION_VALUE = "__all__";

export const withAllOption = <T extends string>(
  options: readonly {
    label: SelectOption["label"];
    value: T;
    disabled?: boolean;
  }[],
  {
    label = "Todos",
    value = ALL_OPTION_VALUE,
  }: { label?: SelectOption["label"]; value?: string } = {},
) => {
  const allOption: SelectOption = { label, value };

  return {
    options: [allOption, ...options] as SelectOption[],
    toSelectValue: (current: T | null | undefined): string => current ?? value,
    fromSelectValue: (selected: string): Exclude<T, typeof value> | null =>
      selected === value ? null : (selected as Exclude<T, typeof value>),
  };
};
