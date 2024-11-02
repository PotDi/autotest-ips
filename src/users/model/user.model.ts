import { UserData } from "../../users/data/user.data";

type UserModel = {
    login: string,
    password: string,
    email: string,
}

type User = {
    name: string,
    company: string,
}

function createUser(): User {
    return {
        name: 'Test',
        company: 'TestCompany'
    }
}

function createUserModel(data: UserData): UserModel {
    return {
        login: data.login,
        password: data.password,
        email: data.email,
    }
}

export {
    UserModel,
    createUserModel,
    User,
    createUser,
}