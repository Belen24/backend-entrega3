import { Router } from "express";
import { CartsController } from "../controllers/carts.controller.js";
import { checkRoles, checkUserAuthenticatedView } from "../middlewares/auth.js"

const router = Router();

router.post("/", CartsController.createCart);
router.post("/:cid/product/:pid", checkUserAuthenticatedView, checkRoles(["user"]), CartsController.addProduct);
router.post("/:cid/purchase", CartsController.purchase);

export { router as cartsRouter};