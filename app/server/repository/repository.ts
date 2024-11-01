import { Repository } from "../types/repository";
import { getUserRepository } from "./user_repository";
import { Connection, Pool } from "mysql2/promise";

export function getRepository(database: Pool): Repository {
  return {
    userRepository: getUserRepository(database),
  };
}
