"use client";

import { Ticket } from "@/entities/ticket/ticket.types";
import { User } from "@/entities/user/user.types";
import { MessageSquare } from "lucide-react";
import { ChatPanel } from "./components/ChatPanel";
import * as styles from "./styles/chat-area.css";

interface ChatAreaProps {
  selectedTicket: Ticket | null;
  users: User[];
}

export function ChatArea({ selectedTicket, users }: ChatAreaProps) {
  if (!selectedTicket) {
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

  return <ChatPanel ticket={selectedTicket} users={users} />;
}
