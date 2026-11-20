"use client";

import { MessageWithAuthor } from "@/entities/chat/message.types";
import { useAuth } from "@/shared/contexts/session.context";
import { formatInTimeZone } from "date-fns-tz";
import { Lock } from "lucide-react";
import * as styles from "../styles/message-bubble.css";

interface MessageBubbleProps {
  message: MessageWithAuthor;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const { user } = useAuth();

  const isOwn = message.autor_id === user?.id;
  const isInternal = message.tipo === "internal";

  const formattedTime = formatInTimeZone(
    new Date(message.criado_em),
    user?.zoneinfo ?? "America/Sao_Paulo",
    "HH:mm",
  );

  return (
    <div
      className={[
        styles.row,
        isOwn ? styles.rowOwn : "",
        isInternal ? styles.rowInternal : "",
      ].join(" ")}
    >
      <div className={styles.avatar} aria-hidden="true">
        {message.autor?.nome.charAt(0).toLocaleUpperCase("pt-BR") ?? "?"}
      </div>

      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.author}>
            {message.autor?.nome ?? "Usuário desconhecido"}
            {isOwn && " (você)"}
          </span>

          {isInternal && (
            <span className={styles.internalBadge}>
              <Lock size={10} />
              Nota interna
            </span>
          )}

          <span className={styles.time}>{formattedTime}</span>
        </div>

        <div className={styles.bubble}>
          <p className={styles.text}>{message.conteudo}</p>
        </div>
      </div>
    </div>
  );
}
