import { AxiosResponse } from "axios"
import { LabelModel } from "../model/label.model"
import { CreateLabelRequest, LabelAPIDataProvider } from "./LabelAPIDataProvider"
import { LabelAPIProvider } from "./LabelAPIProvider"

type CreateLabelResponse = {
    name: string,
    description: string,
    color: string,
}

class LabelAPIService {
    public static async createLabel(label: LabelModel, owner: string, repository: string): Promise<CreateLabelResponse> {
        const data: CreateLabelRequest = LabelAPIDataProvider.getCreationLabelData(label)
        const labelAPIProvider = new LabelAPIProvider()
        const response: AxiosResponse<CreateLabelResponse> = await labelAPIProvider.createLabel(owner, repository, data)
        return response.data
    }
}

export { LabelAPIService, CreateLabelResponse, }