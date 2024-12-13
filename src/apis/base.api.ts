import axios, {AxiosInstance} from "axios";
import {toast} from "sonner";
import {formatObj} from "@/common/utils/obj.utils";
import {PaginationRequest, PaginationResponse} from "@/core/interfaces/pagination.interface";
import {buildParamsFromObject} from "@/common/utils/request.util";

export class BaseApi<T> {
    baseUrl: string = '';

    createSuccessMessage: string = 'Entity created successfully.';
    createFailureMessage: string = 'Entity created failed';

    updateSuccessMessage: string = 'Entity updated successfully.';
    updateFailureMessage: string = 'Entity updated failed';

    deleteSuccessMessage: string = 'Entity deleted successfully.';
    deleteFailureMessage: string = 'Entity deleted failed';

    findFailureMessage: string = 'Entity finds failed';

    private readonly serverApi: AxiosInstance = axios.create({
        baseURL: process.env.REACT_APP_API_SERVER || 'http://localhost:4001',
        headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
        },
    });

    async create(entity: Omit<T, '_id'>): Promise<void> {
        return new Promise((resolve, reject) => {
            this.serverApi
                .post(`${this.baseUrl}`, formatObj(entity))
                .then(() => {
                    toast(this.createSuccessMessage);
                    resolve();
                })
                .catch(({error}) => {
                    toast(this.createFailureMessage, {description: error.message});
                    reject(error);
                });
        });
    }

    async updateOne(entityId: string, entity: Partial<Omit<T, '_id'>>): Promise<void> {
        return new Promise((resolve, reject) => {
            this.serverApi
                .patch(`${this.baseUrl}/${entityId}`, formatObj(entity))
                .then(() => {
                    toast(this.updateSuccessMessage);
                    resolve();
                })
                .catch((error) => {
                    toast(this.updateFailureMessage, {description: error.message});
                    reject(error);
                });
        });
    }

    async deleteOne(entityId: string): Promise<void> {
        return new Promise((resolve, reject) => {
            this.serverApi
                .delete(`${this.baseUrl}/${entityId}`)
                .then(() => {
                    toast(this.deleteSuccessMessage);
                    resolve();
                })
                .catch((error) => {
                    toast(this.deleteFailureMessage, {description: error.message});
                    reject(error);
                });
        });
    }

    async find<Filter extends PaginationRequest>(filter: Filter): Promise<PaginationResponse<T>> {
        return new Promise((resolve, reject) => {
            this.serverApi
                .get(`${this.baseUrl}${buildParamsFromObject(filter)}`)
                .then(({data}) => {
                    resolve(data);
                })
                .catch((error) => {
                    toast(this.findFailureMessage, {description: error.message});
                    reject(error);
                });
        });
    }
}