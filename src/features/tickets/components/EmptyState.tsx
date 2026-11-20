import { EmptyState as SharedEmptyState } from "@/shared/components/EmptyState";
import * as styles from "../styles/ticket-list.css";

export const TicketListEmptyState = () => {
  return (
    <SharedEmptyState
      description="Nenhum chamado neste filtro."
      descriptionClassName={styles.empty}
    />
  );
};
