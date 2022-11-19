import { ILoginResponse } from './../types/ILoginResponse';
import Axios, { AxiosError } from 'axios';
import { ApiBaseUrl } from '../configuration';
import { IFetchResponse } from '../types/IFetchResponse';
import { IMessages } from '../types/IMessages';

export abstract class IdentityService {
    protected static axios = Axios.create({
        baseURL: ApiBaseUrl,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    static async Login(apiEndpoint: string, loginData: {email: string, password:string}): Promise<IFetchResponse<ILoginResponse>> {
        let loginDataJson = JSON.stringify(loginData);
        try {
            let response = await this.axios.post<ILoginResponse>(apiEndpoint, loginDataJson);
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


    static async Register(email: string, password: string, accountType: string): Promise<IFetchResponse<ILoginResponse>> {
        const url = ApiBaseUrl + "/account/register";
        
        try {
        const body = { email: email, password: password, accountType: accountType };
        const bodyStr = JSON.stringify(body);
        
        const response = await fetch(url, {
          method: 'POST',
          cache: 'no-store',
          body: bodyStr,
          headers: { 'Content-Type': 'application/json' }
        });
        
        if (response.ok) {
        const data = (await response.json()) as ILoginResponse;
        return {
        ok: response.status <= 299,
        statusCode: response.status,
        data: data
        };
        }
        
        // TODO, why cant i do this?
        const data = (await response.json()) as IMessages;
        
        return {
        ok: false,
        statusCode: response.status,
        // messages: response.statusText + ' ' + data.messages.join(' ')
        };
        } catch (reason) {
        return {
        statusCode: 0,
        ok: false,
        // messages: JSON.stringify(reason)
        messages: (reason.response?.data as IMessages).messages,
        };
        }
        }

}