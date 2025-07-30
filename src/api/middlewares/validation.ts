import { Request, Response, NextFunction } from 'express'
import { validationResult,param } from 'express-validator'

export const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() })
        return
    }
    next()
}
export const validateObjectIdExist = (model) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params
        const instance = await model.findByPk(id)
        if (!instance) {
            const error = new Error(`Registro no encontrado en ${model.name}`)
            res.status(404).json({ message: error.message })
            return
        }
        next()
    }
}
export const validateUniqueName = (model) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        const { name } = req.body;

        const normalizedName = name.toLowerCase();
        const record = await model.findOne({ where: { name: normalizedName } });
        
        if (record) {
            return res.status(400).json({
                message: `El nombre '${name}' ya existe en ${model.name}`
            });
        }
        
        next();
    };
};
