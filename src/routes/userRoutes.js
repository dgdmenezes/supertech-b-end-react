import express from "express";
const router = express.Router();

import controllers from "../controllers/userController.js"
import authController from "../controllers/authController.js";

router.get("/", controllers.getAll) // o "/" é o end point da rota
router.get("/:id", controllers.getUser) // o "/" é o end point da rota
router.post("/", controllers.createUser)
router.post("/", authController.login)
router.patch("/:id", controllers.updateUser)
router.delete("/:id", controllers.deleteUser)

export default router;
