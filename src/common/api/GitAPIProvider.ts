import { config } from './../../wdio.conf';
import axios, { AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse, Method } from 'axios'
import { token } from "../../secrets/credential"

type APIProviderParameter = {
    isSuccesfulResponse: boolean,
}

class GitAPIProvider {
    protected isSuccesfulResponse: boolean
    protected headers: AxiosRequestHeaders
    protected personalToken = token

    constructor(parameter?: APIProviderParameter) {
        this.isSuccesfulResponse = parameter?.isSuccesfulResponse ?? true
        this.headers = {
            'Accept': 'application/vnd.github+json',
            'Authorization': `Bearer ${this.personalToken}`,
            'X-GitHub-Api-Version': '2022-11-28',
        }
    }

    public configureRequest(
        url: string,
        method: Method,
        data?: string | FormData,
    ): AxiosRequestConfig {
        return {
            url: `https://api.github.com${url}`,
            method,
            data,
            headers: this.headers,
        }
    }

    public sendRequest<T>(config: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        if (!this.isSuccesfulResponse) {
            config['validateStatus'] = status => Boolean(status)
        }

        return axios(config)
    }
}

export {
    GitAPIProvider,
}