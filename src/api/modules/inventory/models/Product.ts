import { BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Category from "./Category";
import StockLocation from "./StockLocation";

@Table({
    tableName: 'products'
})
class Product extends Model {

    @Column({
        type: DataType.STRING
    })
    declare name: string;

    @Column({
        type: DataType.STRING
    })
    declare description: string;

    @Column({
        type: DataType.STRING
    })
    declare brand: string;

    @Column({
        type: DataType.DECIMAL
    })
    declare unit_cost: number;

    @Column({
        type: DataType.DECIMAL
    })
    declare sale_price: number;

    @Column({
        type: DataType.INTEGER
    })
    declare warranty_period_days: number;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue:true
    })
    declare is_active: boolean;

    @ForeignKey(() => Category)
    @Column({
        type: DataType.INTEGER,
        allowNull: false,
    })
    declare category_id: number;

    @BelongsTo(() => Category)
    declare category: Category;

    @HasMany(() => StockLocation)
    declare stockLocations: StockLocation[];
}

export default Product