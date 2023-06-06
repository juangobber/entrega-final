import { CartService } from "../services/cart.service.js"
import { ProductsService } from "../services/products.service.js"
import { TicketService } from "../services/ticket.service.js"
import { TicketController } from "./ticket.controller.js"

const ticketService = new TicketService()
const productsService = new ProductsService()
const cartService = new CartService()

export class ViewsController {
    
    static async getProducts(req, res, next){

        try {
            const response = await productsService.getProducts(req.query)
            const data = {
                status: 'success',
                payload: response.docs,
                totalPages: response.totalPages,
                prevPage: response.prevPage,
                nextPage: response.nextPage,
                page: response.page,
                hasPrevPage: response.hasPrevPage,
                hasNextPage: response.hasNextPage,
                prevLink: (response.hasPrevPage ? `localhost:8080/productos/?limit=${response.limit}&page=${response.prevPage}` : null),
                nextLink: (response.hasNextPage ? `/?limit=${response.limit}&page=${response.nextPage}` : null)
            }

            const renderProducts = data.payload
            const page = data.page
            const prevLink = data.prevLink
            const nextLink = data.nextLink
            const user = await req.session.user
            const cart = await req.session.user.cart
            res.render('products', {user, renderProducts, page, prevLink, nextLink, cart})
        } 
        catch (error) {
            next(error)
        }    
    } 

    static async getCart(req, res, next){
        try{
        const user = req.session.user
        const cartId = req.session.user.cart

        const cart = await cartService.getCart(cartId)
        const products = cart.products
        
        //Total del carrito
        let cartTotalValue = 0
        products.forEach(element => {
            cartTotalValue += parseInt(element.quantity)*parseInt(element.productId.price)
        });

        res.render('cart', {user, cartId, products, cartTotalValue})
        }
        catch(error){
            next(error)
        }
    }

    static async chat(req, res, next){
       const user = req.session.user.first_name
        res.render('chat', {user})
    }

    static async ticket(req, res, next){
        const {tid} = req.params
        console.log("tid", tid)
        try{

        const ticket = await ticketService.getTicketById(tid)
        console.log("ticket de ID", ticket)
        res.render('ticket', {ticket})

       } catch(error){
        next(error)
       }
        
        
    }

}