import { Request, Response } from "express";
import { MovementService } from "../services/MovementService";

export class MovementController {
    static async create(req: Request, res: Response) {
        try {
            console.log(req.body)
            const product = await MovementService.create(req.body);
            res.status(201).json(product);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}