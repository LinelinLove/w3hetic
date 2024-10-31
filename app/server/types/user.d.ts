export interface UserI {
    id?: number,
    username: string,
    password_hash: string,
}

export interface UserRepositoryI {
    getAll: () => Promise<UserI[]>
    getOne: (id: number) => Promise<UserI>
    insert: (todo: UserI) => Promise<UserI>
    update: (todo: UserI) => Promise<UserI>
    delete: (id: number) => Promise<void>
}
