import Header from "@/layout/components/Header";

interface MainShellProps {
  children: React.ReactNode;
}

export const MainShell = ({ children }: MainShellProps) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};
