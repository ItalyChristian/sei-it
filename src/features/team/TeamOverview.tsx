"use client";

import { getTickets } from "@/entities/ticket/ticket.api";
import { Ticket } from "@/entities/ticket/ticket.types";
import { KpiGrid, KpiItem } from "@/shared/components/Cards/KpiGrid";
import { useEffect, useState } from "react";
import { useManagerKpis } from "./useManagerKpis";

export function TeamOverview() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTickets();
        setTickets(data);
      } catch (error) {
        console.error("Erro ao buscar chamados", error);
      } finally {
        setIsLoading(false);
      }
    }
    load();
  }, []);

  const kpis = useManagerKpis(tickets);

  if (isLoading) return <div>Carregando KPIs...</div>;

  const managerKpis: KpiItem[] = [
    { title: "Chamados Abertos Hoje", value: kpis.abertos },
    { title: "SLA Cumprido (Geral)", value: kpis.slaCumprido, tone: "success" },
    {
      title: "Risco de Estouro (Próximas 2h)",
      value: kpis.emRisco,
      tone: "danger",
    },
    { title: "Tempo Médio de Atendimento", value: kpis.tma },
  ];

  return <KpiGrid items={managerKpis} />;
}
