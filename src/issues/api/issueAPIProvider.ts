import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { GitAPIProvider } from "../../common/api/GitAPIProvider";
import { CreateLabelRequest } from "./IssueAPIDataProvider";

class IssueAPIProvider extends GitAPIProvider {
    public async createLabel<T>(owner: string, repository: string, data: CreateLabelRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner} / ${repository} / labels`,
            'POST',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }

    public async createIssue<T>(owner: string, repository: string, data: CreateLabelRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repository}/issues`,
            'POST',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }

    public async deleteLabel<T>(owner: string, repository: string, name: string, data: CreateLabelRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repository}/labels/${name}`,
            'DELETE'
        )
        return this.sendRequest(config)
    }

}

export {
    IssueAPIProvider,
}