import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Product from "./Product";
import Location from "./Location";

@Table({
    tableName: 'stockLocation'
})
class StockLocation extends Model {

    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER
    })
    declare product_id: number;

    @BelongsTo(() => Product)
    declare product: Product;

    @ForeignKey(() => Location)
    @Column({
        type: DataType.INTEGER
    })
    declare location_id: number;

    @BelongsTo(() => Location)
    declare location: Location;

    @Column({
        type: DataType.INTEGER
    })
    declare quantity: number;

}

export default StockLocation