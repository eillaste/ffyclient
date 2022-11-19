import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { ApiBaseUrl } from '../configuration';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';
import { IStatsPostData } from "../dto/IStatsPostData"

export abstract class BaseService {
    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    protected static getAxiosConfiguration(jwt?: string): AxiosRequestConfig | undefined {
        console.log("jwt inside getaxiosconf " + jwt)
        if (!jwt) return undefined;
        const config: AxiosRequestConfig = {
            headers: {
                Authorization: 'Bearer ' + jwt
            }
        };  
        return config;      
    }

    static async getAll<TEntity>(apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity[]>> {
        console.log("inside getall")
        try {
            console.log("inside getall try")
            let response = await this.axios.get<TEntity[]>(apiEndpoint, BaseService.getAxiosConfiguration(jwt));
            console.log("getall response ")
            console.log(response)
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            console.log("inside getall catch")
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }

    }

    static async get<TEntity>(apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        console.log("WHY NEVER GET HERE?")
        try {
            console.log("INSIDE GET")
            console.log(apiEndpoint)
            let response = await this.axios.get<TEntity>(apiEndpoint, BaseService.getAxiosConfiguration(jwt));
            console.log("RESPONSE FROM GET")
            console.log(response)
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }

    }

    static async delete<TEntity>(id: string, apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        try {
            let response = await this.axios.delete<TEntity>(apiEndpoint, BaseService.getAxiosConfiguration(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }
    }


    static async put<TEntity>(entity: TEntity, apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        try {
            let response = await this.axios.put<TEntity>(apiEndpoint, entity, BaseService.getAxiosConfiguration(jwt));
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }
    }

    static async create<TEntity>(entity: TEntity, apiEndpoint: string, jwt?: string): Promise<IFetchResponse<TEntity>> {
        try {
            let response = await this.axios.post<TEntity>(apiEndpoint, entity, BaseService.getAxiosConfiguration(jwt));
            console.log("CREATE IN BASE SERVICE")
            console.log(response);
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }
    }

    static async registerMeal(apiEndpoint: string, jwt?: string): Promise<any> {
        console.log("inside registerMeal")
        try {
            let response = await this.axios.get(apiEndpoint, BaseService.getAxiosConfiguration(jwt));
            console.log(response)
            // return {
            //     ok: response.status <= 299,
            //     statusCode: response.status,
            //     data: response.data
            // };    
            return true;
        }
        catch (err) {
            console.log("error inside register meal")
            let error = err as AxiosError;
            // return {
            //     ok: false,
            //     statusCode: error.response?.status ?? 500,
            //     messages: (error.response?.data as IMessages).messages,
            // }
            return false;
        }
    }


    static async postForStats(data: IStatsPostData, apiEndpoint: string, jwt?: string): Promise<any> {
        try {
            let response = await this.axios.post(apiEndpoint, data, BaseService.getAxiosConfiguration(jwt));
            console.log("posted for stats")
            console.log(response);
            return {
                ok: response.status <= 299,
                statusCode: response.status,
                data: response.data
            };    
        }
        catch (err) {
            let error = err as AxiosError;
            return {
                ok: false,
                statusCode: error.response?.status ?? 500,
                messages: (error.response?.data as IMessages).messages,
            }
        }
    }
}