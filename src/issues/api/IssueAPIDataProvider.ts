type CreateLabelRequest = {
    name: string,
    description?: string,
    color?: string,
}

type CreateIssueRequest = {
    title: string,
    body: string,
    labels: string[],
}

type SetLabelRequest = {
    labels: string[],
}

export {
    CreateLabelRequest,
    CreateIssueRequest,
    SetLabelRequest,
}