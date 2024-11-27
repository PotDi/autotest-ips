type CreateLabelResponse = {
    name: string,
    description: string,
    color: string,
}

type CreateIssueResponse = {
    state: string,
    number: number,
    title: string,
    body: string | null,
    labels: string,
}

export {
    CreateLabelResponse,
    CreateIssueResponse,
}