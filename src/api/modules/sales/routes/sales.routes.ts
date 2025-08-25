import { Router } from "express";
import { OrderController } from "../controllers/OrderController";
import { handleInputErrors } from "../../../middlewares/validation";
import { createOrderValidation } from "../middlewares/validators/orderValidator";

const router = Router()

router.post('/orders',
    createOrderValidation,
    handleInputErrors,
    OrderController.create
)
router.get('/orders',
    OrderController.getAll
)

export default router