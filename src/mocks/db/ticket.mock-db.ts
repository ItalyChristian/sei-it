import { Ticket } from "@/entities/ticket/ticket.types";
import dados from "@/mocks/dados.json";

const tickets = dados.chamados as Ticket[];
type HistoryEntry = {
  id: string;
  chamado_id: string;
  tipo: string;
  de?: string | null;
  para?: string | null;
  usuario_id: string;
  motivo?: string | null;
  ocorrido_em: string;
};
const history = dados.historico as HistoryEntry[];

export const ticketMockDb = {
  list: () => tickets,
  find: (ticketId: string) => tickets.find((ticket) => ticket.id === ticketId),
  assign: (ticketId: string, userId: string) => {
    const ticket = tickets.find((item) => item.id === ticketId);
    if (!ticket || ticket.responsavel_id) return null;

    ticket.responsavel_id = userId;
    history.push({
      id: crypto.randomUUID(),
      chamado_id: ticket.id,
      tipo: "atribuicao",
      de: null,
      para: userId,
      usuario_id: userId,
      motivo: "Chamado assumido para atendimento",
      ocorrido_em: new Date().toISOString(),
    });
    return ticket;
  },
  updateStatus: (
    ticketId: string,
    status: Ticket["status"],
    reason: string,
    userId: string,
  ) => {
    const ticket = tickets.find((item) => item.id === ticketId);
    if (!ticket || ticket.status === status) return null;

    const previousStatus = ticket.status;
    const now = new Date().toISOString();
    ticket.status = status;
    ticket.sla_pausado = status === "aguardando_cliente";
    ticket.resolvido_em = status === "resolvido" ? now : null;
    ticket.fechado_em = status === "fechado" ? now : null;
    history.push({
      id: crypto.randomUUID(),
      chamado_id: ticket.id,
      tipo: "status",
      de: previousStatus,
      para: status,
      usuario_id: userId,
      motivo: reason,
      ocorrido_em: now,
    });
    return ticket;
  },
};
