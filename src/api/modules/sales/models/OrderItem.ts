import { BelongsTo, Column, DataType, ForeignKey, Model } from "sequelize-typescript";
import { Table } from "sequelize-typescript";
import { Order } from "./Order";
import Product from "../../inventory/models/Product";
import Location from "../../inventory/models/Location";

@Table({
    tableName: 'order_item'
})
class OrderItem extends Model {

    @ForeignKey(() => Order)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare orderId: number;

    @BelongsTo(() => Order)
    declare order: Order

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare productId: number;

    @BelongsTo(() => Product)
    declare product: Product

    @ForeignKey(() => Location)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare locationId: number;

    @BelongsTo(() => Location)
    declare location: Location

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare quantity: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare unitPrice: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    declare subtotal: number;
}
export default OrderItem