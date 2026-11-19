import { SlaStatus } from "@/entities/sla/sla-status.types";
import { Ticket } from "@/entities/ticket/ticket.types";
import { User } from "@/entities/user/user.types";
import { useReferenceDate } from "@/shared/hooks/useReferenceData";
import { useMemo } from "react";

export interface OperatorWorkload {
  user: User;
  activeTickets: number;
  slaRiskTickets: number;
  overdueTickets: number;
  loadPercent: number;
}

const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

export function useTeamWorkload(users: User[], tickets: Ticket[]) {
  const { date: referenceDate } = useReferenceDate();
  const now = referenceDate.getTime();
  const riskWindowEnd = now + TWO_HOURS_MS;

  return useMemo(() => {
    const operators: OperatorWorkload[] = users.map((user) => {
      const activeTickets = tickets.filter(
        (ticket) =>
          ticket.responsavel_id === user.id &&
          ticket.status !== SlaStatus.RESOLVED &&
          ticket.status !== SlaStatus.CLOSED,
      );

      const riskTickets = activeTickets.filter((ticket) => {
        const deadline = new Date(ticket.prazo_resolucao).getTime();
        return Number.isFinite(deadline) && deadline <= riskWindowEnd;
      });

      const overdueTickets = riskTickets.filter(
        (ticket) => new Date(ticket.prazo_resolucao).getTime() < now,
      ).length;

      return {
        user,
        activeTickets: activeTickets.length,
        slaRiskTickets: riskTickets.length,
        overdueTickets,
        loadPercent: 0,
      };
    });

    const maxActive = Math.max(0, ...operators.map((op) => op.activeTickets));

    return operators.map((op) => ({
      ...op,
      loadPercent:
        maxActive === 0 ? 0 : Math.round((op.activeTickets / maxActive) * 100),
    }));
  }, [users, tickets, now, riskWindowEnd]);
}
