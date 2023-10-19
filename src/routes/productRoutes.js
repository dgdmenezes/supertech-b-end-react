import express from "express"
import controllers from "../controllers/productControllers.js"
const  router = express.Router()

router.get("/", controllers.getAll)

export default router;