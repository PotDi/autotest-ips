import { IssueModel } from "../model/issue.model"

type CreateIssueRequest = {
    title: string,
    body?: string,
    labels?: string,
}

class IssueAPIDataProvider {
    public static getCreationIssueData(issue: IssueModel): CreateIssueRequest {
        return {
            title: issue.title,
            body: issue.description,
            labels: issue.label.name,
        }
    }
}

export {
    CreateIssueRequest,
    IssueAPIDataProvider,
}