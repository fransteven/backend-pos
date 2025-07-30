import { Order } from "../models/Order";

export class OrderService {
    static async getAll() {
        return await Order.findAll();
    }

    static async getById(id: number) {
        return 'GET BY ID'
    }

    static async create(order: object) {
        console.log(order)
        return ''
    }

    static async update(id: number, name: string) {
        return 'UPDATE'
    }

    static async delete(id: number) {
        return 'DELETE'
    }
}