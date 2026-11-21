import { TicketsTableWrapper } from "@/features/tickets/components/Table/TicketTableWrapper";
import { AppShell } from "@/layout/shells/AppShell";

export default function ClientView() {
  return (
    <AppShell
      title="Meus chamados"
      description="Acompanhe suas solicitações e as respostas da equipe."
    >
      <TicketsTableWrapper variant="client" initialFilter="mine" />
    </AppShell>
  );
}
