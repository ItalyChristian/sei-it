import { Ticket } from "@/entities/ticket/ticket.types";
import { http } from "@/shared/lib/http-client.lib";

export function getTickets() {
  return http<Ticket[]>("/tickets");
}
