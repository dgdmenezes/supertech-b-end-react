import express from "express";
import controllers from "../controllers/purchaseControllers.js"
const router = express.Router()
//purchase/endpoint
router.get("/", controllers.getAllPurchases)
router.get("/:id", controllers.getPurchaseById)
router.get("/userId/:id", controllers.getPurchasesByUserId)
router.post("/", controllers.createPurchase)
router.post("/payment", controllers.stripePayment)
router.get("/statusPayment/:id", controllers.stripePaymentStatus)


export default router