import { type SpinnerProps } from "@/shared/components/Spinner";

export interface LoadingStateProps {
  label: string;
  size?: SpinnerProps["size"];
  centered?: boolean;
  className?: string;
}
