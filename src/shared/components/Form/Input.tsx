import type { InputHTMLAttributes } from "react";
import * as styles from "./form.css";

export default function FormInput({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${styles.input} ${className ?? ""}`} {...props} />;
}
