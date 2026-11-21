"use client";

import { MessageType } from "@/entities/chat/message.types";
import { usePostMessage } from "@/entities/chat/useMessages";
import { UserRole } from "@/entities/user/user-roles.enum";
import { useAuth } from "@/shared/contexts/session.context";
import { Lock, Send } from "lucide-react";
import { useState } from "react";
import * as styles from "./message-composer.css";

interface MessageComposerProps {
  ticketId: string;
}

export function MessageComposer({ ticketId }: MessageComposerProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [type, setType] = useState<MessageType>("public");

  const mutation = usePostMessage(ticketId);
  const isClient = user?.perfil === UserRole.CLIENT;

  const handleSubmit = async () => {
    const trimmed = content.trim();
    if (!trimmed || !user) return;

    try {
      await mutation.mutateAsync({
        content: trimmed,
        type: isClient ? "public" : type,
        authorId: user.id,
      });
      setContent("");
      setType("public");
    } catch (error) {
      console.error("Erro ao enviar mensagem", error);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isInternal = type === "internal";

  return (
    <div className={styles.composer}>
      {!isClient && (
        <div className={styles.toolbar}>
          <button
            type="button"
            className={`${styles.toggle} ${isInternal ? styles.toggleActive : ""}`}
            onClick={() => setType(isInternal ? "public" : "internal")}
            title={
              isInternal
                ? "Desativar nota interna (visível ao cliente)"
                : "Ativar nota interna (não visível ao cliente)"
            }
          >
            <Lock size={14} />
            {isInternal ? "Nota interna" : "Mensagem pública"}
          </button>
        </div>
      )}

      <div
        className={`${styles.inputRow} ${isInternal ? styles.inputRowInternal : ""}`}
      >
        <textarea
          className={styles.textarea}
          placeholder={
            isInternal
              ? "Escreva uma nota interna (só a equipe vê)..."
              : "Escreva sua resposta ao cliente..."
          }
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={2}
          disabled={mutation.isPending}
        />

        <button
          type="button"
          className={styles.sendButton}
          onClick={handleSubmit}
          disabled={!content.trim() || mutation.isPending}
          aria-label="Enviar mensagem"
        >
          <Send size={18} />
        </button>
      </div>

      {mutation.isError && (
        <p className={styles.error}>Erro ao enviar. Tente novamente.</p>
      )}
    </div>
  );
}
