import { CreateMonthlyFee, MonthlyFee } from "@/core/interfaces/monthlyFee.interface";

import { BaseApi } from "./base.api";
import { formatObj } from "@/common/utils/obj.utils";
import { toast } from "sonner";

export class MonthlyFeeApi extends BaseApi<MonthlyFee> {
  baseUrl: string = 'monthly-fee';

  create(entity: CreateMonthlyFee): Promise<void> {
    return new Promise((resolve, reject) => {
      this.serverApi
        .post(`${this.baseUrl}`, formatObj(entity))
        .then(() => {
          toast(this.createSuccessMessage);
          resolve();
        })
        .catch((error) => {
          toast(this.createFailureMessage, { description: error.message });
          reject(error);
        });
    });
  }
}