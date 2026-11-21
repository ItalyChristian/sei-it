"use client";

import { UserRole } from "@/entities/user/user-roles.enum";
import { NewTicketForm } from "@/features/tickets/components/NewTicketForm/NewTicketForm";
import { AppShell } from "@/layout/shells/AppShell";
import { Spinner } from "@/shared/components/Spinner";
import { useAuth } from "@/shared/contexts/session.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NewTicketPage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && user?.perfil !== UserRole.CLIENT) {
      router.replace(user ? "/dashboard" : "/");
    }
  }, [isLoading, router, user]);

  if (isLoading || user?.perfil !== UserRole.CLIENT) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <AppShell
      title="Novo chamado"
      description="Envie sua solicitação para a equipe de suporte."
    >
      <NewTicketForm />
    </AppShell>
  );
}
