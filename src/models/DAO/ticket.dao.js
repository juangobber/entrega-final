import ticketModel from "../schemas/ticket.model.js";

export class TicketDao {
    
    async createTicket(payload){
        const createdTicket = await ticketModel.create(payload)
        return createdTicket
    }

    async getTicketById(tid){
        console.log("tid DAO", tid)
        const ticket = await ticketModel.findById(tid).populate('products.productId').lean()
        return ticket
    }
}