import Category from "../models/Category";
import Location from "../models/Location";
import Product from "../models/Product";

export class CategoryService {
    static async getAll() {
        return await Category.findAll();
    }

    static async getById(id: number) {
        return await Category.findByPk(id);
    }

    static async create(name: string) {

        const normalizedName = name.toLocaleLowerCase()

        return await Category.create({ name:normalizedName });
    }

    static async update(id: number, name: string) {
        const category = await Category.findByPk(id);
        const normalizedName = name.toLocaleLowerCase()
        return await category.update({ name:normalizedName });
    }

    static async delete(id: number) {
        const category = await Category.findByPk(id);
        await category.destroy();
        return { message: 'Categoría eliminada' };
    }
}
export class LocationService {
    static async getAll() {
        return await Location.findAll();
    }

    static async getById(id: number) {
        return await Location.findByPk(id);
    }

    static async create(name: string) {

        const normalizedName = name.toLocaleLowerCase()

        return await Location.create({ name:normalizedName });
    }

    static async update(id: number, name: string) {
        const location = await Location.findByPk(id);
        const normalizedName = name.toLocaleLowerCase()
        return await location.update({ name:normalizedName });
    }

    static async delete(id: number) {
        const location = await Location.findByPk(id);
        await location.destroy();
        return { message: 'Locación eliminada' };
    }
}
export class ProductService {
    static async getAll() {
        return await Product.findAll();
    }

    static async getById(id: number) {
        return await Product.findByPk(id);
    }

    static async create(product: any) {
        return await Product.create(product);
    }

    static async update(id: number, payload: any) {
        const product = await Product.findByPk(id)
        return await product.update(payload);
    }

    static async delete(id: number) {
        const product = await Product.findByPk(id);
        await product.destroy();
        return { message: 'Producto eliminado' };
    }
}