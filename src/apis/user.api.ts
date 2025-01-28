import { FilterUser, UpdatePassword, User, UserLogin, UserToken } from "@/core/interfaces/user.interface";

import { BaseApi } from "@/apis/base.api";
import { PaginationResponse } from "@/core/interfaces/pagination.interface";
import { toast } from "sonner";
import { util } from "zod";

import Omit = util.Omit;

export class UserApi extends BaseApi<User> {
    private readonly updatePasswordSuccessMessage: string = 'Atualização de senha realizada com sucesso';

    private readonly updatePasswordFailureMessage: string = 'Houve um erro ao tentar alterar a senha do usuário';

    private readonly LOGIN_URL: string = 'login';

    constructor() {
        super();
        this.baseUrl = 'user';

        this.createSuccessMessage = 'Macumbeirinho(a) registrado com sucesso';
        this.createFailureMessage = 'Houve um erro ao tentar registrar o(a) macumbeirinho(a)';

        this.updateSuccessMessage = 'Macumbeirinho(a) ateualizado com sucesso';
        this.updateFailureMessage = 'Houve um erro ao tentar atualizar o(a) macumbeirinho(a)';

        this.deleteSuccessMessage = 'Macumbeirinho(a) deletado com sucesso';
        this.deleteFailureMessage = 'Houve um erro ao tentar apagar o(a) macumbeirinho(a)';
    }

    async find(filter: FilterUser): Promise<PaginationResponse<User>> {
        return super.find(filter);
    }

    async create(entity: Omit<User, "_id" | "status">): Promise<void> {
        return super.create(entity as any);
    }

    async updatePassword(userId: string, props: UpdatePassword): Promise<void> {
        return new Promise((resolve, reject) => {
            this.serverApi
                .patch(`${this.baseUrl}/reset-password/${userId}`, props)
                .then(() => {
                    resolve();
                    toast(this.updatePasswordSuccessMessage);
                })
                .catch((error) => {
                    toast(this.updatePasswordFailureMessage, { description: error.message });
                    reject(error);
                });
        });
    }

    // login methods
    async login(loginObj: UserLogin): Promise<void> {
        return new Promise((resolve, reject) => {
            this.serverApi
                .post(`${this.LOGIN_URL}/`, loginObj)
                .then((response) => {
                    const result: UserToken = response.data;

                    resolve();

                    // set token in local storage
                    localStorage.setItem('token', JSON.stringify(result));
                })
                .catch((error) => {
                    reject(error);
                });
        });
    }
}