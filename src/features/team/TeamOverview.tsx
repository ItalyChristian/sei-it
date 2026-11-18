"use client";

import { useTickets } from "@/entities/ticket/useTickets";
import { KpiGrid, KpiItem } from "@/shared/components/Cards/KpiGrid";
import { useManagerKpis } from "./useManagerKpis";

export function TeamOverview() {
  const { data: tickets = [], isLoading } = useTickets();
  const kpis = useManagerKpis(tickets);

  if (isLoading) return <div>Carregando KPIs...</div>;

  const managerKpis: KpiItem[] = [
    { title: "Chamados Abertos Hoje", value: kpis.abertos },
    { title: "SLA Cumprido (Geral)", value: kpis.slaCumprido, tone: "success" },
    { title: "Risco de Estouro (2h)", value: kpis.emRisco, tone: "danger" },
    { title: "Tempo Médio", value: kpis.tma },
  ];

  return <KpiGrid items={managerKpis} />;
}
