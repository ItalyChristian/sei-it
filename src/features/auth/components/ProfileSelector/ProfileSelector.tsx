"use client";

import { useRouter } from "next/navigation";

import { User } from "@/entities/user/user.types";
import dados from "@/mocks/dados.json";
import { Select } from "@/shared/components/Select";
import { SelectGroup } from "@/shared/components/Select/select.types";
import { useAuth } from "@/shared/contexts/session.context";
import { useFeaturedUsers } from "../../hooks/useFeaturedUsers";
import * as styles from "./profile-selector.css";

export default function ProfileSelector() {
  const router = useRouter();
  const { login, isLoading } = useAuth();

  const allUsers = dados.usuarios as User[];

  const featuredUsers = useFeaturedUsers(allUsers);

  const handleSelectUser = (user: User) => {
    login(user);

    router.push("/dashboard");
  };

  const handleDropdownChange = (selectedId: string) => {
    if (!selectedId) return;

    const selected = allUsers.find((u) => u.id === selectedId);
    if (selected) handleSelectUser(selected);
  };

  const userGroups: SelectGroup[] = [
    {
      label: "Usuários",
      options: allUsers.map((user) => ({
        label: `${user.nome} (${user.perfil})`,
        value: user.id,
      })),
    },
  ];

  return (
    <main className={styles.mainContainer}>
      <div className={styles.card}>
        <h1 className={styles.title}>SeiIt.</h1>
        <p className={styles.subtitle}>
          Escolha um perfil para simular o acesso.
        </p>

        <div className={styles.featuredGrid}>
          {featuredUsers.map((user) => (
            <button
              key={user.id}
              onClick={() => handleSelectUser(user)}
              className={styles.profileButton}
              aria-label={`Entrar como ${user.nome} (${user.perfil})`}
              type="button"
            >
              <div className={styles.profileAvatar}>{user.nome.charAt(0)}</div>
              <div style={{ textAlign: "center" }}>
                <div className={styles.profileName}>{user.nome}</div>
                <div className={styles.profileRole}>{user.perfil}</div>
              </div>
            </button>
          ))}
        </div>

        <Select.Root
          onChange={handleDropdownChange}
          disabled={isLoading}
          placeholder="Selecione um usuário"
        >
          <Select.Content options={userGroups} />
        </Select.Root>
      </div>
    </main>
  );
}
