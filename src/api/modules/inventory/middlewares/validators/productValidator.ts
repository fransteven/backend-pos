import { body, param, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

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



