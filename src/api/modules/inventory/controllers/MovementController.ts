import { Request, Response } from "express";
import { MovementService } from "../services/MovementService";

export class MovementController {
    static async getAll(req: Request, res: Response) {
        try {
            const movements = await MovementService.getAll();
            res.json(movements);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
    static async create(req: Request, res: Response) {
        try {
            const movement = await MovementService.create(req.body);
            if (movement) {
                res.status(201).json('Movimiento creado correctamente');
            }
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}