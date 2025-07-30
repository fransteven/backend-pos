import { AllowNull, BelongsTo, Column, DataType, ForeignKey, HasMany, Model, Table } from "sequelize-typescript";
import Product from "./Product";
import Location from "./Location";

export enum MovementType {
    // --- Tipos de Entrada (Incrementan el stock) ---
    /** Productos recibidos de un proveedor después de una compra. */
    IN_PURCHASE = 'IN_PURCHASE',
    /** Productos devueltos por un cliente y reingresados al inventario. */
    IN_RETURN = 'IN_RETURN',
    /** Ajuste positivo de stock (ej. corrección por conteo físico, descubrimiento de stock no registrado). */
    IN_ADJUSTMENT = 'IN_ADJUSTMENT',

    //TODO:
    /** Transferencia de productos. */
    TRANSFER = 'TRANSFER',

    // --- Tipos de Salida (Decrementan el stock) ---
    /** Productos vendidos a un cliente. */
    OUT_SALE = 'OUT_SALE',
    /** Ajuste negativo de stock (ej. corrección por conteo físico, productos dañados, perdidos, obsoletos). */
    OUT_ADJUSTMENT = 'OUT_ADJUSTMENT',
    /** Productos enviados para garantía o reparación (temporalmente fuera de stock disponible para venta). */
    OUT_WARRANTY_REPAIR = 'OUT_WARRANTY_REPAIR',
    /** Productos que se dan de baja por desuso, desecho, etc. */
    OUT_DISPOSAL = 'OUT_DISPOSAL',
}

@Table({
    tableName: 'movements'
})
class Movement extends Model {
    @ForeignKey(() => Product)
    @Column({
        type: DataType.INTEGER
    })
    declare product_id: number;

    @BelongsTo(() => Product)
    declare product: Product;

    @Column({
        type: DataType.ENUM(...Object.values(MovementType)),
        allowNull: false
    })
    declare movementType: MovementType;

    @Column({
        type: DataType.INTEGER
    })
    declare quantity: number;

    @ForeignKey(() => Location)
    @Column({
        type: DataType.INTEGER,
        allowNull: true,
        defaultValue:null
    })
    declare location_origin_id: number | null;

    @BelongsTo(() => Location, 'location_origin_id')
    declare locationOrigin: Location;

    @ForeignKey(() => Location)
    @Column({
        type: DataType.INTEGER,
        allowNull:true,
        defaultValue:null
    })
    declare location_dest_id: number | null;

    @BelongsTo(() => Location, 'location_dest_id')
    declare locationDest: Location;

    @Column({
        type: DataType.INTEGER
    })
    declare doc_ref: number;

    // declare user
}

export default Movement