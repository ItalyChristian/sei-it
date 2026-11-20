"use client";

import { useTickets } from "@/entities/ticket/useTickets";
import { useUsers } from "@/entities/user/useUsers";
import { KpiGrid, KpiItem } from "@/features/team/components/Kpi/KpiGrid";
import { Spinner } from "@/shared/components/Spinner";
import { useManagerKpis } from "./hooks/useManagerKpis";
import { useTeamScope } from "./hooks/useTeamScope";
import { cardContainer } from "./styles/styles.css";
import { TeamWorkload } from "./TeamWorkload";
export function TeamOverview() {
  const {
    data: tickets = [],
    isLoading: isLoadingTickets,
    isError: ticketsError,
  } = useTickets();
  const {
    data: users = [],
    isLoading: isLoadingUsers,
    isError: usersError,
  } = useUsers();

  const { teamTickets, teamUsers } = useTeamScope(tickets, users);
  const kpis = useManagerKpis(teamTickets);

  if (ticketsError || usersError) {
    return <div>Não foi possível carregar os dados da equipe.</div>;
  }
  if (isLoadingTickets || isLoadingUsers) {
    return <Spinner label="Carregando dados da equipe..." />;
  }

  const managerKpis: KpiItem[] = [
    { title: "Chamados Abertos Hoje", value: kpis.abertos },
    { title: "SLA Cumprido (Geral)", value: kpis.slaCumprido, tone: "success" },
    {
      title: "SLA em Risco (vencidos ou em até 2h)",
      value: kpis.emRisco,
      tone: "danger",
    },
    { title: "Tempo Médio de Atendimento", value: kpis.tma },
  ];

  return (
    <div className={cardContainer}>
      <KpiGrid items={managerKpis} />
      <TeamWorkload users={teamUsers} tickets={teamTickets} />
    </div>
  );
}
