import { Model } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { Column, HasMany, Table } from 'sequelize-typescript';
import OrderItem from './OrderItem';

@Table({
    tableName: 'orders'
})
export class Order extends Model{
    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false
    })
    declare total: number;

    @Column({
        type: DataType.DECIMAL(10, 2),
        defaultValue: 0
    })
    declare discount: number;

    @Column({
        type: DataType.ENUM('CASH', 'CARD', 'TRANSFER', 'CREDIT'),
        allowNull: false,
        defaultValue:'CASH'
    })
    declare paymentMethod: 'CASH' | 'CARD' | 'TRANSFER' | 'CREDIT';


    @HasMany(()=>OrderItem,{
        onUpdate:'CASCADE',
        onDelete:'CASCADE',
    })
    declare items: OrderItem[]

    //TODO: Crear el modelo de customer
    // declare customerId: number | null;

    //TODO: Pendiente implementación
    // declare locationId: number;

    //TODO: Crear modelo User
    // declare createdById: number;
}



