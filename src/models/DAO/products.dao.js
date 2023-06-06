
import productsModel from "../schemas/products.model.js"


export class ProductsDao {
    
    async getProducts(filter, options){
        const products = await productsModel.paginate(filter, options)
        return products
    }

    async getProductById(pid){
        const product = await productsModel.findOne({_id: pid}).lean()
        return product
    }

    async addProduct(productPayload){
        console.log("products DAO payload: ", productPayload)
        const product = await productsModel.create(productPayload)
        console.log("product despues de la peticion ", product)
        return product
    }

    async getProductByCode(productCode){
        const product = await productsModel.findOne({code: productCode}).lean()
        return product
    }

    async updateProduct(pid, payload){
        const updatedProduct = await productsModel.findByIdAndUpdate(pid, payload)
        return updatedProduct
    }
    
    async deleteProduct(pid){
        const deletedProduct = await productsModel.findByIdAndRemove(pid)
        return deletedProduct
    }

    async productVerification(pid){
        const productVerification = await productsModel.exists({_id: pid}).lean()
        return productVerification
    }
}