import Header from "@/layout/components/Header";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
