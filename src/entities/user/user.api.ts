import { http } from "@/shared/lib/http-client.lib";
import { User } from "./user.types";

export function getUsers() {
  return http<User[]>("/users");
}
