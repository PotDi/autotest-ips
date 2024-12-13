import { IssueModel } from "../model/issue.model"
import { LabelModel } from "../model/label.model"

type CreateIssueRequest = {
    title: string,
    body?: string,
    labels?: string[],
}

class IssueAPIDataProvider {
    public static getCreationIssueData(issue: IssueModel, label?: LabelModel): CreateIssueRequest {
        return {
            title: issue.title,
            body: issue.description,
            labels: issue.labels?.map(label => label.name),
        }
    }
}

export {
    CreateIssueRequest,
    IssueAPIDataProvider,
}