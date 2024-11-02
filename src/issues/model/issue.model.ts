import { getRandomString } from "../../common/data/generateData"

type IssueModel = {
    title: string,
    description: string,
}

function createIssueModel(entities?: Partial<IssueModel>): IssueModel {
    return {
        title: entities?.title ?? getRandomString(6),
        description: entities?.description ?? getRandomString(6),
    }
}

export {
    IssueModel,
    createIssueModel,
}