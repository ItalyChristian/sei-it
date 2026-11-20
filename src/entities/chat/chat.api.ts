import { messagesMockDb } from "@/mocks/messages.mock";
import { Message } from "./message.types";

export function getMessages(ticketId: string): Promise<Message[]> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(messagesMockDb.listByTicket(ticketId)), 300);
  });
}

export function postMessage(
  ticketId: string,
  content: string,
  type: Message["tipo"],
  authorId: string,
): Promise<Message> {
  const newMessage: Message = {
    id: `msg-${ticketId}-${Date.now()}`,
    ticket_id: ticketId,
    autor_id: authorId,
    tipo: type,
    conteudo: content,
    criado_em: new Date().toISOString(),
  };

  return new Promise((resolve) => {
    setTimeout(() => resolve(newMessage), 300);
  });
}
