import { getRandomString } from "../../common/data/generateData"

type IssueModel = {
    title: string,
    description: string,
    comment: string,
}

function issueModel(entities?: Partial<IssueModel>): IssueModel {
    return {
        title: entities?.title ?? getRandomString(6),
        description: entities?.description ?? getRandomString(7),
        comment: entities?.comment ?? getRandomString(10)
    }
}

export {
    IssueModel,
    issueModel,
}