import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getMessages, postMessage } from "./chat.api";
import { Message } from "./message.types";

export function useMessages(ticketId: string | null) {
  return useQuery({
    queryKey: ["messages", ticketId],
    queryFn: () => getMessages(ticketId!),
    enabled: Boolean(ticketId),
    placeholderData: [],
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", ticketId] });
    },
  });
}
