import { User } from "@/entities/user/user.types";
import dados from "@/mocks/dados.json";

// const users = dados.usuarios.map(({ id, nome }) => ({
//   id,
//   nome,
// })) as UserSummary[];
const users = dados.usuarios as User[];

export const userMockDb = {
  list: () => users,
};
