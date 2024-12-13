import { AxiosRequestConfig, AxiosResponse } from "axios"
import { createIssueModel, IssueModel } from "../../model/issue.model"
import { CreateIssueRequest, IssueAPIDataProvider } from "../IssueAPIDataProvider"
import { IssueAPIProvider } from "../IssueAPIProvider"
import { CreateIssueResponse, GetListIssuesResponse, IssueAPIService } from "../IssueAPIService"
import { labelData } from "../../model/label.model"
import { owner, repo, repository } from "../../../secrets/credential"

describe('Create issue', () => {
    const issue: IssueModel = createIssueModel({
        labels: []
    })
    const issueAPIProvider: IssueAPIProvider = new IssueAPIProvider({
        isSuccesfulResponse: false
    })

    it('Issue with label should be created, code is OK, method is GET', async () => {
        const data: CreateIssueRequest = IssueAPIDataProvider.getCreationIssueData(issue)
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(owner, repository, data)

        expect(response.status).toEqual(201)
        expect(response.data.title).toEqual(issue.title)
        expect(response.data.body).toEqual(issue.description)
        expect(response.data.labels).toEqual(issue.labels?.map(label => label.name))
        const issueList: GetListIssuesResponse[] = await IssueAPIService.getListIssue(owner, repository)
        expect(issueList.some(item => item.title === issue.title)).toEqual(true)
    })

    it('Issue without label should be created, code is OK', async () => {
        const data: CreateIssueRequest = {
            title: issue.title,
            body: issue.description,
            labels: []
        }
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(owner, repository, data)

        expect(response.status).toEqual(201)
        expect(response.data.title).toEqual(data.title)
        expect(response.data.body).toEqual(data.body)
        expect(response.data.labels).toEqual(data.labels)
    })

    it('Issue should not be created, code is Gone', async () => {
        const data: CreateIssueRequest = {
            title: issue.title
        }

        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(owner, repo, data)

        expect(response.status).toEqual(410)
    })

    it('Issue should not be created, code is Bad Request', async () => {
        const data: CreateIssueRequest = {
            title: '',
        }
        const issueAPIProvider = new IssueAPIProvider({
            isSuccesfulResponse: false
        })
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(owner, repository, data)

        expect(response.status).toEqual(422)
    })

    it('Issue should not be created, code is Bad Request', async () => {
        const data: {} = {}

        const issueAPIProvider = new IssueAPIProvider({
            isSuccesfulResponse: false
        })
        const config: AxiosRequestConfig = issueAPIProvider.configureRequest(
            `/repos/${owner}/${repository}/issues`,
            'POST',
            JSON.stringify(data)
        )
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.sendRequest(config)

        expect(response.status).toEqual(422)
    })

    it('Issue should not be created, code is Validation failed', async () => {
        const data: CreateIssueRequest = {
            title: issue.title,
        }

        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(owner, `%${repository}`, data)

        expect(response.status).toEqual(400)
    })
})