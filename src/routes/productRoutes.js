import express from "express"
import controllers from "../controllers/productControllers.js"
const  router = express.Router()

router.get("/count", controllers.getCountProducts)
router.get("/", controllers.getAllP)
router.get("/:id", controllers.getOne)
router.get("/index/:skip/:limit/", controllers.getIndexHome)


export default router;