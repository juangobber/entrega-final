import { Router } from "express";
import { UsersController } from "../controller/users.controller.js";

const router = Router()


router.get('/', UsersController.getUsers)
router.get('/:uid', UsersController.getUserById)
router.post('/', UsersController.createUser)
router.delete('/', UsersController.deleteUsers)
router.delete('/:uid', UsersController.deleteUser)
router.put('/:uid/:role', UsersController.updateUser )

export default router