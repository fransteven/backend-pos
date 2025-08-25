import { db } from "../../../../config/db";
import { MovementService } from "../../inventory/services/MovementService";
import { Order } from "../models/Order";
import OrderItem from "../models/OrderItem";

export class OrderService {
    static async getAll() {
        return await Order.findAll();
    }

    static async getById(id: number) {
        return 'GET BY ID'
    }

    static async create(dto) {

        const { paymentMethod, items } = dto
        const t = await db.transaction();

        const order = await Order.create({ paymentMethod, total: 0 }, { transaction: t })

        let total = 0;

        const orderItems: OrderItem[] = [];

        for (const it of items) {
            const subtotal = it.quantity * it.unitPrice
            total += subtotal
            const orderItem = await OrderItem.create(
                {
                    ...it,
                    orderId: order.id,
                    subtotal
                }, { transaction: t }
            )
            orderItems.push(orderItem)

            //Creación del movimiento y actualización del stock
            const dtoMovement = {
                product_id: it.productId,
                movementType: 'OUT_SALE',
                quantity: it.quantity,
                location_origin_id: it.locationId,
                doc_ref: order.id
            }
            const movement = await MovementService.create(dtoMovement,{transaction:t})
            if (!movement) {
                throw new Error('No se ha podido crear el movimiento!.')
            }
        }
        order.total = total
        order.items = orderItems
        await order.save({ transaction: t })
        await t.commit()

        return order
    }

    static async update(id: number, name: string) {
        return 'UPDATE'
    }

    static async delete(id: number) {
        return 'DELETE'
    }
}