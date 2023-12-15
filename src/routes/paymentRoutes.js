import express from "express";
import controllers from "../controllers/paymentControllers.js"
const router = express.Router()

router.post("/", controllers.PaymentController)


export default router