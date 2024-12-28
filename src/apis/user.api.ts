import {BaseApi} from "@/apis/base.api";
import {FilterUser, User} from "@/core/interfaces/user.interface";
import {PaginationResponse} from "@/core/interfaces/pagination.interface";
import {util} from "zod";
import Omit = util.Omit;

export class UserApi extends BaseApi<User> {
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
}