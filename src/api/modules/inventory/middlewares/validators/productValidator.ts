import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
import Location from "../../models/Location";

export const createCategoryValidation = [
    body('name')
        .notEmpty().withMessage('La categoría no puede ir vacía.')
]

export const createLocationValidation = [
    body('name')
        .notEmpty().withMessage('La locación no puede ir vacía.')
]

export const createProductValidation = [
    body('name')
        .notEmpty().withMessage('El nombre del producto no puede ir vacío.'),
    body('description')
        .notEmpty().withMessage('La descripción del producto no puede ir vacía.'),
    body('brand')
        .notEmpty().withMessage('La marca del producto no puede ir vacía.'),
    body('unit_cost')
        .isNumeric().withMessage('El costo unitario debe ser un valor numérico.')
        .custom((input) => input >= 0).withMessage('El costo unitario debe ser mayor o igual a 0.'),
    body('sale_price')
        .isNumeric().withMessage('El precio de venta debe ser un valor numérico.')
        .custom((value, { req }) => {
            if (Number(value) <= Number(req.body.unit_cost)) {
                throw new Error('El precio de venta debe ser mayor que el costo unitario.');
            }
            return true;
        }),
    body('warranty_period_days')
        .isNumeric().withMessage('El periodo de garantía debe ser un valor numérico.')
        .isInt().withMessage('El periodo de garantía deber ser un valor entero.'),
    body('category_id')
        .isNumeric().withMessage('El id de la categoría debe ser un valor numérico.')
        .isInt().withMessage('El id de la categoría debe ser un valor entero.')
]

export const updateProductValidation = [
    ...createProductValidation.map(rule=>rule.optional()),
    body('is_active')
        .optional()
        .isBoolean().withMessage('El campo is_active debe ser booleano.')
]

export const updateCategoryValidation = [
    body('name')
        .notEmpty().withMessage('La categoría no puede ir vacía.')
]
export const updateLocationValidation = [
    body('name')
        .notEmpty().withMessage('La categoría no puede ir vacía.')
]

export const validateId = async (req: Request, res: Response, next: NextFunction) => {
    await param('id')
        .isInt().withMessage('El id debe ser un número entero válido.')
        .custom(value => value > 0).run(req)
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    next()
}

export const createMovementValidator = [
    body('movementType')
        .isString()
        .isIn(['IN_PURCHASE', 'IN_RETURN', 'IN_ADJUSTMENT', 'TRANSFER', 'OUT_SALE', 'OUT_ADJUSTMENT', 'OUT_WARRANTY_REPAIR', 'OUT_DISPOSAL'])
        .withMessage('Tipo de movimiento inválido'),
    
    body('quantity')
        .isInt({ min: 1 })
        .withMessage('La cantidad debe ser un número entero positivo'),
    
    body('product_id')
        .isInt({ min: 1 })
        .withMessage('ID de producto inválido'),
    
    body('doc_ref')
        .isInt({ min: 1 })
        .withMessage('Referencia de documento inválida'),
    
    // Validar que location_origin_id existe (si se proporciona)
    body('location_origin_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('ID de ubicación origen inválido')
        .custom(async (value) => {
            if (value) {
                const location = await Location.findByPk(value);
                if (!location) {
                    throw new Error('La ubicación de origen no existe');
                }
            }
            return true;
        }),
    
    // Validar que location_dest_id existe (si se proporciona)
    body('location_dest_id')
        .optional()
        .isInt({ min: 1 })
        .withMessage('ID de ubicación destino inválido')
        .custom(async (value) => {
            if (value) {
                const location = await Location.findByPk(value);
                if (!location) {
                    throw new Error('La ubicación de destino no existe');
                }
            }
            return true;
        }),
    
    // Validar lógica de negocio básica
    body()
        .custom(async (value) => {
            const { movementType, location_origin_id, location_dest_id } = value;
            
            // Para movimientos de entrada, debe haber ubicación destino
            if (movementType.startsWith('IN_') && !location_dest_id) {
                throw new Error('Los movimientos de entrada requieren ubicación de destino');
            }
            
            // Para movimientos de salida, debe haber ubicación origen
            if (movementType.startsWith('OUT_') && !location_origin_id) {
                throw new Error('Los movimientos de salida requieren ubicación de origen');
            }
            
            // Para transferencias, deben haber ambas ubicaciones
            if (movementType === 'TRANSFER' && (!location_origin_id || !location_dest_id)) {
                throw new Error('Las transferencias requieren ubicación de origen y destino');
            }
            
            // Para transferencias, origen y destino no pueden ser iguales
            if (movementType === 'TRANSFER' && location_origin_id === location_dest_id) {
                throw new Error('La ubicación de origen y destino no pueden ser iguales');
            }
            
            return true;
        }),
];


