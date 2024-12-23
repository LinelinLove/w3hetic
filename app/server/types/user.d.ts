export interface UserI {
  id?: number;
  email: string;
  username: string;
  password_hash: string;
}

export interface UserRepositoryI {
  getAll: () => Promise<UserI[]>;
  getOne: (id: number) => Promise<UserI | null>;
  getOneByUsername: (username: string) => Promise<UserI | null>;
  getOneByEmail: (email: string) => Promise<UserI | null>;
  insert: (todo: UserI) => Promise<UserI>;
  update: (todo: UserI) => Promise<UserI>;
  delete: (id: number) => Promise<void>;
}
