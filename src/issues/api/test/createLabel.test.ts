import { AxiosResponse } from 'axios'
import { CreateLabelRequest } from '../LabelAPIDataProvider'
import { IssueAPIProvider } from '../IssueAPIProvider'
import { CreateLabelResponse } from '../LabelAPIService'
import { labelData } from '../../model/label.model'

const OWNER = 'PotDi'
const REPOSITORY = 'autotest-ips'
const LABELS = labelData.name.join(' ')

describe('Create label', () => {
    const issueAPIProvider = new IssueAPIProvider({
        isSuccesfulResponse: false
    })
    it('Label should be created, code is OK', async () => { //добавить кейсы без описания, без цвета
        const data: CreateLabelRequest = {
            name: LABELS,
            description: labelData.description,
            color: labelData.color //передавать из модели
        }
        const response: AxiosResponse<CreateLabelResponse> = await issueAPIProvider.createLabel(OWNER, REPOSITORY, data)

        expect(response.status).toEqual(201)
        expect(response.data.name).toEqual(data.name)
        expect(response.data.description).toEqual(data.description)
        expect(response.data.color).toEqual(data.color)
    })

    it('Label should be created without color, code is OK', async () => {
        const data: CreateLabelRequest = {
            name: LABELS,
            description: labelData.description,
        }
        const response: AxiosResponse<CreateLabelResponse> = await issueAPIProvider.createLabel(OWNER, REPOSITORY, data)

        expect(response.status).toEqual(201)
        expect(response.data.name).toEqual(data.name)
        expect(response.data.description).toEqual(data.description)
        expect(response.data.color).toBeNull()
    })

    it('Label should be created without description, code is OK', async () => {
        const data: CreateLabelRequest = {
            name: LABELS,
            color: labelData.color, //передавать из модели
        }
        const response: AxiosResponse<CreateLabelResponse> = await issueAPIProvider.createLabel(OWNER, REPOSITORY, data)

        expect(response.status).toEqual(201)
        expect(response.data.name).toEqual(data.name)
        expect(response.data.description).toEqual(data.description)
        expect(response.data.color).toBeNull()
    })

    it.only('Label should be deleted', async () => {
        const response: AxiosResponse<void> = await issueAPIProvider.deleteLabel(OWNER, REPOSITORY, LABELS)
        const getListLabels: AxiosResponse<void> = await issueAPIProvider.getListLabelsForIssue(OWNER, REPOSITORY, number)

        expect(response.status).toEqual(204) //проверить что удалился лейбл (UI или API)
    })
})