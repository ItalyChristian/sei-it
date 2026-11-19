import { OperatorWorkload } from "@/features/team/useTeamWorkload";
import { badgeBase, tone } from "@/shared/styles/components/badge-base.css";
import * as styles from "./operator-card.css";
import { getOperatorCardVisuals } from "./operator-card.helpers";
import { container } from "./styles.css";

interface OperatorCardProps {
  workload: OperatorWorkload;
}

export const OperatorCard = ({ workload }: OperatorCardProps) => {
  const { user, activeTickets, slaRiskTickets, overdueTickets, loadPercent } =
    workload;

  const { badgeLabel, badgeTone, loadTone, statusLabel, statusClass } =
    getOperatorCardVisuals({ activeTickets, slaRiskTickets, overdueTickets });

  return (
    <article className={`${container} ${styles.card}`}>
      <div className={styles.header}>
        <div className={styles.identity}>
          <div className={styles.avatar} aria-hidden="true">
            {user.nome.charAt(0).toLocaleUpperCase("pt-BR")}
          </div>
          <div>
            <div className={styles.name}>{user.nome}</div>
            <div className={statusClass}>{statusLabel}</div>
          </div>
        </div>
        {badgeLabel && badgeTone && (
          <span className={`${badgeBase} ${tone[badgeTone]}`}>
            {badgeLabel}
          </span>
        )}
      </div>

      <div
        className={styles.loadBar}
        role="progressbar"
        aria-label={`Carga relativa de ${user.nome}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={loadPercent}
      >
        <div
          className={`${styles.loadFill} ${styles.loadFillTone[loadTone]}`}
          style={{ width: `${loadPercent}%` }}
        />
      </div>

      <div className={styles.stats}>
        <span>
          {activeTickets} {activeTickets === 1 ? "ativo" : "ativos"}
        </span>
        <span>
          {slaRiskTickets} em risco de SLA
          {overdueTickets > 0 &&
            ` (${overdueTickets} excedido${overdueTickets > 1 ? "s" : ""})`}
        </span>
      </div>
    </article>
  );
};
