import type { LabelHTMLAttributes } from "react";
import * as styles from "./form.css";

export default function FormLabel({
  className,
  ...props
}: LabelHTMLAttributes<HTMLLabelElement>) {
  return <label className={`${styles.label} ${className ?? ""}`} {...props} />;
}
