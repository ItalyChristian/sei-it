"use client";

import { SlaStatus } from "@/entities/sla/sla-status.types";
import { useCategories } from "@/entities/ticket/category/useCategories";
import { useTickets } from "@/entities/ticket/useTickets";
import { useUsers } from "@/entities/user/useUsers";
import { useAuth } from "@/shared/contexts/session.context";
import { useReferenceDate } from "@/shared/hooks/useReferenceData";
import { useMemo } from "react";
import { TicketsTable } from "./TicketsTable";
import { TicketsTableWrapperProps } from "./table.types";
import { errorState } from "./tickets-table.css";

export function TicketsTableWrapper({
  variant,
  initialFilter = "all",
}: TicketsTableWrapperProps) {
  const { user } = useAuth();
  const { iso: referenceDate, date: referenceDateObj } = useReferenceDate();

  const {
    data: tickets = [],
    isLoading: isLoadingTickets,
    isError: isTicketsError,
  } = useTickets();
  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isCategoriesError,
  } = useCategories();
  const {
    data: users = [],
    isLoading: isLoadingUsers,
    isError: isUsersError,
  } = useUsers();

  if (isTicketsError || isCategoriesError || isUsersError) {
    return (
      <p className={errorState} role="alert">
        Não foi possível carregar os chamados.
      </p>
    );
  }

  const scopedTickets = useMemo(() => {
    switch (initialFilter) {
      case "mine":
        return tickets.filter((t) => t.responsavel_id === user?.id);
      case "unassigned":
        return tickets.filter((t) => !t.responsavel_id);
      case "sla-at-risk":
        return tickets.filter((t) => {
          if (
            t.status === SlaStatus.CLOSED ||
            t.status === SlaStatus.RESOLVED
          ) {
            return false;
          }
          const prazo = new Date(t.prazo_resolucao).getTime();
          const agora = referenceDateObj.getTime();
          return prazo - agora <= 2 * 60 * 60 * 1000;
        });
      case "all":
      default:
        return tickets;
    }
  }, [tickets, initialFilter, user?.id]);

  return (
    <TicketsTable
      categories={categories}
      isLoading={isLoadingTickets || isLoadingCategories || isLoadingUsers}
      referenceDate={referenceDate}
      tickets={scopedTickets}
      users={users}
      variant={variant}
      currentUserId={user?.id}
    />
  );
}
