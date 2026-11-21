import { AuthProvider } from "@/shared/contexts/session.context";
import { QueryProvider } from "@/shared/providers/QueryProvider";
import { RealtimeProvider } from "@/shared/providers/RealTimeProvider";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
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
          <Theme>
            {children}
            <ToastContainer position="bottom-center" />
          </Theme>
        </RealtimeProvider>
      </QueryProvider>
    </AuthProvider>
  );
}
