import { Router } from "express";
import { TicketController } from "../controller/ticket.controller.js";

const router = Router()

router.get('/:tid', TicketController.getTicketById)

export default router