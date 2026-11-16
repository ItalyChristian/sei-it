import { AppShell } from "@/layout/shells/AppShell";
import * as styles from "./styles.css";

export default function Dahboard() {
  return (
    <AppShell>
      <main className={styles.page}>
        <header className={styles.heading}>
          <h1 className={styles.title}>Chamados da equipe</h1>
          <p className={styles.description}>
            Acompanhe os chamados e seus prazos de atendimento.
          </p>
        </header>
      </main>
    </AppShell>
  );
}
