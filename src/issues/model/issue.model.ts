import { getRandomString } from "../../common/data/generateData"
import { ATTACH_PATH } from "../../common/data/image.data"
import { labelData, LabelModel } from "./label.model"

type IssueModel = {
    title: string,
    description: string,
    comment: string, // добавить путь к файлу и название лейбла
    attach: string,
    label: LabelModel,
}

function createIssueModel(entities?: Partial<IssueModel>): IssueModel {
    return {
        title: entities?.title ?? getRandomString(6),
        description: entities?.description ?? getRandomString(7),
        comment: entities?.comment ?? getRandomString(10),
        attach: entities?.attach ?? ATTACH_PATH,
        label: entities?.label ?? labelData,
    }
}

export {
    IssueModel,
    createIssueModel,
}