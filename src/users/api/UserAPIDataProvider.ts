import { User } from "../model/user.model";

type PatchUserRequest = {
    name: string,
    company: string,
}

class UserAPIDataProvider {
    public static getUserData(user: User): PatchUserRequest {
        return {
            name: user.name,
            company: user.company,
        }
    }
}

export {
    UserAPIDataProvider,
    PatchUserRequest,
}