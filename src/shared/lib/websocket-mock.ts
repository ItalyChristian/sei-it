import { Message } from "@/entities/chat/message.types";

/**
 * Tipos de eventos do WebSocket (conforme requisito).
 */
export type RealtimeEvent =
  | { tipo: "chamado.aberto"; payload: { ticket_id: string; ticket: unknown } }
  | {
      tipo: "chamado.atribuido";
      payload: { ticket_id: string; consultor_id: string };
    }
  | { tipo: "mensagem.adicionada"; payload: Message }
  | {
      tipo: "status.alterado";
      payload: {
        ticket_id: string;
        de: string;
        para: string;
        motivo: string;
        usuario_id: string;
      };
    };

type Listener = (event: RealtimeEvent) => void;

/**
 * Mock de WebSocket usando EventTarget.
 * Emite eventos fake em intervalos regulares para simular tempo real.
 */
class WebSocketMock extends EventTarget {
  private intervalId: ReturnType<typeof setInterval> | null = null;

  connect() {
    if (this.intervalId) return;
    // A cada 15s, emite um evento fake
    this.intervalId = setInterval(() => this.emitRandomEvent(), 15_000);
  }

  disconnect() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  subscribe(listener: Listener): () => void {
    const handler = (event: Event) => {
      const customEvent = event as CustomEvent<RealtimeEvent>;
      listener(customEvent.detail);
    };
    this.addEventListener("message", handler);
    return () => this.removeEventListener("message", handler);
  }

  private emit(event: RealtimeEvent) {
    this.dispatchEvent(new CustomEvent("message", { detail: event }));
  }

  private emitRandomEvent() {
    // Escolhe um evento aleatório para simular
    const events: RealtimeEvent[] = [
      {
        tipo: "mensagem.adicionada",
        payload: {
          id: `msg-fake-${Date.now()}`,
          ticket_id: "4ca8212a-d627-45c2-810d-a1ba92d0eaf0",
          autor_id: "ae4d6fdf-bd5b-4fe0-879a-f86c41012b99",
          tipo: "public",
          conteudo:
            "Atualização: o problema foi identificado e já está sendo corrigido.",
          criado_em: new Date().toISOString(),
        },
      },
    ];
    const random = events[Math.floor(Math.random() * events.length)];
    this.emit(random);
  }
}

export const websocketMock = new WebSocketMock();
