"use client";

import { MessageSquare } from "lucide-react";
import * as styles from "./styles/chat-area.css";

export function ChatPanelEmptyState() {
  return (
    <div className={styles.emptyState}>
      <div className={styles.emptyIcon}>
        <MessageSquare size={48} />
      </div>
      <h2 className={styles.emptyTitle}>Selecione um chamado</h2>
      <p className={styles.emptyDescription}>
        Escolha um chamado na lista à esquerda para visualizar a conversa e
        responder.
      </p>
    </div>
  );
}
