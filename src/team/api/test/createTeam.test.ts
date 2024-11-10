import { AxiosResponse } from "axios"
import { CreateTeamRequest } from "../teamAPIDataProvider"
import { TeamAPIProvider } from "../teamAPIProvider"
import { CreateTeamResponse } from "../TeamAPIService"

const ORGANIZATION_NAME = 'Test-Company2'

describe('Create team', () => {
    it('Team should be created, code is OK', async () => {
        const data: CreateTeamRequest = {
            name: 'Test Team22' + (new Date().getTime()),
        }
        const teamAPIProvider: TeamAPIProvider = new TeamAPIProvider({
            isSuccesfulResponse: false
        })
        const response: AxiosResponse<CreateTeamResponse> = await teamAPIProvider.create(ORGANIZATION_NAME, data)

        console.log(response.config.url)
        // console.log(response.status, response.statusText, response.data)

        expect(response.status).toEqual(201)
        expect(response.data.name).toEqual(data.name)
        expect(response.data.description).toBeNull()
        expect(response.data.created_at.match(/\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ/)![0]).toBeDefined()
    })
})