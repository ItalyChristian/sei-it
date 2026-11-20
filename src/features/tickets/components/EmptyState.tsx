import { Spinner } from "@/shared/components/Spinner";
import * as styles from "../styles/ticket-list.css";

export const TicketListEmptyState = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Fila de trabalho</h2>
      </div>
      <Spinner size="sm" centered label="Buscando chamados..." />
    </div>
  );
};
