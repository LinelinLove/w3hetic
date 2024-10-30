export interface UserI {
    id?: number,
    username: string,
}

export interface UserRepositoryI {
    getAll: () => Promise<UserI[]>
    getOne: (id: number) => Promise<UserI>
    insert: (todo: UserI) => Promise<UserI>
    update: (todo: UserI) => Promise<UserI>
    delete: (id: number) => Promise<void>
}
