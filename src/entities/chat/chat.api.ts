import { Message } from "./message.types";
import { http } from "@/shared/lib/http-client.lib";

export function getMessages(ticketId: string): Promise<Message[]> {
  return http<Message[]>(`/tickets/${ticketId}/messages`);
}

export function postMessage(
  ticketId: string,
  content: string,
  type: Message["tipo"],
  authorId: string,
): Promise<Message> {
  return http<Message>(`/tickets/${ticketId}/messages`, {
    method: "POST",
    data: { content, type, authorId },
  });
}
