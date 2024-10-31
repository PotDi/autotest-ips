type IssueModel = {
    title: string,
    description: string,
}

function getRandomString(len: number): string {
    var num = ' '
    while (num.length < len)
        num += Math.random()
    return num.toString()
}

function createIssueModel(entities?: Partial<IssueModel>): IssueModel {
    return {
        title: entities?.title ?? getRandomString(6),
        description: entities?.description ?? getRandomString(6),
    }
}