"use client";

import { UserRole } from "@/entities/user/user-roles.enum";
import { useAuth } from "@/features/auth/AuthContext";
import { TicketsTableWrapper } from "@/features/tickets/table/TicketTableWrapper";
import { AppShell } from "@/layout/shells/AppShell";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import * as styles from "./styles.css";

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
