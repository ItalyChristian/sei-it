"use client";

import { useRealtimeEvents } from "../hooks/useRealTimeEvents";

export function RealtimeProvider({ children }: { children: React.ReactNode }) {
  useRealtimeEvents();
  return <>{children}</>;
}
