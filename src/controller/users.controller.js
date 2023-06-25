import { UsersService } from "../services/users.service.js";
import { HTTP_STATUS, successResponse } from "../utils/api.utils.js";

const usersService = new UsersService()

export class UsersController {
    static async getUsers(req, res, next){
        console.log("Hasta acá llegue")
        try{
            const users = await usersService.getUsers()
            const response = successResponse(users)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async getUserById(req, res, next){
        console.log("Hasta acá llegue")
        const {uid} = req.body
        try{
            const users = await usersService.getUserById(uid)
            const response = successResponse(users)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async createUser(req, res, next){
        const userPayload = req.body
        try{
            const users = await usersService.createUser(userPayload)
            const response = successResponse(users)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async deleteUsers(req, res, next) {
        try {
            const deletedUsers = await usersService.deleteUsers()
            const response = successResponse(deletedUsers)
            res.status(HTTP_STATUS.OK).json(response)
        } 
        catch(error) {
            next(error)
        }
    }

    static async updateUser(req, res, next){
        const {uid} = req.params
        const {role} = req.params
        console.log("Hasta acá llego", role)
        console.log("req.params", uid)
        try{
            const updateUser = await usersService.updateUser(uid, role)
            const response = successResponse(updateUser)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async deleteUser(req, res, next) {
        const {uid} = req.params
        try{
            const deleteUser = await usersService.deleteUser(uid)
            const response = successResponse(deleteUser)
            res.status(HTTP_STATUS.OK).json(response)
        }catch(error){
            next(error)
        }
    }
        
}