import express from "express";
import controllers from "../controllers/addressController.js"
const router = express.Router()

router.get("/", controllers.getAllAddress)
router.get("/:id", controllers.getAddressById)
router.post("/create", controllers.postAddress)
router.put("/update/:id", controllers.updateAddress)
router.delete("/delete/:id", controllers.deleteAddress)

export default router;

