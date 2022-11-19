import { ISupportedLanguage } from '../types/ISupportedLanguage';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
//import { HttpClient } from "aurelia";
import { ApiBaseUrl } from '../configuration';
import { IFetchResponse } from "../types/IFetchResponse";
import { IMessages } from '../types/IMessages';
import { ILangResources } from '../types/ILangResources';

export class LangService {
  protected static axios = Axios.create({
    baseURL: ApiBaseUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

static async getSupportedLanguages(endpoint: string = "",  langName: string = ""): Promise<IFetchResponse<ISupportedLanguage[] | IMessages>> {
  
  try {
      console.log("INSIDE GET")
      console.log(endpoint)
      let response = await this.axios.get(endpoint);
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

}}