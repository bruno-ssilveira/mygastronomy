import UsersDataAccess from '../dataAcess/users.js'
import { ok, serverError } from '../helpers/httpResponse.js'

export default class UsersControllers {
    constructor() {
        this.dataAccsses = new UsersDataAccess()
    }

    async getUsers() {
        try {
            const users = await this.dataAccsses.getUsers()

            return ok(users)
        } catch (error) {
            return serverError(error)
        }
    }

    async deleteUser(userId) {
        try {
            const result = await this.dataAccsses.deleteUser(userId)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async updateUser(userId, userData) {
        try {
            const result = await this.dataAccsses.updateUser(userId, userData)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}