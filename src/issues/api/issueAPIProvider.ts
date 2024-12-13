import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { GitAPIProvider } from "../../common/api/GitAPIProvider";
import { CreateIssueRequest } from "./IssueAPIDataProvider";
import { IssueModel } from '../model/issue.model';
import { CreateLabelRequest } from "./LabelAPIDataProvider";

class IssueAPIProvider extends GitAPIProvider {
    public async createIssue<T>(owner: string, repository: string, data: CreateIssueRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repository}/issues`,
            'POST',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }

    public async getListIssue<T>(owner: string, repository: string): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repository}/issues`,
            'GET',
        )
        return this.sendRequest(config)
    }

    public async setCommentIssue<T>(owner: string, repository: string, issue_number: number, data: IssueModel): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repository}/issues/${issue_number}/comments`,
            'POST',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }
    public async createLabel<T>(owner: string, repository: string, data: CreateLabelRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repository}/labels`,
            'POST',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }
}

export {
    IssueAPIProvider,
}