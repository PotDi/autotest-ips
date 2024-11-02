import { GetUserResponse, UserAPIService } from "./api/UserAPIService"
import { createUser, User } from "./model/user.model"

describe('TEST API', () => {
    it('', async () => {
        const response: GetUserResponse = await UserAPIService.getUser()
        console.log(response)

        const user: User = createUser()
        const patchResponse: GetUserResponse = await UserAPIService.patchUser(user)
        console.log(patchResponse)
    })
})