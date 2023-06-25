import ENV from "../config/env.config.js"
import { ProductsDao } from "../models/DAO/products.dao.js"
import { HTTP_STATUS, httpError } from "../utils/api.utils.js"
import nodemailer from 'nodemailer'

const productsDao = new ProductsDao()

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: true,
    port: 465,
    auth: {
        user: ENV.MAIL,
        pass: ENV.GMAIL_PASS
    }
})

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

    async addProduct(payload, userPayload){
        const {admin, premium, email} = userPayload
        const {title, description, price, thumbnail, code, stock, status, category} = payload

        if(title ==""|| description ==""|| price=="" || code=="" || category=="" ) {
            throw new httpError("missing required fields", HTTP_STATUS.BAD_REQUESTED);
        }

        const existingCodeValidator = await productsDao.getProductByCode(+code)

        if(existingCodeValidator) {
            throw new httpError("A product with that code already exists", HTTP_STATUS.BAD_REQUESTED, existingCodeValidator)
        }
        
        let settingOwnerData 
        if (premium) {
            settingOwnerData = email
        } else if (admin) {
            settingOwnerData = "admin"
        }

        const productPayload = {
            title: title,
            description: description,
            price: parseInt(price),
            thumbnail: "[]",
            code: parseInt(code),
            stock: parseInt(stock) ?? 10,
            status: true,
            owner: settingOwnerData,
            category: category
        }
        const addedProduct = await productsDao.addProduct(productPayload)
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
        if (deletedProduct.owner != "admin"){
            const mailParams = {
                from: `Coder Test ${ENV.MAIL}`,
                to: `${deletedProduct.owner}`,
                subject: 'Test removed product',
                html: `<h1>Hi ${deletedProduct.owner}! Your product ${deletedProduct.title} has been removed by the admin!</h1>`
            }
            const mail = await transporter.sendMail(mailParams)
        }
        return deletedProduct
    }
}