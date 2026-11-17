import { http } from "@/shared/lib/http-client.lib";
import { UserSummary } from "./user.types";

export async function getUsers(): Promise<UserSummary[]> {
  return http<UserSummary[]>("/users");
}
