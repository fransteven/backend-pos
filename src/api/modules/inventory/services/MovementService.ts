import Movement, { MovementType } from "../models/Movement";
import { db as sequelize } from "../../../../config/db";
import StockLocation from "../models/StockLocation";

export class MovementService {
    static async getAll() {
        return await Movement.findAll();
    }

    static async getById(id: number) {
        return await Movement.findByPk(id);
    }

    //TODO: Crear el dto para cada campo
    static async create(dto: any) {
        return await sequelize.transaction(async (t) => {
            const { product_id, movementType, quantity,location_origin_id, location_dest_id, doc_ref } = dto;
            let newMove;

            switch (movementType) {
                case MovementType.IN_PURCHASE:
                case MovementType.IN_RETURN:
                case MovementType.IN_ADJUSTMENT: {
                    // Validar stock por location_dest_id
                    const sourceStock = await StockLocation.findOne({
                        where: { product_id, location_id: location_dest_id },
                        transaction: t
                    });

                    if (sourceStock) {
                        sourceStock.quantity += quantity;
                        await sourceStock.save({ transaction: t });
                    } else {
                        await StockLocation.create({
                            product_id,
                            location_id: location_dest_id,
                            quantity
                        }, { transaction: t });
                    }

                    // Crear movimiento
                    newMove = await Movement.create({
                        product_id,
                        movementType,
                        quantity,
                        location_dest_id,
                        doc_ref
                    }, { transaction: t });

                    return newMove;  
                }

                //TODO: … casos OUT_* y TRANSFER con su propia lógica y return
                case MovementType.OUT_SALE:
                case MovementType.OUT_ADJUSTMENT:
                case MovementType.OUT_WARRANTY_REPAIR:
                case MovementType.OUT_DISPOSAL:

                    const sourceStock = await StockLocation.findOne({
                        where: { product_id, location_id: location_origin_id },
                        transaction: t
                    });
                    if (sourceStock) {
                        if (quantity > sourceStock.quantity) {
                            throw new Error('Stock insuficiente!')
                        }
                        sourceStock.quantity -= quantity
                        await sourceStock.save({transaction:t})
                    }
                    else {
                        throw new Error('Producto o locación erroneas!')
                    }
                    // Crear movimiento
                    newMove = await Movement.create({
                        product_id,
                        movementType,
                        quantity,
                        location_origin_id,
                        doc_ref
                    }, { transaction: t });

                    return newMove;
                
                case MovementType.TRANSFER:
                    

                default:
                    throw new Error(`Tipo de movimiento desconocido: ${movementType}`);
            }
        });
    }
    static async update(id: number, name: string) {

        return
    }

    static async delete(id: number) {

        return
    }
}