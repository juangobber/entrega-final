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
        
}