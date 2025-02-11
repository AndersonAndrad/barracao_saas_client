import { MonthlyFee } from "@/core/interfaces/monthlyFee.interface";

import { formatObj } from "@/common/utils/obj.utils";
import { toast } from "sonner";
import { BaseApi } from "./base.api";

export class MonthlyFeeApi extends BaseApi<MonthlyFee> {
  baseUrl: string = 'monthly-fee';

  override create<CreateMonthlyFee>(entity: CreateMonthlyFee): Promise<void> {
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