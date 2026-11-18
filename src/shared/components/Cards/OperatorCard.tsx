import * as styles from "./kpi-card.css";
import { container } from "./styles.css";

interface OperatorCardProps {
  title: string;
  value: string | number;
}

export const OperatorCard = ({ title, value }: OperatorCardProps) => {
  return (
    <div className={container}>
      <div className={styles.title}>{title}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
};
