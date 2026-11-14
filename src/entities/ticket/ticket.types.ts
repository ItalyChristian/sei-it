import { SlaPriority } from "../sla/sla-priority.types";
import { SlaStatus } from "../sla/sla-status.types";
import { TicketState } from "./ticket-state.types";
import { TicketTimestamps } from "./ticket-timestamps.types";

export type Ticket = {
  id: string;
  numero: number;
  titulo: string;
  descricao: string;
  categoria_id: string;
  grupo_id: string;
  prioridade: SlaPriority;
  status: SlaStatus;
  solicitante_id: string;
  responsavel_id?: string;
} & TicketTimestamps &
  TicketState;
