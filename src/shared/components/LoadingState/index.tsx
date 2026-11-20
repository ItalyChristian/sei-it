import { Spinner } from "@/shared/components/Spinner";
import * as styles from "./styles.css";
import { LoadingStateProps } from "./types";

export function LoadingState({
  label,
  size = "md",
  centered = true,
  className,
}: LoadingStateProps) {
  return (
    <div
      className={`${styles.wrapper} ${centered ? styles.centered : styles.inline} ${className ?? ""}`}
    >
      <Spinner size={size} centered={false} label={label} />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
