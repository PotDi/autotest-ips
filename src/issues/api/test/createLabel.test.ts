import { AxiosResponse } from 'axios'
import { CreateLabelRequest } from '../IssueAPIDataProvider'
import { IssueAPIProvider } from '../issueAPIProvider'
import { CreateLabelResponse } from '../issueAPIService'

const OWNER = 'PotDi'
const REPOSITORY = 'autotest-ips'

describe('Create label', () => {
    it('Label should be created, code is OK', async () => {
        const data: CreateLabelRequest = {
            name: 'bug',
            description: "Something isn't working",
            color: 'f29513'
        }
        const issueAPIProvider = new IssueAPIProvider({
            isSuccesfulResponse: false
        })
        const response: AxiosResponse<CreateLabelResponse> = await issueAPIProvider.createLabel(OWNER, REPOSITORY, data)

        console.log(response.config.url)
        // console.log(response.status, response.statusText, response.data)
    })
})