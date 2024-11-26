import { AxiosResponse } from "axios"
import { createIssueModel, IssueModel } from "../../model/issue.model"
import { CreateIssueRequest } from "../IssueAPIDataProvider"
import { IssueAPIProvider } from "../issueAPIProvider"
import { CreateIssueResponse } from "../issueAPIService"
import { labelData } from "../../model/label.model"

const OWNER = 'PotDi'
const REPOSITORY = 'autotest-ips'


describe('Create issue', () => {
    const issue: IssueModel = createIssueModel()

    it.only('Issue with label should be created, code is OK', async () => {
        const data: CreateIssueRequest = {
            title: issue.title,
            body: issue.description,
            labels: labelData.name[0] //брать из модели
        }
        const issueAPIProvider = new IssueAPIProvider({
            isSuccesfulResponse: false
        })
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(OWNER, REPOSITORY, data)

        console.log(response.status, response.statusText, response.data)

        expect(response.status).toEqual(201)
        expect(response.data.title).toEqual(data.title)
        expect(response.data.body).toEqual(data.body)
        expect(response.request.config).toEqual('GET')
        expect(response.data.labels).toEqual(data.labels) //проверить label, body
    })

    it('Issue should not be created, code is Gone', async () => {
        const data: CreateIssueRequest = {
            title: issue.title,
            body: issue.description,
            labels: labelData.name[0] //брать из модели
        }
        const issueAPIProvider = new IssueAPIProvider({
            isSuccesfulResponse: false
        })
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(OWNER, REPOSITORY, data)

        expect(response.status).toEqual(410)
    })

    it('Issue should not be created, code is Bad Request', async () => {
        const data: CreateIssueRequest = {
            title: '',
            body: issue.description,
            labels: ''
        }
        const issueAPIProvider = new IssueAPIProvider({
            isSuccesfulResponse: false
        })
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(OWNER, REPOSITORY, data)

        expect(response.status).toEqual(400)
    })

    it('Issue should not be created, code is Validation failed', async () => {
        const data: CreateIssueRequest = {
            title: issue.title,
            body: issue.description,
            labels: labelData.name[0],
        }
        const issueAPIProvider = new IssueAPIProvider({
            isSuccesfulResponse: false
        })
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(OWNER, REPOSITORY, data)

        expect(response.status).toEqual(422)
    })
})