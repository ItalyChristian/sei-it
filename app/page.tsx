import { TicketListShell } from "@/features/tickets/TicketListShell";
import { AppShell } from "@/layout/shells/AppShell";

export default function Home() {
  return (
    <AppShell>
      <TicketListShell />
    </AppShell>
  );
}
