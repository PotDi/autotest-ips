import { getRandomString } from "../../common/data/generateData"

type IssueModel = {
    title: string,
    description: string,
    comment: string,
}

function createIssueModel(entities?: Partial<IssueModel>): IssueModel {
    return {
        title: entities?.title ?? getRandomString(6),
        description: entities?.description ?? getRandomString(7),
        comment: entities?.comment ?? getRandomString(10)
    }
}

export {
    IssueModel,
    createIssueModel,
}