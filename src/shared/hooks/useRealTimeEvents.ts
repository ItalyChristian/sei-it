"use client";

import { RealtimeEvent, websocketMock } from "@/shared/lib/websocket-mock";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";

export function useRealtimeEvents() {
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
      }
    });

    return () => {
      unsubscribe();
      websocketMock.disconnect();
    };
  }, [queryClient]);
}
