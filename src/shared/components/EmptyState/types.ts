import type { ReactNode } from "react";

export interface EmptyStateProps {
  description: string;
  title?: string;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  actionClassName?: string;
}
