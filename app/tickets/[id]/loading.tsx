import { LoadingState } from "@/shared/components/LoadingState";
import * as styles from "@/features/tickets/styles/ticket-detail.css";

export default function TicketLoading() {
  return (
    <main className={styles.page}>
      <LoadingState size="lg" label="Carregando chamado..." />
    </main>
  );
}
