import { TicketsTableWrapper } from "@/features/tickets/components/Table/TicketTableWrapper";
import { AppShell } from "@/layout/shells/AppShell";
import { btnPrimary } from "@/shared/styles/components/buttons.css";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ClientView() {
  return (
    <AppShell
      title="Meus chamados"
      description="Acompanhe suas solicitações e as respostas da equipe."
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "1rem",
        }}
      >
        <Link
          href="/tickets/new"
          className={btnPrimary}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <Plus size={16} />
          Abrir novo chamado
        </Link>
      </div>
      <TicketsTableWrapper variant="client" initialFilter="mine" />
    </AppShell>
  );
}
