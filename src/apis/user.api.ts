import {BaseApi} from "@/apis/base.api";
import {User} from "@/core/interfaces/user.interface";

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

        console.log('called')
    }
}