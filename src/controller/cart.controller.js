import { CartService } from "../services/cart.service.js"
import { TicketService } from "../services/ticket.service.js"
import { successResponse } from "../utils/api.utils.js"
import { HTTP_STATUS } from "../utils/api.utils.js"

const ticketService = new TicketService()
const cartService = new CartService()

export class CartController {

    static async createCart(req, res, next){
        try {
            const createdCart = await cartService.createCart()
            const response = successResponse(createdCart)
            res.status(HTTP_STATUS.CREATED).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async getCart(req, res, next){
        const {cid} = req.params

        try {
            const cart = await cartService.getCart(cid)
            const response = successResponse(cart)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async addProductToCart(req, res, next){
        const {cid, pid} = req.params
        const user = req.session.user
        
        try {
            const request = await cartService.addProduct(cid, pid, user)
            const response = successResponse(request)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async deleteProduct(req, res, next){
        const {cid, pid} = req.params

        try {
            const request = await cartService.deleteProduct(cid, pid)
            const response = successResponse(request)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async updateQuantity(req, res, next){
        const {cid, pid } = req.params
        const{quantity} = req.query

        try {
            const request = await cartService.updateQuantity(cid, pid, quantity)
            const response = successResponse(request)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async purchaseCart(req, res, next){
        const {cid} = req.params
        const user = req.session.user
        console.log("user en cart", user)
        try{
            const response = await ticketService.createTicket(cid, user)
            console.log("RESPUESTA TICKET : ", response)
            res.status(HTTP_STATUS.OK).json(response)
        }catch(error){
            next(error)
        }
    }
/*
    static async purchaseCartTest(req, res, next){
        const {cid} = req.params
        const user = {email: "ernesto@gmail.com"}
        try{
            const response = await ticketService.createTicket(cid, user)
            console.log("RESPUESTA TICKET : ", response)
            res.status(HTTP_STATUS.OK).json(response)

        }catch(error){
            next(error)
        }
    }*/
}