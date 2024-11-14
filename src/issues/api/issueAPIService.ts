type CreateLabelResponse = {
    name: string,
    description: string | null,
    color: string | null,
}

type CreateIssueResponse = {
    state: string,
    title: string,
    body: string | null,
    labels: string,
}

export {
    CreateLabelResponse,
    CreateIssueResponse,
}