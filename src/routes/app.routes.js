import productsRouter from "./products.routes.js"
import cartsRouter from "./carts.routes.js"
import usersRouter from "./users.routes.js"
import sessionRouter from "./session.routes.js"
import ticketRoutes from "./ticket.routes.js"
import { Router } from "express";

const router = Router()

router.use('/products', productsRouter)
router.use('/carts', cartsRouter)
router.use('/users', usersRouter)
router.use('/sessions', sessionRouter)
router.use('/ticket', ticketRoutes)

export default router