import { Request, Response } from "express";
import { OrderService } from "../services/OrderService";

export class OrderController {
    static async create(req: Request, res: Response) {
        try {
            const order = await OrderService.create(req.body);
            res.status(201).json(order);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    }
}