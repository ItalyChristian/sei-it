"use client";

import { MessageWithAuthor } from "@/entities/chat/message.types";
import { useMessages } from "@/entities/chat/useMessages";
import { Ticket } from "@/entities/ticket/ticket.types";
import { useAssignTicket } from "@/entities/ticket/useTickets";
import { UserRole } from "@/entities/user/user-roles.enum";
import { User } from "@/entities/user/user.types";
import { LoadingState } from "@/shared/components/LoadingState";
import { useAuth } from "@/shared/contexts/session.context";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChatHeader } from "../ChatHeader/ChatHeader";
import { MessageComposer } from "../MessageComposer/MessageComposer";
import { MessageList } from "../MessageList/MessageList";
import * as styles from "./chat-panel.css";

interface ChatPanelProps {
  ticket: Ticket;
  users: User[];
  onBackToQueue?: () => void;
}

export function ChatPanel({ ticket, users, onBackToQueue }: ChatPanelProps) {
  const { user } = useAuth();
  const { data: messages = [], isLoading } = useMessages(ticket.id);
  const isClient = user?.perfil === UserRole.CLIENT;
  const visibleMessages = isClient
    ? messages.filter((message) => message.tipo === "public")
    : messages;
  const assignMutation = useAssignTicket(ticket.id);
  const [assignmentError, setAssignmentError] = useState("");

  const router = useRouter();
  const enrichedMessages: MessageWithAuthor[] = visibleMessages.map((m) => ({
    ...m,
    autor: users.find((u) => u.id === m.autor_id) ?? null,
  }));

  const handleAssume = async () => {
    if (!user) return;
    setAssignmentError("");
    try {
      await assignMutation.mutateAsync(user.id);
      router.push(`/tickets/${ticket.id}`);
    } catch {
      setAssignmentError("Não foi possível assumir o chamado. Tente novamente.");
    }
  };

  const backToQueueControl = onBackToQueue ? (
    <button
      className={styles.backLink}
      onClick={onBackToQueue}
      type="button"
    >
      <ArrowLeft size={16} />
      Voltar para a fila
    </button>
  ) : (
    <Link href="/chat" className={styles.backLink}>
      <ArrowLeft size={16} />
      Voltar para a fila
    </Link>
  );

  if (isLoading) {
    return (
      <div className={styles.panel}>
        {backToQueueControl}
        <ChatHeader
          ticket={ticket}
          users={users}
          onAssume={() => {}}
          isAssuming={assignMutation.isPending}
        />
        <LoadingState size="md" label="Carregando conversa..." />
      </div>
    );
  }

  return (
    <div className={styles.panel}>
      {backToQueueControl}
      <ChatHeader
        ticket={ticket}
        users={users}
        onAssume={handleAssume}
        isAssuming={assignMutation.isPending}
      />
      {assignmentError && <p role="alert">{assignmentError}</p>}

      <MessageList messages={enrichedMessages} isLoading={isLoading} />

      <MessageComposer ticketId={ticket.id} />
    </div>
  );
}
