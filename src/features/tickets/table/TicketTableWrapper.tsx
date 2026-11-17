"use client";

import { useCategories } from "@/entities/ticket/category/useCategories";
import { useTickets } from "@/entities/ticket/useTickets";
import { useUsers } from "@/entities/user/useUsers";
import dados from "@/mocks/dados.json";
import { TicketsTable } from "./TicketsTable";
import { errorState } from "./tickets-table.css";

export function TicketsTableWrapper() {
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

  return (
    <TicketsTable
      categories={categories}
      isLoading={isLoadingTickets || isLoadingCategories || isLoadingUsers}
      referenceDate={dados.meta.agora}
      tickets={tickets}
      users={users}
    />
  );
}
