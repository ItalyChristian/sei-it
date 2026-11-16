// import { TicketListShell } from "@/features/tickets/TicketListShell";
import { TicketsTableWrapper } from "@/features/tickets/table/TicketTableWrapper";
import { AppShell } from "@/layout/shells/AppShell";

export default function Home() {
  return (
    <AppShell>
      {/* <TicketListShell /> */}
      <TicketsTableWrapper />
    </AppShell>
  );
}
