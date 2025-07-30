import { Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Product from "./Product";

@Table({
    tableName:'categories'
})
class Category extends Model{

    @Column({
        type:DataType.STRING(100),
        unique:true
    })
    declare name:string

    @HasMany(()=>Product,{
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
    })
    declare products:Product[]
}

export default Category