// // import { TicketListShell } from "@/features/tickets/TicketListShell";
// import { TicketsTableWrapper } from "@/features/tickets/table/TicketTableWrapper";
// import { AppShell } from "@/layout/shells/AppShell";

// export default function Home() {
//   return (
//     <AppShell>
//       {/* <TicketListShell /> */}
//       <TicketsTableWrapper />
//     </AppShell>
//   );
// }

import { TicketsTableWrapper } from "@/features/tickets/table/TicketTableWrapper";
import { AppShell } from "@/layout/shells/AppShell";
import * as styles from "../app/dashboard/styles.css";

export default function Home() {
  return (
    <AppShell>
      <main className={styles.page}>
        <header className={styles.heading}>
          <h1 className={styles.title}>Chamados da equipe</h1>
          <p className={styles.description}>
            Acompanhe os chamados e seus prazos de atendimento.
          </p>
        </header>

        <TicketsTableWrapper />
      </main>
    </AppShell>
  );
}
