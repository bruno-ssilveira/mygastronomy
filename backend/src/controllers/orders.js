import OrdersDataAccess from '../dataAcess/orders.js'
import { ok, serverError } from '../helpers/httpResponse.js'

export default class OrdersControllers {
    constructor() {
        this.dataAccsses = new OrdersDataAccess()
    }

    async getOrders() {
        try {
            const orders = await this.dataAccsses.getOrders()

            return ok(orders)
        } catch (error) {
            return serverError(error)
        }
    }

    async getOrdersByUserId(userId) {
        try {
            const orders = await this.dataAccsses.getOrdersByUserId(userId)

            return ok(orders)
        } catch (error) {
            return serverError(error)
        }
    }

    async addOrder(orderData) {
        try {
            const result = await this.dataAccsses.addOrder(orderData)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async deleteOrder(orderId) {
        try {
            const result = await this.dataAccsses.deleteOrder(orderId)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }

    async updateOrder(orderId, orderData) {
        try {
            const result = await this.dataAccsses.updateOrder(orderId, orderData)

            return ok(result)
        } catch (error) {
            return serverError(error)
        }
    }
}