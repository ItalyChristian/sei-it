"use client";

import { RealtimeEvent, websocketMock } from "@/shared/lib/websocket-mock";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useRealtimeEvents(
  onTyping?: (
    payload: Extract<RealtimeEvent, { tipo: "usuario.digitando" }>["payload"],
  ) => void,
) {
  const queryClient = useQueryClient();

  useEffect(() => {
    websocketMock.connect();

    const unsubscribe = websocketMock.subscribe((event: RealtimeEvent) => {
      switch (event.tipo) {
        case "mensagem.adicionada":
          queryClient.invalidateQueries({
            queryKey: ["messages", event.payload.ticket_id],
          });
          break;
        case "chamado.atribuido":
        case "status.alterado":
        case "chamado.aberto":
          queryClient.invalidateQueries({ queryKey: ["tickets"] });
          break;
        case "usuario.digitando":
          onTyping?.(event.payload);
          break;
      }
    });

    return () => {
      unsubscribe();
      websocketMock.disconnect();
    };
  }, [queryClient, onTyping]);
}
