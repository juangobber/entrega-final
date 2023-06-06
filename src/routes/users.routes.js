import { Router } from "express";
import { UsersController } from "../controller/users.controller.js";

const router = Router()


router.get('/', UsersController.getUsers)
router.get('/:uid', UsersController.getUserById)
router.post('/', UsersController.createUser)

export default router