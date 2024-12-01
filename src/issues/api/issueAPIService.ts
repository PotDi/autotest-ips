import { AxiosResponse } from "axios"
import { IssueModel } from "../model/issue.model"
import { CreateIssueRequest, IssueAPIDataProvider } from "./IssueAPIDataProvider"
import { IssueAPIProvider } from "./IssueAPIProvider"

type CreateIssueResponse = {
    state: string,
    number: number,
    title: string,
    body: string | null,
    labels: string,
}

class IssueAPIService {
    public static async createIssue(issue: IssueModel, owner: string, repository: string): Promise<CreateIssueResponse> { //передать OWNER, REPOSITORY
        const data: CreateIssueRequest = IssueAPIDataProvider.getCreationIssueData(issue)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider() //добавить типы
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(owner, repository, data)
        return response.data
    }
}

export {
    CreateIssueResponse,
    IssueAPIService,
}