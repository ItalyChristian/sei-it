import { SlaStatus } from "@/entities/sla/sla-status.types";
import { Ticket } from "@/entities/ticket/ticket.types";
import { useMemo } from "react";

export function useOperatorKpis(tickets: Ticket[], userId: string) {
  return useMemo(() => {
    const meusTickets = tickets.filter((t) => t.responsavel_id === userId);
    const naoAtribuidos = tickets.filter(
      (t) => !t.responsavel_id && t.status === SlaStatus.OPEN,
    );

    const now = new Date();
    const estourando = meusTickets.filter(
      (t) => new Date(t.prazo_resolucao) < now && t.status !== SlaStatus.CLOSED,
    );

    return {
      meusAtivos: meusTickets.filter(
        (t) => t.status !== SlaStatus.CLOSED && t.status !== SlaStatus.RESOLVED,
      ).length,
      filaGrupo: naoAtribuidos.length,
      slaEstourando: estourando.length,
    };
  }, [tickets, userId]);
}
