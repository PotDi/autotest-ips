import { AxiosResponse } from 'axios'
import { CreateLabelRequest } from '../IssueAPIDataProvider'
import { IssueAPIProvider } from '../issueAPIProvider'
import { CreateLabelResponse } from '../issueAPIService'
import { data } from '../../../secrets/credential'

const OWNER = 'PotDi'
const REPOSITORY = 'autotest-ips'
const LABELS = ['baguly']

describe('Create label', () => {
    const issueAPIProvider = new IssueAPIProvider({
        isSuccesfulResponse: false
    })
    it('Label should be created, code is OK', async () => { //добавить кейсы без описания, без цвета
        const data: CreateLabelRequest = {
            name: 'baguly',
            description: "Something isn't working",
            color: 'f29513' //передавать из модели
        }
        const response: AxiosResponse<CreateLabelResponse> = await issueAPIProvider.createLabel(OWNER, REPOSITORY, data)

        expect(response.status).toEqual(201)
        expect(response.data.name).toEqual(data.name)
        expect(response.data.description).toEqual(data.description)
    })

    it.only('Label should be deleted', async () => {
        const response: AxiosResponse<void> = await issueAPIProvider.deleteLabel(OWNER, REPOSITORY, LABELS)

        expect(response.status).toEqual(204) //проверить что удалился лейбл (UI или API)
    })
})