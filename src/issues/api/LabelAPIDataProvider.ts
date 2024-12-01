import { LabelModel } from "../model/label.model";

type CreateLabelRequest = {
    name: string,
    description?: string,
    color?: string,
}

type SetLabelRequest = {
    labels: string,
}

class LabelAPIDataProvider {
    public static getCreationLabelData(label: LabelModel): CreateLabelRequest {
        return {
            name: label.name, //вынести из issue model всё что касается label
            color: label.color,
            description: label.description,
        }
    }
}

export {
    LabelAPIDataProvider,
    CreateLabelRequest,
    SetLabelRequest
}