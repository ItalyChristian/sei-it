import { Header } from "@/layout/components/Header";
import { Subheading, SubheadingProps } from "../components/Subheading";
import * as styles from "./app-shell.css";

interface AppShellProps extends SubheadingProps {
  children: React.ReactNode;
}

export const AppShell = ({ children, title, description }: AppShellProps) => {
  return (
    <div>
      <Header />
      <Subheading title={title} description={description} />
      <main className={styles.page}> {children}</main>
    </div>
  );
};
