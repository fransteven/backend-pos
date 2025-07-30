import { Request, Response } from "express";
import { CategoryService, LocationService, ProductService } from "../services/ProductService";



export class CategoryController {
    static async getAll(req: Request, res: Response) {
        const categories = await CategoryService.getAll();
        res.json(categories);
    }

    static async getById(req: Request, res: Response) {
        const category = await CategoryService.getById(Number(req.params.id));
        res.json(category);
    }

    static async create(req: Request, res: Response) {

        try {
            const { name } = req.body;
            const category = await CategoryService.create(name);
            res.status(201).json(category);
        } catch (error:any) {
            res.status(400).json({ error: error.message });
        }   

    }

    static async update(req: Request, res: Response) {
        const { name } = req.body;
        const category = await CategoryService.update(Number(req.params.id), name);
        res.json(category);
    }

    static async delete(req: Request, res: Response) {
        const result = await CategoryService.delete(Number(req.params.id));
        res.json(result);
    }
}

export class LocationController{
    static async getAll(req: Request, res: Response) {
        const locations = await LocationService.getAll();
        res.json(locations);
    }

    static async getById(req: Request, res: Response) {
        const location = await LocationService.getById(Number(req.params.id));
        res.json(location);
    }

    static async create(req: Request, res: Response) {
        try {
            const { name } = req.body;
            const location = await LocationService.create(name);
            res.status(201).json(location);
        } catch (error:any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        const { name } = req.body;
        const location = await LocationService.update(Number(req.params.id), name);
        res.json(location);
    }

    static async delete(req: Request, res: Response) {
        const result = await LocationService.delete(Number(req.params.id));
        res.json(result);
    }
}
export class ProductController{
    static async getAll(req: Request, res: Response) {
        const products = await ProductService.getAll();
        res.json(products);
    }

    static async getById(req: Request, res: Response) {
        const product = await ProductService.getById(Number(req.params.id));
        res.json(product);
    }

    static async create(req: Request, res: Response) {
        try {
            console.log(req.body)
            const product = await ProductService.create(req.body);
            res.status(201).json(product);
        } catch (error:any) {
            res.status(400).json({ error: error.message });
        }
    }

    static async update(req: Request, res: Response) {
        const product = await ProductService.update(Number(req.params.id), req.body);
        res.json(product);
    }

    static async delete(req: Request, res: Response) {
        const result = await ProductService.delete(Number(req.params.id));
        res.json(result);
    }
}
