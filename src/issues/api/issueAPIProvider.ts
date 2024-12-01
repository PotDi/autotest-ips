import { Axios, AxiosRequestConfig, AxiosResponse } from "axios";
import { GitAPIProvider } from "../../common/api/GitAPIProvider";
import { CreateIssueRequest } from "./IssueAPIDataProvider";
import { data } from '../../secrets/credential';
import { IssueModel } from '../model/issue.model';

class IssueAPIProvider extends GitAPIProvider {

    public async createIssue<T>(owner: string, repository: string, data: CreateIssueRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repository}/issues`,
            'POST',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }

    public async getListIssue<T>(): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            '/issues',
            'GET',
            JSON.stringify(data)
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
}

export {
    IssueAPIProvider,
}