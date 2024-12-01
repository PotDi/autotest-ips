import { AxiosRequestConfig, AxiosResponse } from "axios";
import { GitAPIProvider } from "../../common/api/GitAPIProvider";
import { CreateLabelRequest, SetLabelRequest } from "./LabelAPIDataProvider";

class LabelAPIProvider extends GitAPIProvider {
    public async createLabel<T>(owner: string, repository: string, data: CreateLabelRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repository}/labels`,
            'POST',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }

    public async deleteLabel<T>(owner: string, repository: string, name: string): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repository}/labels/${name}`,
            'DELETE'
        )
        return this.sendRequest(config)
    }

    public async setLabelsForIssue<T>(owner: string, repository: string, issue_number: number, data: SetLabelRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `repos/${owner}/${repository}/issues/${issue_number}/labels`,
            'PUT',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }

    public async getListLabelsForIssue<T>(owner: string, repository: string, issue_number: number): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/repos/${owner}/${repository}/issues/${issue_number}/labels`,
            'GET',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }
}

export {
    LabelAPIProvider,
}