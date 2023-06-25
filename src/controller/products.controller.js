import { ProductsService } from "../services/products.service.js"
import { HTTP_STATUS, successResponse } from "../utils/api.utils.js"

const productsService = new ProductsService()

export class ProductsController {
   static async getProducts(req, res, next){
        
        try {
            const products = await  productsService.getProducts(req.query)
            const response = successResponse(products)
            res.status(HTTP_STATUS.OK).json(response)
        } 
        catch (error) {
            next(error)
        }    
    }
    
    static async getProductById(req, res, next) {
        const {pid} = req.params

        try { 
            const product = await productsService.getProductById(pid)
            const response = successResponse(product)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async addProduct(req, res, next){
        const productPayload = req.body
        const userPayload = req.session.user
        console.log("Products controller payload", productPayload)
        try {
        const newCreatedProduct = await productsService.addProduct(productPayload, userPayload)
        const response = successResponse(newCreatedProduct)
        res.status(HTTP_STATUS.CREATED).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async updateProduct(req, res, next) {
        const productPayload = req.body
        const {pid} = req.params

        try {
            const updatedProduct = await productsService.updateProduct(pid, productPayload)
            const response = successResponse(updatedProduct)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }

    static async deleteProduct(req, res, next) {
        const {pid} = req.params

        try{
            const deletedProduct = await productsService.deleteProduct(pid)
            const response = successResponse(deletedProduct)
            res.status(HTTP_STATUS.OK).json(response)
        }
        catch(error){
            next(error)
        }
    }
}