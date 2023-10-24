import express from "express"
import controllers from "../controllers/productControllers.js"
const  router = express.Router()

router.get("/", controllers.getAllP)
router.get("/:id", controllers.getOne)

export default router;