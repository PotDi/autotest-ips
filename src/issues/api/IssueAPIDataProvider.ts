type CreateLabelRequest = {
    name: string,
    description?: string,
}

type CreateIssueRequest = {
    title: string,
    body: string,
    labels: string,
}

export {
    CreateLabelRequest,
    CreateIssueRequest,
}