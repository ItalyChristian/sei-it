import { UserSummary } from "@/entities/user/user.types";
import dados from "@/mocks/dados.json";

const users: UserSummary[] = dados.usuarios.map(({ id, nome }) => ({
  id,
  nome,
}));

export const userMockDb = {
  list: () => users,
};
