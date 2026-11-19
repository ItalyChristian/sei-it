import { SlaStatus } from "@/entities/sla/sla-status.types";
import { Ticket } from "@/entities/ticket/ticket.types";
import { useReferenceDate } from "@/shared/hooks/useReferenceData";
import { useMemo } from "react";

export function useManagerKpis(tickets: Ticket[]) {
  const { date: referenceDate } = useReferenceDate();

  return useMemo(() => {
    const now = referenceDate.getTime();
    const twoHoursFromNow = now + 2 * 60 * 60 * 1000;

    const openTickets = tickets.filter(
      (t) => t.status !== SlaStatus.CLOSED && t.status !== SlaStatus.RESOLVED,
    );

    const resolvedTickets = tickets.filter(
      (t) => t.status === SlaStatus.RESOLVED || t.status === SlaStatus.CLOSED,
    );
    const slaCumprido = resolvedTickets.length
      ? Math.round(
          (resolvedTickets.filter(
            (t) =>
              t.resolvido_em &&
              new Date(t.resolvido_em) <= new Date(t.prazo_resolucao),
          ).length /
            resolvedTickets.length) *
            100,
        )
      : 100;

    const emRisco = openTickets.filter((t) => {
      const prazo = new Date(t.prazo_resolucao).getTime();
      return Number.isFinite(prazo) && prazo <= twoHoursFromNow;
    }).length;

    let tmaStr = "0h 0m";
    if (resolvedTickets.length > 0) {
      const totalMs = resolvedTickets.reduce((acc, t) => {
        if (!t.resolvido_em) return acc;
        return (
          acc +
          (new Date(t.resolvido_em).getTime() - new Date(t.aberto_em).getTime())
        );
      }, 0);

      const mediaMs = totalMs / resolvedTickets.length;
      const horas = Math.floor(mediaMs / (1000 * 60 * 60));
      const minutos = Math.floor((mediaMs % (1000 * 60 * 60)) / (1000 * 60));
      tmaStr = `${horas}h ${minutos}m`;
    }

    return {
      abertos: openTickets.length,
      slaCumprido: `${slaCumprido}%`,
      emRisco,
      tma: tmaStr,
    };
  }, [tickets]);
}
