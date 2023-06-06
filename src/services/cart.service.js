import { CartDao } from "../models/DAO/carts.dao.js";
import { ProductsDao } from "../models/DAO/products.dao.js";
import { HTTP_STATUS, httpError } from "../utils/api.utils.js";

const cartDao = new CartDao()
const productDao = new ProductsDao()

export class CartService {

    async createCart(){
        const createdCart = await cartDao.createCart()
        return createdCart
    }

    async getCart(cid){
        const cart = await cartDao.getCart(cid)
        return cart
    }

    async addProduct(cid, pid){
        const cartVerification = await cartDao.cartVerification(cid)
        if (!cartVerification) {
            throw new httpError("The cart doesn't exist", HTTP_STATUS.NOT_FOUND)
        } 

        const productVerification = await productDao.productVerification(pid)
        if (!productVerification) {
            throw new httpError("The product doesn't exist", HTTP_STATUS.NOT_FOUND)
        }
        
        const productAlreadyExists = cartVerification.products.findIndex((product) => product.productId.equals(pid))

        //Creo una copia del documento recibido
        let updatedCart = Object.assign({},cartVerification)

        if (productAlreadyExists === -1) {
            //Añado un nuevo producto desde cero
            updatedCart.products.push({productId: pid, quantity: 1})
        } else {
            updatedCart.products[productAlreadyExists].quantity++
        }

        const request = await cartDao.updateProduct(cid, updatedCart)
        return request
    }

    async deleteProduct(cid, pid) {
        const cartVerification = await cartDao.cartVerification(cid)
        if (!cartVerification) {
            throw new httpError("The cart doesn't exist", HTTP_STATUS.NOT_FOUND)
        } 

        const productVerification = await productDao.productVerification(pid)
        if (!productVerification) {
            throw new httpError("The product doesn't exist", HTTP_STATUS.NOT_FOUND)
        }
        
        const productAlreadyExists = cartVerification.products.findIndex((product) => product.productId.equals(pid))

        //Creo una copia del documento recibido
        let updatedCart = Object.assign({},cartVerification)

        if (productAlreadyExists >= 0) {
            //Elimino producto
            updatedCart.products.splice(productAlreadyExists, 1)
        } else {
            //Error No existe el producto en el carrito
            throw new httpError("The product doesn't exist in the cart", HTTP_STATUS.BAD_REQUESTED)
        }

        const request = await cartDao.updateProduct(cid, updatedCart)
        return request
    }

    async updateQuantity(cid, pid, quantity) {

        const cartVerification = await cartDao.cartVerification(cid)
        if (!cartVerification) {
            throw new httpError("The cart doesn't exist", HTTP_STATUS.NOT_FOUND)
        } 

        const productVerification = await productDao.productVerification(pid)
        if (!productVerification) {
            throw new httpError("The product doesn't exist", HTTP_STATUS.NOT_FOUND)
        }
        
        const productAlreadyExists = cartVerification.products.findIndex((product) => product.productId.equals(pid))

        //Creo una copia del documento recibido
        let updatedCart = Object.assign({},cartVerification)

        if (productAlreadyExists >= 0) {
            //Actualizo la cantidad
            updatedCart.products[productAlreadyExists].quantity = quantity
            
        } else {
            //Error No existe el producto en el carrito
            throw new httpError("The product doesn't exist in the cart", HTTP_STATUS.BAD_REQUESTED)
        }

        const request = await cartDao.updateProduct(cid, updatedCart)
        return request
    }

    async updateCartAfterPurchase(cid, payload) {
        const request = cartDao.updateCartAfterPurchase(cid, payload)
        return request
    }

}