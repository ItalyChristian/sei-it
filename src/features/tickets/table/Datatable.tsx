"use client";

import { useCategories } from "@/entities/ticket/category/useCategories";
import { useTickets } from "@/entities/ticket/useTickets";
import { useUsers } from "@/entities/user/useUsers";
import dados from "@/mocks/dados.json";
import { FilteredTickets } from "./FilteredTickets";
import * as styles from "./manager-tickets-table.css";

export function ManagerTicketsTable() {
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
      <p className={styles.errorState} role="alert">
        Não foi possível carregar os chamados.
      </p>
    );
  }

  return (
    <main className={styles.page}>
      <header className={styles.heading}>
        <h1 className={styles.title}>Chamados da equipe</h1>
        <p className={styles.description}>
          Acompanhe os chamados e seus prazos de atendimento.
        </p>
      </header>

      <FilteredTickets
        categories={categories}
        isLoading={isLoadingTickets || isLoadingCategories || isLoadingUsers}
        referenceDate={dados.meta.agora}
        tickets={tickets}
        users={users}
      />
    </main>
  );
}
