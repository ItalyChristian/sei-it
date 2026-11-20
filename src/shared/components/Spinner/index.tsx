import * as styles from "./styles.css";

export interface SpinnerProps {
  size?: keyof typeof styles.sizes;
  centered?: boolean;
  label?: string;
  color?: string;
  className?: string;
}

export function Spinner({
  size = "md",
  centered = true,
  label,
  color,
  className,
}: SpinnerProps) {
  const spinnerElement = (
    <span
      className={`${styles.spinner} ${styles.sizes[size]} ${className || ""}`}
      style={color ? { color } : undefined}
      role="status"
      aria-label={label || "Carregando"}
    />
  );

  if (!centered) {
    return spinnerElement;
  }

  return (
    <div className={styles.centeredWrapper}>
      {spinnerElement}
      {label && <span className={styles.label}>{label}</span>}
    </div>
  );
}
