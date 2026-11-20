"use client";

import * as styles from "../styles/unread-dot.css";

interface UnreadDotProps {
  visible: boolean;
  /** Rótulo para leitores de tela. */
  label?: string;
}

export function UnreadDot({
  visible,
  label = "Mensagem não lida",
}: UnreadDotProps) {
  if (!visible) return null;
  return <span className={styles.dot} role="status" aria-label={label} />;
}
