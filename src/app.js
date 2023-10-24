import express from "express";
const app = express();

import cors from "cors";
app.use(cors());

app.use(express.json());

import db from "./config/database.js";
db.connect();

import routes from "./routes/userRoutes.js" //define rota principal da minha api
app.use("/users", routes)

import productRoutes from "./routes/productRoutes.js"
app.use("/products", productRoutes)

export default app;
