export interface User {
    _id: string;
    name: string;
    alias: string;
    phone: string;
    email: string;
    birthday: Date;
    password: string;
    status: UserStatus;
}

export enum UserStatus {
    NEW = 'new',
    ENABLE = 'enabled',
    DISABLED = 'disabled',
    AWAY = 'away',
}