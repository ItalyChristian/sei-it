// import { TicketListShell } from "@/features/tickets/TicketListShell";
import { ManagerTicketsTable } from "@/features/tickets/table/Datatable";
import { AppShell } from "@/layout/shells/AppShell";

export default function Home() {
  return (
    <AppShell>
      {/* <TicketListShell /> */}
      <ManagerTicketsTable />
    </AppShell>
  );
}
