import { AuthProvider } from "@/shared/contexts/session.context";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <QueryProvider>
        <Theme>{children}</Theme>
      </QueryProvider>
    </AuthProvider>
  );
}
