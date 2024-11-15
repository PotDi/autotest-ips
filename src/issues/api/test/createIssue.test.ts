import { AxiosResponse } from "axios"
import { createIssueModel, IssueModel } from "../../model/issue.model"
import { CreateIssueRequest } from "../IssueAPIDataProvider"
import { IssueAPIProvider } from "../issueAPIProvider"
import { CreateIssueResponse, CreateLabelResponse } from "../issueAPIService"

const OWNER = 'PotDi'
const REPOSITORY = 'autotest-ips'


describe('Create issue', () => {
    const issue: IssueModel = createIssueModel()

    it('Issue with label should be created', async () => {
        const data: CreateIssueRequest = {
            title: issue.title,
            body: issue.description,
            labels: ["baguly"],
        }
        const issueAPIProvider = new IssueAPIProvider({
            isSuccesfulResponse: false
        })
        const response: AxiosResponse<CreateIssueResponse> = await issueAPIProvider.createIssue(OWNER, REPOSITORY, data)

        console.log(response.status, response.statusText, response.data)

        expect(response.status).toEqual(201)
        expect(response.data.title).toEqual(data.title)
    })
})