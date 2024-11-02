import { config } from './../../wdio.conf';
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { GitAPIProvider } from "../../common/api/GitAPIProvider";
import { PatchUserRequest } from './UserAPIDataProvider';

class UserAPIProvider extends GitAPIProvider {
    public async getUser<T>(): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            '/user',
            'GET',
        )
        return this.sendRequest(config)
    }

    public patchUser<T>(data: PatchUserRequest): Promise<AxiosResponse<T>> {
        const config: AxiosRequestConfig = this.configureRequest(
            'user',
            'PATCH',
            JSON.stringify(data),
        )
        return this.sendRequest(config)
    }
}

export {
    UserAPIProvider,
}