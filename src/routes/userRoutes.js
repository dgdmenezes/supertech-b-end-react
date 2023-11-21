import express from "express";
import controllers from "../controllers/userController.js"
import authController from "../controllers/authController.js";
const router = express.Router();

router.get("/", controllers.getAll) // o "/" é o end point da rota
router.get("/token", controllers.getIdByToken) // o "/" é o end point da rota
router.get("/:id", controllers.getUser) // o "/" é o end point da rota
router.post("/", controllers.createUser)
router.post("/login", authController.login)
router.patch("/:id", controllers.updateUser)
router.delete("/:id", controllers.deleteUser)

export default router;
