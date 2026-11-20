import { Header } from "@/layout/components/Header";
import { useReferenceDate } from "@/shared/hooks/useReferenceDate";
import { Subheading, SubheadingProps } from "../components/Subheading";
import * as styles from "./app-shell.css";

interface AppShellProps extends SubheadingProps {
  children: React.ReactNode;
}

export const AppShell = ({ children, title, description }: AppShellProps) => {
  const { iso, timezone } = useReferenceDate();

  return (
    <div>
      <Header />
      <Subheading
        title={title}
        description={description}
        referenceDate={iso}
        timezone={timezone}
      />
      <main className={styles.page}> {children}</main>
    </div>
  );
};
