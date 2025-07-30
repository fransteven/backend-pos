import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import StockLocation from "./StockLocation";

@Table({
    tableName: 'locations'
})
class Location extends Model {
    @Column({
        type: DataType.STRING(100),
        unique:true
    })
    declare name: string

    @HasMany(() => StockLocation)
    declare stockLocations: StockLocation[];
}

export default Location