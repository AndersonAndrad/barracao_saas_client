import { generateSmallHash } from "@/common/utils/hash.utils";
import { ColorObj } from "@/components/users/select-colors.component";
import { PaginationRequest } from "@/core/interfaces/pagination.interface";

export interface User {
    _id: string;
    name: string;
    alias: string;
    phone: string;
    email: string;
    birthday: Date;
    password: string;
    status: UserStatus;
    color: string;
    avatar: string;
}

export enum UserStatus {
    NEW = 'new',
    ENABLE = 'enabled',
    DISABLED = 'disabled',
    AWAY = 'away',
}

export interface FilterUser extends PaginationRequest {
    word?: string;
}

export interface UpdatePassword {
    password: string;
    newPassword: string;
    confirmationPassword: string;
}

export const colors: ColorObj[] = [
    { id: generateSmallHash(), hex: '#E2E7EE', selected: false },
    { id: generateSmallHash(), hex: '#92CEF7', selected: false },
    { id: generateSmallHash(), hex: '#BEB8FA', selected: false },
    { id: generateSmallHash(), hex: '#98DD98', selected: false },
    { id: generateSmallHash(), hex: '#ECDC83', selected: false },
    { id: generateSmallHash(), hex: '#C84A4A', selected: false },
    { id: generateSmallHash(), hex: '#A00A0A', selected: false },
    { id: generateSmallHash(), hex: '#73A8CC', selected: false },
    { id: generateSmallHash(), hex: '#878C93', selected: false },
];

export interface UserLogin {
    email: string;
    password: string;
}

export interface UserToken {
    refreshToken: string;
    token: string;
}
