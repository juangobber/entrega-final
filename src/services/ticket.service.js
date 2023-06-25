import { CartDao } from "../models/DAO/carts.dao.js";
import { TicketDao } from "../models/DAO/ticket.dao.js";
import { CartService } from "./cart.service.js";
import { v4 as uuidv4 } from 'uuid'

const cartDao =  new CartDao()
const ticketDao = new TicketDao()
const cartService = new CartService()

export class TicketService {

    async createTicket(cid, user){
        const {email} = user
        const cart = await cartService.getCart(cid)
        
        let purchaseAmount = 0
        let productsInStock = []
        let productsNoStock = {products: []}
        //Processing the cart:
        cart.products.forEach(element => {
        if ( element.quantity <= element.productId.stock ) {
          productsInStock.push({quantity: element.quantity, productId: element.productId._id})
          purchaseAmount += parseInt(element.quantity) * parseInt(element.productId.price)
        } else {
          productsNoStock.products.push({quantity: element.quantity, productId: element.productId._id})
        }   
               
        });

        const newTicketPayload = {
            products: productsInStock,
            code: uuidv4(),
            purchaser: user.email ?? user.githubLogin,
            purchase_datetime: new Date().toLocaleString(),
            amount: purchaseAmount
        }

        const request = await cartService.updateCartAfterPurchase(cid, productsNoStock)
        const ticket = await ticketDao.createTicket(newTicketPayload)
        return {ticket, productsNoStock}
    }

    async getTicketById(tid){
        const ticket = await ticketDao.getTicketById(tid)
        return ticket

    }
    
}
