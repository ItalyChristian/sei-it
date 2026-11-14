export interface TicketState {
  sla_pausado: boolean;
  aberto_em: string;
  resolvido_em: string | null;
  fechado_em: string | null;
}
