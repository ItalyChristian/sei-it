import { cardContainer } from "../../styles/styles.css";
import * as styles from "./kpi-card.css";

export type KpiTone = "default" | "success" | "danger" | "warning" | "info";

interface KpiCardProps {
  title: string;
  value: string | number;
  tone?: KpiTone;
}

export const KpiCard = ({ title, value, tone = "default" }: KpiCardProps) => {
  return (
    <div className={cardContainer}>
      <div className={styles.title}>{title}</div>
      <div className={`${styles.valueBase} ${styles.value[tone]}`}>{value}</div>
    </div>
  );
};
