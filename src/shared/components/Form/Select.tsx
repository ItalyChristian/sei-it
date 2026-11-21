import type { SelectHTMLAttributes } from "react";
import * as styles from "./form.css";

export default function FormSelect({
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select className={`${styles.select} ${className ?? ""}`} {...props} />;
}
