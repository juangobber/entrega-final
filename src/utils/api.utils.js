import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import ENV from '../config/env.config.js'


export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUESTED: 400,
    NOT_FOUND: 404,
    SERVER_ERROR: 500
}

export const successResponse = (payload) => {
    return {
        success: true,
        payload
    }
}

export const errorResponse = (description, error = null ) => {
    return {
        success: false,
        description,
        details: error
    }
}

export class httpError {
    constructor (description, status = 500, details = null) {
        this.description = description;
        this.statusNumber = status;
        this.details = details;
    }

}

export const hashPassword = (password) =>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10))
   } 
   
export const isValidPassword = (userDB, password) => bcrypt.compareSync(password, userDB.password)

export const generateToken = (user) => {
    const token = jwt.sign({ user }, ENV.SESION_SECRET, {expiresIn: '24h'})
    return token;
}



