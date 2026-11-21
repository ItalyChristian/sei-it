import { Ticket } from "@/entities/ticket/ticket.types";
import { http } from "@/shared/lib/http-client.lib";
import { SlaStatus } from "../sla/sla-status.types";

export function getTickets() {
  return http<Ticket[]>("/tickets");
}

export function updateTicketStatus(
  ticketId: string,
  status: SlaStatus,
  reason: string,
  userId: string,
) {
  return http<Ticket>(`/tickets/${ticketId}`, {
    method: "PATCH",
    data: { status, reason, userId },
  });
}

export function assignTicket(ticketId: string, userId: string) {
  return http<Ticket>(`/tickets/${ticketId}`, {
    method: "PATCH",
    data: { responsibleId: userId, userId },
  });
}
