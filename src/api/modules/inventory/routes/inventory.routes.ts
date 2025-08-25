import { Router } from "express";
import { CategoryController, LocationController, ProductController, StockController } from "../controllers/ProductController";
import { createCategoryValidation, createLocationValidation, createMovementValidator, createProductValidation, updateCategoryValidation, updateLocationValidation,  updateProductValidation,  validateId } from "../middlewares/validators/productValidator";
import { handleInputErrors, validateUniqueName } from "../../../middlewares/validation";
import Location from "../models/Location";
import { validateObjectIdExist } from "../../../middlewares/validation";
import Category from "../models/Category";
import Product from "../models/Product";
import { MovementController } from "../controllers/MovementController";


const router = Router()

router.param('id',validateId)

//Categorías
router.get('/categories', CategoryController.getAll);

router.get('/categories/:id', 
    validateObjectIdExist(Category),
    CategoryController.getById);

router.post('/categories',
    createCategoryValidation,
    validateUniqueName(Category),
    handleInputErrors,
    CategoryController.create);

router.put('/categories/:id', 
    updateCategoryValidation,
    validateObjectIdExist(Category),
    validateUniqueName(Category),
    handleInputErrors,
    CategoryController.update);

router.delete('/categories/:id', 
    validateObjectIdExist(Category),
    CategoryController.delete);


//Locaciones
router.get('/locations', LocationController.getAll);

router.get('/locations/:id', 
    validateObjectIdExist(Location),
    LocationController.getById);

router.post('/locations',
    createLocationValidation,
    validateUniqueName(Location),
    handleInputErrors,
    LocationController.create);

router.put('/locations/:id', 
    updateLocationValidation,
    validateObjectIdExist(Location),
    validateUniqueName(Location),
    handleInputErrors,
    LocationController.update);

router.delete('/locations/:id', 
    validateObjectIdExist(Location),
    LocationController.delete);

//Productos

router.get('/products', ProductController.getAll);

router.get('/products/:id', 
    validateObjectIdExist(Product),
    ProductController.getById);

router.post('/products',
    createProductValidation,
    handleInputErrors,
    ProductController.create);

router.put('/products/:id', 
    updateProductValidation,
    validateObjectIdExist(Product),
    handleInputErrors,
    ProductController.update);

router.delete('/products/:id', 
    validateObjectIdExist(Product),
    ProductController.delete);

//Stock
router.get('/stock',
    StockController.getAll
)


//Movimientos del inventario

router.get('/movements',
    MovementController.getAll
)
router.post('/movements',
    createMovementValidator,
    handleInputErrors,
    MovementController.create
)


export default router