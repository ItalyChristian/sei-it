"use client";

import { UserRole } from "@/entities/user/user-roles.enum";
import { TicketsTableWrapper } from "@/features/tickets/table/TicketTableWrapper";
import { AppShell } from "@/layout/shells/AppShell";
import { useAuth } from "@/shared/contexts/session.context";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dahboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || user.perfil !== UserRole.MANAGER)) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading || !user) return <div>Carregando...</div>;

  return (
    <AppShell
      title="Chamados da equipe"
      description="Acompanhe os chamados e seus prazos de atendimento."
    >
      <TicketsTableWrapper />
    </AppShell>
  );
}
