import Movement, { MovementType } from "../models/Movement";
import { db as sequelize } from "../../../../config/db";
import StockLocation from "../models/StockLocation";
import { Transaction } from 'sequelize'
import Product from "../models/Product";
import Location from "../models/Location";

export class MovementService {
    static async getAll() {
        return await Movement.findAll({
            attributes: ['id','movementType','quantity','doc_ref','createdAt','updatedAt'],
            include: [{
                model: Product,
                attributes: ['name']
            },
            {
                model:Location,
                as:'locationOrigin',
                attributes:['name']
            },
            {
                model:Location,
                as:'locationDest',
                attributes:['name']
            },
        ]
        });
    }

    static async getById(id: number) {
        return await Movement.findByPk(id);
    }

    //TODO: Crear el dto para cada campo
    static async create(dto: any, options?: { transaction?: Transaction }) {

        const useTx = options?.transaction ? options.transaction : await sequelize.transaction()

        const { product_id, movementType, quantity, location_origin_id, location_dest_id, doc_ref } = dto;
        let newMove;

        switch (movementType) {
            case MovementType.IN_PURCHASE:
            case MovementType.IN_RETURN:
            case MovementType.IN_ADJUSTMENT: {
                // Validar stock por location_dest_id
                const sourceStock = await StockLocation.findOne({
                    where: { product_id, location_id: location_dest_id },
                    transaction: useTx
                });

                if (sourceStock) {
                    sourceStock.quantity += quantity;
                    await sourceStock.save({ transaction: useTx });
                } else {
                    await StockLocation.create({
                        product_id,
                        location_id: location_dest_id,
                        quantity
                    }, { transaction: useTx });
                }

                // Crear movimiento
                newMove = await Movement.create({
                    product_id,
                    movementType,
                    quantity,
                    location_dest_id,
                    doc_ref
                }, { transaction: useTx });

                if (!options?.transaction) {
                    await useTx.commit()
                }

                return newMove;
            }

            //TODO: … casos OUT_* y TRANSFER con su propia lógica y return
            case MovementType.OUT_SALE:
            case MovementType.OUT_ADJUSTMENT:
            case MovementType.OUT_WARRANTY_REPAIR:
            case MovementType.OUT_DISPOSAL:

                const sourceStock = await StockLocation.findOne({
                    where: { product_id, location_id: location_origin_id },
                    transaction: useTx
                });
                if (sourceStock) {
                    if (quantity > sourceStock.quantity) {
                        throw new Error('Stock insuficiente!')
                    }
                    sourceStock.quantity -= quantity
                    await sourceStock.save({ transaction: useTx })
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
                }, { transaction: useTx });

                if (!options?.transaction) {
                    await useTx.commit()
                }

                return newMove;

            // case MovementType.TRANSFER:
            default:
                throw new Error(`Tipo de movimiento desconocido: ${movementType}`);

        }
    }
    static async update(id: number, name: string) {

        return
    }

    static async delete(id: number) {

        return
    }
}