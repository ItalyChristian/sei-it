import { OperatorOverview } from "@/features/team/OperatorOverview";
import { TicketsTableWrapper } from "@/features/tickets/table/TicketTableWrapper";
import { AppShell } from "@/layout/shells/AppShell";

export default function OperatorView() {
  return (
    <AppShell
      title="Meus chamados"
      description="Acompanhe os chamados e seus prazos de atendimento."
    >
      <OperatorOverview />
      <TicketsTableWrapper variant="operator" initialFilter="mine" />
    </AppShell>
  );
}
