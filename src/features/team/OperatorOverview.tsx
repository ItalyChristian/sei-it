"use client";

import { useTickets } from "@/entities/ticket/useTickets";
import { KpiGrid, KpiItem } from "@/features/team/components/Kpi/KpiGrid";
import { useAuth } from "@/shared/contexts/session.context";
import { useOperatorKpis } from "./hooks/useOperatorKpis";

export function OperatorOverview() {
  const { user } = useAuth();
  const { data: tickets = [], isLoading } = useTickets();

  const kpis = useOperatorKpis(tickets, user?.id ?? "");

  if (isLoading) return <div>Carregando KPIs...</div>;

  const operatorKpis: KpiItem[] = [
    { title: "Meus Chamados Ativos", value: kpis.meusAtivos, tone: "info" },
    { title: "Fila do Grupo", value: kpis.filaGrupo, tone: "warning" },
    { title: "SLA em Risco (até 2h)", value: kpis.emRisco, tone: "warning" },
    { title: "SLA Excedido", value: kpis.excedidos, tone: "danger" }, // 🎯
  ];

  return <KpiGrid items={operatorKpis} />;
}
