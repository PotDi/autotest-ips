import { getRandomString } from "../../common/data/generateData"
import { LabelModel } from "./label.model"

type AttachModel = {
    firstImage: string,
    secondImage: string,
    thirdImage: string,
}


type IssueModel = {
    title: string,
    description?: string,
    comment?: string, // добавить путь к файлу и название лейбла
    attach?: AttachModel,
    labels?: LabelModel[],
    url?: string,
}

function createIssueModel(entities?: Partial<IssueModel>): IssueModel {
    return {
        title: entities?.title ?? getRandomString(6),
        description: entities?.description ?? getRandomString(7, { desc: true }),
        comment: entities?.comment ?? getRandomString(10, { desc: true }),
        attach: entities?.attach,
        labels: entities?.labels,
        url: entities?.url,
    }
}

export {
    IssueModel,
    createIssueModel,
}