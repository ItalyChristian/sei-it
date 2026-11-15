import { Header } from "@/layout/components/Header";
import { SideBar } from "../components/SideBar";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div>
      <Header />

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <SideBar />
      </div>

      <main>{children}</main>
    </div>
  );
};
