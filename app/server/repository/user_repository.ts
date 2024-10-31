import { Pool } from "mysql2/promise";
import pool from "../config/database";
import { UserI, UserRepositoryI } from "../types/user";

export function getUserRepository(database: Pool): UserRepositoryI {
  return {
    getAll: async () => {
      const [results] = await database.query("SELECT id, username FROM user");
      return results as UserI[];
    },
    delete: async (id: number) => {
      await database.execute("DELETE FROM user where id = ?", [id]);
    },
    getOne: async (id: number) => {
      const [results] = await database.execute(
        "SELECT id, username FROM user WHERE id = ?",
        [id]
      );
      return results[0];
    },
    insert(user: UserI): Promise<UserI> {
      return Promise.resolve({ id: 1, username: "test" });
    },
    update(user: UserI): Promise<UserI> {
      return Promise.resolve({ id: 1, username: "test" });
    },
  };
}
