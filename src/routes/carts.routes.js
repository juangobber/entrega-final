import { Router } from "express";
import { CartController } from "../controller/cart.controller.js";

const router = Router()

router.post('/', CartController.createCart)
router.get('/:cid', CartController.getCart)
router.post('/:cid/product/:pid', CartController.addProductToCart)
router.delete('/:cid/product/:pid', CartController.deleteProduct)
router.put('/:cid/product/:pid', CartController.updateQuantity)
router.put('/:cid/purchase', CartController.purchaseCart)



export default router