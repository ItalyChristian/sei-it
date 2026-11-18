"use client";

import { TeamOverview } from "@/features/team/TeamOverview";
import { TicketsTableWrapper } from "@/features/tickets/table/TicketTableWrapper";
import { AppShell } from "@/layout/shells/AppShell";

export default function ManagerView() {
  return (
    <AppShell
      title="Chamados da equipe"
      description="Acompanhe os chamados e seus prazos de atendimento."
    >
      <TeamOverview />
      <TicketsTableWrapper />
    </AppShell>
  );
}
