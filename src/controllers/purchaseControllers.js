//import purchaseSchema from "../models/purchaseSchema.js";

const getAllPurchases = (req, res) =>{
    res.status(200).send({
        message:" todos os pedidos do e-commerce"
    })
}
const getPurchaseById = (req, res) =>{

    res.status(200).send({
        message:" pedido específico por Id do pedido",
        idPassado:`${req.params.id}`
    })

}

const getPurchasesByUserId = (req, res) =>{
    res.status(200).send({
        message:"lista todos os pedidos de um usuário",
        idPassado:`${req.params.id}`
    })
}


const createPurchase = (req, res) =>{
    const corpo = req.body
    console.log(corpo);
    res.status(201).send({
        message:"cria um pedido",
        objetoJson:corpo
    })
}

export default {
    getAllPurchases,
    getPurchaseById,
    getPurchasesByUserId,
    createPurchase,
}