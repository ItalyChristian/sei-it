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
  private channel: BroadcastChannel | null = null;

  connect() {
    if (typeof BroadcastChannel === "undefined" || this.channel) return;
    this.channel = new BroadcastChannel("sei-it-events");
    this.channel.onmessage = (message: MessageEvent<RealtimeEvent>) => {
      this.emit(message.data);
    };
  }

  disconnect() {
    this.channel?.close();
    this.channel = null;
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

  publish(event: RealtimeEvent) {
    this.emit(event);
    this.channel?.postMessage(event);
  }
}

export const websocketMock = new WebSocketMock();
