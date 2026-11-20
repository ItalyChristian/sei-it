"use client";

import { MessageWithAuthor } from "@/entities/chat/message.types";
import { useAuth } from "@/shared/contexts/session.context";
import { formatInTimeZone } from "date-fns-tz";
import { useEffect, useMemo, useRef } from "react";
import { MessageBubble } from "../MessageBubble/MessageBubble";
import { ChatEmptyState } from "./ChatEmptyState";
import { ChatLoading } from "./ChatLoading";
import * as styles from "./message-list.css";

interface MessageListProps {
  messages: MessageWithAuthor[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const { user } = useAuth();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const grouped = useMemo(() => {
    const groups: {
      date: string;
      label: string;
      messages: MessageWithAuthor[];
    }[] = [];
    const tz = user?.zoneinfo ?? "America/Sao_Paulo";

    for (const message of messages) {
      const dateKey = formatInTimeZone(
        new Date(message.criado_em),
        tz,
        "yyyy-MM-dd",
      );

      const lastGroup = groups[groups.length - 1];
      if (lastGroup && lastGroup.date === dateKey) {
        lastGroup.messages.push(message);
      } else {
        groups.push({
          date: dateKey,
          label: formatInTimeZone(
            new Date(message.criado_em),
            tz,
            "dd 'de' MMMM 'de' yyyy",
          ),
          messages: [message],
        });
      }
    }
    return groups;
  }, [messages, user?.zoneinfo]);

  if (isLoading) {
    return <ChatLoading />;
  }

  if (messages.length === 0) {
    return <ChatEmptyState />;
  }

  return (
    <div className={styles.list}>
      {grouped.map((group) => (
        <div key={group.date} className={styles.group}>
          <div className={styles.dateDivider}>
            <span>{group.label}</span>
          </div>
          {group.messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
