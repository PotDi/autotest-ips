type CreateLabelRequest = {
    name: string,
    description?: string,
    color?: string
}

type CreateIssueRequest = {
    title: string,
    body: string,
    labels: string[],
}

export {
    CreateLabelRequest,
    CreateIssueRequest,
}