import cartModel from "../schemas/cart.model.js";

export class CartDao {

    async createCart() {
        const createdCart = await cartModel.create({})
        return createdCart
    }

    async getCart(cid){
        const cart = await cartModel.findById(cid).populate('products.productId').lean()
        return cart
    }

    async updateProduct(cid, payload){
        const request = await cartModel.findOneAndUpdate({_id: cid}, payload, {new: true}).populate('products.productId').lean()
        return request
    }

    async cartVerification (cid) {
        const cartVerification = await cartModel.findById(cid).lean()
        return cartVerification       
    }

    async updateCartAfterPurchase (cid, payload){
        const request = await cartModel.findOneAndReplace({_id: cid}, payload, {new: true, overwrite: true}).lean()
        return request
    }
}