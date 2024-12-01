import { AxiosResponse } from "axios"
import { createIssueModel, IssueModel } from "../../model/issue.model"
import { CreateIssueRequest } from "../IssueAPIDataProvider"
import { IssueAPIProvider } from "../IssueAPIProvider"
import { CreateIssueResponse } from "../IssueAPIService"
import { labelData } from "../../model/label.model"

const OWNER = 'PotDi'
const REPOSITORY = 'autotest-ips'


describe('Create issue', () => {
    const issue: IssueModel = createIssueModel()
    const issueAPIProvider = new IssueAPIProvider({
        isSuccesfulResponse: false
    })

    it.only('Issue with label should be created, code is OK', async () => {
        const data: CreateIssueRequest = {
            title: issue.title,
            body: issue.description,
            labels: labelData.name //брать из модели
        }
        const issueAPIProvider = new IssueAPIProvider({ //добавить типы
            isSuccesfulResponse: false
        })
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(OWNER, REPOSITORY, data)

        expect(response.status).toEqual(201)
        expect(response.data.title).toEqual(data.title)
        expect(response.data.body).toEqual(data.body)
        expect(response.data.labels).toEqual(data.labels) //проверить label, body
        //добавить проверку найти созданную задачу в списке задач
    })

    it('Issue without label should be created, code is OK', async () => {
        const data: CreateIssueRequest = {
            title: issue.title,
            body: issue.description,
        }
        const issueAPIProvider = new IssueAPIProvider({
            isSuccesfulResponse: false
        })
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(OWNER, REPOSITORY, data)

        expect(response.status).toEqual(201)
        expect(response.data.title).toEqual(data.title)
        expect(response.data.body).toEqual(data.body)
        expect(response.data.labels).toEqual(data.labels) //проверить на пустое значение
    })

    it('Issue should not be created, code is Gone', async () => {
        const data: CreateIssueRequest = {
            title: issue.title,
            body: issue.description,
            labels: [labelData.name] //брать из модели
        }
        const issueAPIProvider = new IssueAPIProvider({
            isSuccesfulResponse: false
        })
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(OWNER, REPOSITORY, data) //указать новый репозиторий без Issue

        expect(response.status).toEqual(410)
    })

    it('Issue should not be created, code is Bad Request', async () => {
        const data: CreateIssueRequest = {
            title: '',
            body: issue.description,
            labels: []
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
            labels: [labelData.name],
        }
        const issueAPIProvider = new IssueAPIProvider({
            isSuccesfulResponse: false
        })
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(OWNER, `%${REPOSITORY}`, data)

        expect(response.status).toEqual(422)
    })
})