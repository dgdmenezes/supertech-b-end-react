//este arquivo armazena as informações e importações principais da API
import express from "express";
const app = express();

//configuração do CORS
import cors from "cors";
app.use(cors());

//configura a leitura de json
app.use(express.json())

//define a rota principal da API
import db from "./config/database.js"
db.connect()

//define rota principal da api
import productsRoutes from "./routes/productRoutes.js"
app.use("/products", productsRoutes)

export default app;
