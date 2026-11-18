import * as styles from "./kpi-card.css";
import { container } from "./styles.css";

interface KpiCardProps {
  title: string;
  value: string | number;
}

export const KpiCard = ({ title, value }: KpiCardProps) => {
  return (
    <div className={container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};
