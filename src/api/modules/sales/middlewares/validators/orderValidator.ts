import { body } from "express-validator"

export const createOrderValidation = [
    body('discount')
        .isInt({ min: 1, max: 100 })
        .withMessage('El descuento debe ser un valor entero entre 1 y 100'),
    body('paymentMethod')
        .isIn(['CASH', 'CARD', 'TRANSFER', 'CREDIT'])
        .withMessage('El método de pago debe ser uno de: CASH, CARD, TRANSFER, CREDIT'),
    body('items').isArray().withMessage('items debe ser un array'),
    body('items.*.productId').isInt().withMessage('productId debe ser un entero'),
    body('items.*.locationId').isInt().withMessage('locationId debe ser un entero'),
    body('items.*.quantity')
        .isInt().withMessage('La cantidad debe ser un número entero')
        .custom(value => value > 0).withMessage('La cantidad debe ser un valor mayor que cero'),
    body('items.*.unitPrice')
        .isNumeric().withMessage('El precio por unidad debe ser un valor numérico')
        .custom(value => value > 0).withMessage('El precio por unidad debe ser un valor mayor que cero')
]