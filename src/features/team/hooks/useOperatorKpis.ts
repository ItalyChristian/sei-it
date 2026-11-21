import { SlaStatus } from "@/entities/sla/sla-status.types";
import { Ticket } from "@/entities/ticket/ticket.types";
import { User } from "@/entities/user/user.types";
import { useReferenceDate } from "@/shared/hooks/useReferenceDate";
import { useMemo } from "react";

export function useOperatorKpis(tickets: Ticket[], user: User | null) {
  const { date: referenceDate } = useReferenceDate();
  const now = referenceDate.getTime();
  const riskWindowEnd = now + 2 * 60 * 60 * 1000;
  const groupIds = useMemo(
    () =>
      new Set(
        [user?.grupo_id, ...(user?.grupos_ids ?? [])].filter(
          (groupId): groupId is string => Boolean(groupId),
        ),
      ),
    [user?.grupo_id, user?.grupos_ids],
  );

  return useMemo(() => {
    const meusTickets = tickets.filter(
      (t) =>
        t.responsavel_id === user?.id &&
        t.status !== SlaStatus.CLOSED &&
        t.status !== SlaStatus.RESOLVED,
    );

    const emRisco = meusTickets.filter((t) => {
      const deadline = new Date(t.prazo_resolucao).getTime();
      return (
        Number.isFinite(deadline) &&
        deadline >= now &&
        deadline <= riskWindowEnd
      );
    }).length;

    const excedidos = meusTickets.filter((t) => {
      const deadline = new Date(t.prazo_resolucao).getTime();
      return Number.isFinite(deadline) && deadline < now;
    }).length;

    return {
      meusAtivos: meusTickets.length,
      filaGrupo: tickets.filter(
        (t) =>
          !t.responsavel_id &&
          t.status === SlaStatus.OPEN &&
          groupIds.has(t.grupo_id),
      ).length,
      emRisco,
      excedidos,
    };
  }, [tickets, user?.id, now, riskWindowEnd, groupIds]);
}
