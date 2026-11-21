import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  assignTicket,
  createTicket,
  getTickets,
  updateTicketStatus,
} from "./ticket.api";
import { SlaStatus } from "../sla/sla-status.types";
import { websocketMock } from "@/shared/lib/websocket-mock";

export function useTickets() {
  return useQuery({
    queryKey: ["tickets"],
    queryFn: getTickets,
    refetchInterval: 3000,
  });
}

export function useAssignTicket(ticketId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (userId: string) => assignTicket(ticketId, userId),
    onSuccess: (ticket, userId) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      websocketMock.publish({
        tipo: "chamado.atribuido",
        payload: { ticket_id: ticket.id, consultor_id: userId },
      });
    },
  });
}

export function useCreateTicket() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createTicket,
    onSuccess: (ticket) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      websocketMock.publish({
        tipo: "chamado.aberto",
        payload: { ticket_id: ticket.id, ticket },
      });
    },
  });
}

export function useUpdateTicketStatus(ticketId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      status,
      reason,
      userId,
    }: {
      status: SlaStatus;
      reason: string;
      userId: string;
      previousStatus: SlaStatus;
    }) => updateTicketStatus(ticketId, status, reason, userId),
    onSuccess: (_ticket, variables) => {
      queryClient.invalidateQueries({ queryKey: ["tickets"] });
      websocketMock.publish({
        tipo: "status.alterado",
        payload: {
          ticket_id: ticketId,
          de: variables.previousStatus,
          para: variables.status,
          motivo: variables.reason,
          usuario_id: variables.userId,
        },
      });
    },
  });
}
