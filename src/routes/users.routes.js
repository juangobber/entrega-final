import { Router } from "express";
import { UsersController } from "../controller/users.controller.js";
import admin_auth from "../middleware/admin.middleware.js";
import { sessionMiddleware } from "../middleware/session.middleware.js";

const router = Router()


router.get('/', UsersController.getUsers)
router.get('/:uid', UsersController.getUserById)
router.post('/', UsersController.createUser)
router.delete('/', admin_auth, UsersController.deleteUsers)
router.delete('/:uid', admin_auth, UsersController.deleteUser)
router.put('/:uid/:role', admin_auth, UsersController.updateUser )

export default router