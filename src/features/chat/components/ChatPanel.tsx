"use client";

import { MessageWithAuthor } from "@/entities/chat/message.types";
import { useMessages } from "@/entities/chat/useMessages";
import { Ticket } from "@/entities/ticket/ticket.types";
import { User } from "@/entities/user/user.types";
import { useAuth } from "@/shared/contexts/session.context";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import * as styles from "../styles/chat-panel.css";
import { ChatHeader } from "./ChatHeader";
import { MessageComposer } from "./MessageComposer";
import { MessageList } from "./MessageList";

interface ChatPanelProps {
  ticket: Ticket;
  users: User[];
}

export function ChatPanel({ ticket, users }: ChatPanelProps) {
  const { user } = useAuth();
  const { data: messages = [], isLoading } = useMessages(ticket.id);
  const [isAssuming, setIsAssuming] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();

  const enrichedMessages: MessageWithAuthor[] = messages.map((m) => ({
    ...m,
    autor: users.find((u) => u.id === m.autor_id) ?? null,
  }));

  const handleAssume = async () => {
    if (!user) return;
    setIsAssuming(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      queryClient.invalidateQueries({ queryKey: ["tickets"] });

      router.push(`/tickets/${ticket.id}`);
    } finally {
      setIsAssuming(false);
    }
  };
  return (
    <div className={styles.panel}>
      <ChatHeader
        ticket={ticket}
        users={users}
        onAssume={handleAssume}
        isAssuming={isAssuming}
      />

      <MessageList messages={enrichedMessages} isLoading={isLoading} />

      <MessageComposer ticketId={ticket.id} />
    </div>
  );
}
