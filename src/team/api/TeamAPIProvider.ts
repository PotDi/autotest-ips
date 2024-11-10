import { AxiosResponse, AxiosRequestConfig } from "axios";
import { GitAPIProvider } from "../../common/api/GitAPIProvider";
import { CreateTeamRequest } from "./teamAPIDataProvider";

class TeamAPIProvider extends GitAPIProvider {
    public create<T>(organization: string, data: CreateTeamRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            `/orgs/${organization}/teams`,
            'POST',
            JSON.stringify(data)
        )
        return this.sendRequest(config)
    }

}

export {
    TeamAPIProvider,
}