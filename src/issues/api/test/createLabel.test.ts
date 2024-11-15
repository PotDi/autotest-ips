import { AxiosResponse } from 'axios'
import { CreateLabelRequest } from '../IssueAPIDataProvider'
import { IssueAPIProvider } from '../issueAPIProvider'
import { CreateLabelResponse } from '../issueAPIService'
import { data } from '../../../secrets/credential'

const OWNER = 'PotDi'
const REPOSITORY = 'autotest-ips'
const NAME = ['baguly']

describe('Create label', () => {
    const issueAPIProvider = new IssueAPIProvider({
        isSuccesfulResponse: false
    })
    it('Label should be created, code is OK', async () => {
        const data: CreateLabelRequest = {
            name: 'baguly',
            description: "Something isn't working",
            color: 'f29513'
        }
        const response: AxiosResponse<CreateLabelResponse> = await issueAPIProvider.createLabel(OWNER, REPOSITORY, data)

        // console.log(response.config.url)
        // console.log(response.status, response.statusText, response.data)
        expect(response.status).toEqual(201)
        expect(response.data.name).toEqual(data.name)
        expect(response.data.description).toEqual(data.description)
    })

    it.only('Label should be deleted', async () => {
        const response: AxiosResponse<Response> = await issueAPIProvider.deleteLabel(OWNER, REPOSITORY, NAME)

        console.log(response.status, response.statusText, response.data)
        expect(response.status).toEqual(204)
    })
})