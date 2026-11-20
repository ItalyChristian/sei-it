import { LoadingState } from "@/shared/components/LoadingState";
import * as styles from "../styles/ticket-list.css";

export const TicketListLoading = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.header}>
        <h2 className={styles.heading}>Fila de trabalho</h2>
      </div>
      <LoadingState size="sm" label="Buscando chamados..." />
    </div>
  );
};
