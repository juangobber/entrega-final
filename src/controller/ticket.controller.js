import { TicketDao } from "../models/DAO/ticket.dao.js";
import ticketModel from "../models/schemas/ticket.model.js";
import { TicketService } from "../services/ticket.service.js";import { HTTP_STATUS, successResponse } from "../utils/api.utils.js";


const ticketService = new TicketService()

export class TicketController {

    static async getTicketById(req, res, next){

        const {tid} = req.params
        try{
            const ticket = await ticketService.getTicketById(tid)
            const response = successResponse(ticket)
            res.status(HTTP_STATUS.CREATED).json(response)

        }catch(error){
            next(error)
        }
    }
}