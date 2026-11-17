"use client";

import { useRouter } from "next/navigation";

import { UserRole } from "@/entities/user/user-roles.enum";
import { User } from "@/entities/user/user.types";
import dados from "@/mocks/dados.json";
import { useAuth } from "@/shared/contexts/session.context";
import * as styles from "./profile-selector.css";

export default function ProfileSelector() {
  const router = useRouter();
  const { login } = useAuth();

  const allUsers = dados.usuarios as User[];

  const featuredUsers = [
    allUsers.find((u) => u.perfil === UserRole.MANAGER),
    allUsers.find((u) => u.perfil === UserRole.OPERATOR),
    allUsers.find((u) => u.perfil === UserRole.CLIENT),
  ].filter(Boolean) as User[];

  const handleSelectUser = (user: User) => {
    login(user);

    if (user.perfil === UserRole.MANAGER) {
      router.push("/dashboard");
    } else if (user.perfil === UserRole.OPERATOR) {
      router.push("/dashboard");
    } else {
      router.push("/dashboard");
    }
  };

  const handleDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    if (!selectedId) return;

    const selected = allUsers.find((u) => u.id === selectedId);
    if (selected) handleSelectUser(selected);
  };

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

        <div className={styles.dropdownContainer}>
          <label htmlFor="user-select" className={styles.dropdownLabel}>
            Ou selecione outro usuário:
          </label>
          <select
            id="user-select"
            onChange={handleDropdownChange}
            className={styles.selectInput}
            defaultValue=""
          >
            <option value="" disabled>
              Selecione...
            </option>
            {allUsers.map((user) => (
              <option key={user.id} value={user.id}>
                {user.nome} ({user.perfil})
              </option>
            ))}
          </select>
        </div>
      </div>
    </main>
  );
}
