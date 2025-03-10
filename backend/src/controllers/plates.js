import PlatesDataAccess from '../dataAcess/plates.js'
import { ok, serverError } from '../helpers/httpResponse.js'

export default class PlatesControllers {
    constructor() {
        this.dataAccsses = new PlatesDataAccess()
    }

    async getPlates() {
        try {
            const plates = await this.dataAccsses.getPlates()

            return ok(plates)
        } catch (error) {
            return serverError(error)
        }
    }

    async getAvailablePlates() {
        try {
            const plates = await this.dataAccsses.getAvailablePlates()

            return ok(plates)
        } catch (error) {
            return serverError(error)
        }
    }

    async addPlate(plateData) {
        try {
            const result = await this.dataAccsses.addPlate(plateData)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async deletePlate(plateId) {
        try {
            const result = await this.dataAccsses.deletePlate(plateId)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async updatePlate(plateId, plateData) {
        try {
            const result = await this.dataAccsses.updatePlate(plateId, plateData)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}