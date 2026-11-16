import { Ticket } from "@/entities/ticket/ticket.types";
import dados from "@/mocks/dados.json";

const tickets = dados.chamados as Ticket[];

export const tickedMockDb = {
  list: () => tickets,
};
