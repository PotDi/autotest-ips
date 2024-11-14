import { AxiosResponse } from "axios"
import { createIssueModel, IssueModel } from "../../model/issue.model"
import { CreateIssueRequest } from "../IssueAPIDataProvider"
import { IssueAPIProvider } from "../issueAPIProvider"
import { CreateLabelResponse } from "../issueAPIService"

const OWNER = 'PotDi'
const REPOSITORY = 'autotest-ips'


describe('Create issue', () => {
    const issue: IssueModel = createIssueModel()

    it('Issue with label should be created', async () => {
        const data: CreateIssueRequest = {
            title: issue.title,
            body: issue.description,
            labels: ["bug"],
        }
        const issueAPIProvider = new IssueAPIProvider({
            isSuccesfulResponse: false
        })
        const response: AxiosResponse<CreateLabelResponse> = await issueAPIProvider.createIssue(OWNER, REPOSITORY, data)
    })
})