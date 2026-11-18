"use client";

import { getTickets } from "@/entities/ticket/ticket.api";
import { Ticket } from "@/entities/ticket/ticket.types";
import { KpiGrid, KpiItem } from "@/shared/components/Cards/KpiGrid";
import { useAuth } from "@/shared/contexts/session.context";
import { useEffect, useState } from "react";
import { useOperatorKpis } from "./useOperatorKpis";

export function OperatorOverview() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const { user } = useAuth();

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

  const kpis = useOperatorKpis(tickets, user?.id ?? "");

  if (isLoading) return <div>Carregando KPIs...</div>;

  const operatorKpis: KpiItem[] = [
    { title: "Meus Chamados Ativos", value: kpis.meusAtivos, tone: "info" },
    {
      title: "Fila do Grupo (Não Atribuídos)",
      value: kpis.filaGrupo,
      tone: "warning",
    },
    { title: "SLA Estourando", value: kpis.slaEstourando, tone: "danger" },
  ];

  return <KpiGrid items={operatorKpis} />;
}
