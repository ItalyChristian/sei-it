import { AuthProvider } from "@/shared/contexts/session.context";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { RealtimeProvider } from "@/shared/providers/RealTimeProvider";
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
        <RealtimeProvider>
          <Theme>{children}</Theme>
        </RealtimeProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
