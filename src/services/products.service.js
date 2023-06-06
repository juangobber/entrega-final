import { ProductsDao } from "../models/DAO/products.dao.js"
import productsModel from "../models/schemas/products.model.js"
import { HTTP_STATUS, httpError } from "../utils/api.utils.js"
import { logError } from "../utils/console.utils.js"

const productsDao = new ProductsDao()

export class ProductsService {
    async getProducts({page, limit, sort, query}){

        const filter =  query ? {category: query} : {}

        const options = {
            sort: (sort ? {price: sort} : {}),
            limit: limit ?? 10,
            page: page ?? 1,
            lean: true
        }

        const products = await productsDao.getProducts(filter, options)
        return products
    }

    async getProductById(pid){
       const product = await productsDao.getProductById(pid)
       return product
    }

    async addProduct(payload){
        console.log("Payload en product Service: ", payload)
        const {title, description, price, thumbnail, code, stock, status, category} = payload

        if(title ==""|| description ==""|| price=="" || code=="" || category=="" ) {
            console.log("Missing fields")
            throw new httpError("missing required fields", HTTP_STATUS.BAD_REQUESTED);
        }

        const existingCodeValidator = await productsDao.getProductByCode(+code)

        if(existingCodeValidator) {
            console.log("A product exists with that code")
            throw new httpError("A product with that code already exists", HTTP_STATUS.BAD_REQUESTED, existingCodeValidator)
        }

        const productPayload = {
            title: title,
            description: description,
            price: parseInt(price),
            thumbnail: "[]",
            code: parseInt(code),
            stock: parseInt(stock) ?? 10,
            status: true,
            category: category
        }
        console.log("productPayload en product Service: ", productPayload)
        const addedProduct = await productsDao.addProduct(productPayload)
        console.log("Added product: ", addedProduct)
        return addedProduct
    }

    async updateProduct(pid, payload){
        if (Object.keys(payload).length === 0 ) {
            throw new httpError("There are no fields to update", HTTP_STATUS.BAD_REQUESTED)
        }
        const updatedProduct = await productsDao.updateProduct(pid, payload)
        return updatedProduct

    }

    async deleteProduct(pid){
        const deletedProduct = await productsDao.deleteProduct(pid)
        return deletedProduct
    }
}