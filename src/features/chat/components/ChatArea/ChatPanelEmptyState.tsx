"use client";

import { MessageSquare } from "lucide-react";
import { EmptyState } from "@/shared/components/EmptyState";
import * as styles from "./chat-area.css";

export function ChatPanelEmptyState() {
  return (
    <EmptyState
      icon={<MessageSquare size={48} />}
      title="Selecione um chamado"
      description="Escolha um chamado na lista à esquerda para visualizar a conversa e responder."
      className={styles.emptyState}
      iconClassName={styles.emptyIcon}
      titleClassName={styles.emptyTitle}
      descriptionClassName={styles.emptyDescription}
    />
  );
}
