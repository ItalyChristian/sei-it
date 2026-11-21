import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages, postMessage } from "./chat.api";
import { Message } from "./message.types";
import { websocketMock } from "@/shared/lib/websocket-mock";

export function useMessages(ticketId: string | null) {
  return useQuery({
    queryKey: ["messages", ticketId],
    queryFn: () => getMessages(ticketId!),
    enabled: Boolean(ticketId),
    placeholderData: [],
    refetchInterval: 2000,
  });
}

export function usePostMessage(ticketId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      content,
      type,
      authorId,
    }: {
      content: string;
      type: Message["tipo"];
      authorId: string;
    }) => postMessage(ticketId, content, type, authorId),
    onSuccess: (message) => {
      queryClient.invalidateQueries({ queryKey: ["messages", ticketId] });
      websocketMock.publish({
        tipo: "mensagem.adicionada",
        payload: message,
      });
    },
  });
}
