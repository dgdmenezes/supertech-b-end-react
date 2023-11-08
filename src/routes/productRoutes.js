import express from "express"
import controllers from "../controllers/productControllers.js"
const  router = express.Router()



router.get("/count", controllers.getCountProducts)
router.get("/find/:category?", controllers.productFind)
router.get("/index/index?", controllers.getIndexHome)
router.get("/teste2/teste", controllers.testController2)
router.post("/create", controllers.createProdutct)
router.get("/:id", controllers.getOne)
router.get("/", controllers.getAllP)

export default router;