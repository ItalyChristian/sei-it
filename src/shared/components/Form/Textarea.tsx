import type { TextareaHTMLAttributes } from "react";
import * as styles from "./form.css";

export default function FormTextArea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea className={`${styles.textarea} ${className ?? ""}`} {...props} />
  );
}
