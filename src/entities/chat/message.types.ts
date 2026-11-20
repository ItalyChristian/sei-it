import { UserSummary } from "@/entities/user/user.types";

/**
 * Tipo de mensagem:
 * - `public`: visível para o cliente e para a equipe
 * - `internal`: visível apenas para a equipe (nota interna)
 */
export type MessageType = "public" | "internal";

export interface Message {
  id: string;
  ticket_id: string;
  autor_id: string;
  tipo: MessageType;
  conteudo: string;
  criado_em: string; // ISO 8601
}

/**
 * Mensagem enriquecida com dados do autor (para renderização).
 * Derivada de `Message` + lookup de `UserSummary`.
 */
export interface MessageWithAuthor extends Message {
  autor: UserSummary | null; // null se o autor não for encontrado
}
