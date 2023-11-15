import express from "express";
import controllers from "../controllers/purchaseControllers.js"
const router = express.Router()

router.get("/", controllers.getAllPurchases)
router.get("/:id", controllers.getPurchaseById)
router.get("/userId/:id", controllers.getPurchasesByUserId)
router.post("/", controllers.createPurchase)


export default router