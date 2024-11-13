import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { GitAPIProvider } from "../../common/api/GitAPIProvider";
import { CreateLabelRequest } from "./IssueAPIDataProvider";

class IssueAPIProvider extends GitAPIProvider {
    public async CreateLabel<T>(owner: string, repository: string, data: CreateLabelRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner} / ${repository} / labels`,
            'POST',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }

    public async getCreateIssue<T>(): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            '/repos/{owner}/{repo}/issues',
            'POST'
        )
        return this.sendRequest(config)
    }

    public async getDeleteLabel<T>(): Promise

}

export {
    IssueAPIProvider,
}