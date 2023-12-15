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


const createPurchase = async (req, res) =>{
    try {      
        console.log(req.body);
        

        const{
            userId,
            products,
            shippingPrice,
            subTotalPrice,
            totalPrice,
        } = req.body

        const newPurchase = new purchaseSchema({
            userId,
            products,
            shippingPrice,
            subTotalPrice,
            totalPrice,
        })

        const savedPurchase = await newPurchase.save()
        
        res.status(201).send(savedPurchase)
    } catch (err) {
        res.status(500).send({err})
        console.log(err);
    }
}

export default {
    getAllPurchases,
    getPurchaseById,
    getPurchasesByUserId,
    createPurchase,
}