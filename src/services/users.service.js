import { CartController } from "../controller/cart.controller.js"
import { CartDao } from "../models/DAO/carts.dao.js"
import { UsersDAO } from "../models/DAO/users.dao.js"
import { HTTP_STATUS, hashPassword, httpError } from "../utils/api.utils.js"
import { CartService } from "./cart.service.js"

const cartDao = new CartDao()
const usersDAO = new UsersDAO()

export class UsersService {

    async getUsers(){
        const users = await usersDAO.getUsers()
        return users
    }

    async getUserById(id){
        const user = await usersDAO.getUserById(id)
        return user
    }

    async createUser(payload){
        const {email, first_name, last_name, age, password} = payload

        if(!email|| !first_name|| !last_name|| !age|| !password){
            throw new httpError("Missing fields", HTTP_STATUS.BAD_REQUESTED)
        }

        const newCart = await cartDao.createCart()

        const newUserPayload = {
            first_name: first_name,
            last_name: last_name,
            age: age,
            password: hashPassword(password),
            role: email.includes('@coder.com') ? 'ADMIN' : 'USER',
            email: email,
            cart: newCart._id
        }
        console.log("newUserPayload Service: ", newUserPayload)

        const newUser = await usersDAO.createUser(newUserPayload);
        return newUser
    }

    async createUserGithub(payload){
        const {email, first_name, last_name, age, password, githubLogin} = payload

       /* if(!email|| !first_name|| !last_name|| !age|| !password){
            throw new httpError("Missing fields", HTTP_STATUS.BAD_REQUESTED)
        }*/

        const newCart = await cartDao.createCart()

        const newUserPayload = {
            first_name: first_name,
            last_name: last_name,
            age: age,
            password: password,
            role: 'USER',
            email: email,
            cart: newCart._id,
            githubLogin: githubLogin

        }
        console.log("newUserPayload Service: ", newUserPayload)

        const newUser = await usersDAO.createUser(newUserPayload);
        return newUser
    }

    async findOne(filter){
        const user = await usersDAO.findOne(filter)
        return user
    }


}

