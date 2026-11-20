"use client";

import { UserRole } from "@/entities/user/user-roles.enum";
import { useAuth } from "@/shared/contexts/session.context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Spinner } from "@/shared/components/Spinner";
import ClientView from "./_views/ClientView";
import ManagerView from "./_views/ManagerView";
import OperatorView from "./_views/OperatorView";

export default function Dashboard() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) return null;

  switch (user.perfil) {
    case UserRole.MANAGER:
      return <ManagerView />;
    case UserRole.OPERATOR:
      return <OperatorView />;
    case UserRole.CLIENT:
      return <ClientView />;
    default:
      return (
        <div className="p-8 text-center text-red-500">
          Perfil não reconhecido.
        </div>
      );
  }
}
