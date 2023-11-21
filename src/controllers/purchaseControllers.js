import purchaseSchema from "../models/purchaseSchema.js";

const getAllPurchases = (req, res) => {
    purchaseSchema.find((err, purchases) =>{
        if(err){
            res.status(500).send({message:err.message})
        }else{
            res.status(200).send(purchases)
        }

    })
}

const getPurchaseById = (req, res) =>{

   const findPurchase = purchaseSchema.findById(req.params.id, (err, purchase) => {
    if (err){
        res.status(404).send({message:err.message})
        
    } else{
        res.status(200).send(purchase)
        console.log(req.params.id);
    }
   })

}

const getPurchasesByUserId = (req, res) =>{
    purchaseSchema.aggregate([
        {$match:{userId:req.params.id}}
    ]).exec((err, purchases) =>{
        if (err){
            res.status(404).send({message:err.message})
        }else{
            res.status(200).send(purchases)
        }
    })
}


const createPurchase = (req, res) =>{
    try {
        const{
            userId,
            

        } = req.body
    } catch (error) {
        
    }
}

export default {
    getAllPurchases,
    getPurchaseById,
    getPurchasesByUserId,
    createPurchase,
}