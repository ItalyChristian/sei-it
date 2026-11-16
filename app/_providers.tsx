import { QueryProvider } from "@/shared/providers/QueryProvider";
import { Theme } from "@radix-ui/themes";
import "@radix-ui/themes/styles.css";

export default function AppProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <Theme appearance="dark">{children}</Theme>
    </QueryProvider>
  );
}
