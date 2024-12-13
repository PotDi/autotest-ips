import { AxiosResponse } from "axios"
import { IssueModel } from "../model/issue.model"
import { CreateIssueRequest, IssueAPIDataProvider } from "./IssueAPIDataProvider"
import { IssueAPIProvider } from "./IssueAPIProvider"
import { CreateLabelRequest, LabelAPIDataProvider } from "./LabelAPIDataProvider"
import { LabelModel } from '../model/label.model'
import { LabelAPIProvider } from "./LabelAPIProvider"

type CreateIssueResponse = {
    html_url: string
    state: string,
    number: number,
    title: string,
    body: string | null,
    labels: string,
}

type CreateLabelResponse = {
    name: string,
    description: string,
    color: string,
}

type GetListIssuesResponse = {
    title: string,
}

//задание №6
class IssueAPIService {
    public static async createIssue(issue: IssueModel, owner: string, repository: string): Promise<CreateIssueResponse> { //передать OWNER, REPOSITORY
        const data: CreateIssueRequest = IssueAPIDataProvider.getCreationIssueData(issue)
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider() //добавить типы
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(owner, repository, data)

        return response.data
    }

    public static async createLabel(label: LabelModel, owner: string, repository: string): Promise<CreateLabelResponse> {
        const data: CreateLabelRequest = LabelAPIDataProvider.getCreationLabelData(label)
        const labelAPIProvider = new LabelAPIProvider()
        const response: AxiosResponse<CreateLabelResponse> = await labelAPIProvider.createLabel(owner, repository, data)
        return response.data
    }

    public static async deleteLabel(label: LabelModel, owner: string, repository: string): Promise<number> {
        const labelAPIProvider = new LabelAPIProvider()
        const response: AxiosResponse<CreateLabelResponse> = await labelAPIProvider.deleteLabel(owner, repository, label.name)
        return response.status
    }
    public static async getListIssue(owner: string, repository: string): Promise<GetListIssuesResponse[]> { //передать OWNER, REPOSITORY
        const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider() //добавить типы
        const response: AxiosResponse<GetListIssuesResponse[]> = await issueAPIProvider.getListIssue(owner, repository)
        return response.data
    }
}

export {
    CreateIssueResponse,
    IssueAPIService,
    GetListIssuesResponse,
}