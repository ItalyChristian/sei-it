"use client";

import { Ticket } from "@/entities/ticket/ticket.types";
import { User } from "@/entities/user/user.types";
import { MetricsCard } from "@/features/team/components/Metrics/MetricsCard";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useTeamWorkload } from "./hooks/useTeamWorkload";
import * as styles from "./styles/team-workload.css";

interface TeamWorkloadProps {
  users: User[];
  tickets: Ticket[];
}

export function TeamWorkload({ users, tickets }: TeamWorkloadProps) {
  const workloads = useTeamWorkload(users, tickets);
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <section className={styles.section} aria-labelledby="team-workload-title">
      <div className={styles.header}>
        <div>
          <h2 className={styles.title} id="team-workload-title">
            Carga da Equipe
          </h2>
          <p className={styles.description}>
            A barra compara o volume de chamados ativos entre os consultores.
          </p>
        </div>
        <div className={styles.actions}>
          <button
            aria-controls="team-workload-cards"
            aria-expanded={!isCollapsed}
            className={styles.collapseButton}
            onClick={() => setIsCollapsed((collapsed) => !collapsed)}
            type="button"
          >
            {isCollapsed ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
            {isCollapsed ? "Expandir cards" : "Recolher cards"}
          </button>
          <button
            className={styles.redistributeButton}
            type="button"
            disabled
            title="A redistribuição de chamados ainda não está disponível."
          >
            Redistribuir Chamados
          </button>
        </div>
      </div>

      <div id="team-workload-cards" hidden={isCollapsed}>
        {workloads.length > 0 ? (
          <div className={styles.grid}>
            {workloads.map((workload) => (
              <MetricsCard key={workload.user.id} workload={workload} />
            ))}
          </div>
        ) : (
          <p className={styles.emptyState}>
            Nenhum consultor encontrado para os grupos desta equipe.
          </p>
        )}
      </div>
    </section>
  );
}
