import purchaseSchema from "../models/purchaseSchema.js";
import userSchema from "../models/userSchema.js"

import Stripe from "stripe"

const URLFrontEnd = process.env.URL_CLIENT
const stripe = new Stripe(process.env.STRIPE_SECRET)

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
        
        const updateUser = await userSchema.findByIdAndUpdate(savedPurchase.userId, {$push: {purchases:savedPurchase._id}}, {new:true}).exec()
        
        res.status(201).send({
            purchase:savedPurchase,
            updatedUser:updateUser
        })
    } catch (err) {
        res.status(500).send({err})
        console.log(err);
    }
}

const stripePayment = async (req, res) => {
    try {
        
        const {products}  = req.body.products;
       
       const line_itens = products.map((item)=>({
        price_data:{
            currency:"brl",
              product_data:{
                name:item.productDescription,
                description:item.productDescription,
                images:[`${item.productImage}`]
            },
            unit_amount: Math.round(item.productPrice*100),
          },
            quantity:item.productQt
    }))

    const billingAddress = {
        line1:req.body.address.address.address,
        line2:`num:${req.body.address.address.number} bairro ${req.body.address.address.neighborhood}`,
        city:req.body.address.address.city,
        postal_code:req.body.address.address.cep,
        state:req.body.address.address.state,
        country:req.body.addressCountry,         
    }

    
    const customer = await stripe.customers.create({
        email: req.body.customerEmail,
        name: req.body.customerName,
        address:billingAddress,
        
    });

    const taxId = await stripe.customers.createTaxId(
        customer.id,
        {
          type: 'br_cpf',
          value: req.body.customerCPF,
        }
      ); 
      console.log(taxId);

    const session = await stripe.checkout.sessions.create({
        payment_method_types:[req.body.paymentMethod],
        payment_method_options:{
            boleto:{
                expires_after_days: 3,
            }
        },
        line_items:line_itens,
        customer:customer.id,
        mode:"payment",
        success_url:`${URLFrontEnd}/cart/checkout/success`,
        cancel_url:`${URLFrontEnd}/cart/checkout/error`
    })
    
    
    const updatePurchase = await purchaseSchema.findByIdAndUpdate(
        req.body.products._id, 
        {$set:{paymentID:session.id}},
        {new:true}
        );
    
    if (!updatePurchase) {
    
      console.error("erro ao atualizar o Payment Id");
      res.status(500).send({message:"erro interno ao processa pagamento"})
      return;
    }
    
    console.log(session);
    res.json({id:session.id})
    } catch (error) {
        console.log(error);
        res.status(400).send({message:error})
    }
    

}

const stripePaymentStatus = async (req, res) => {
    const {session_id} = req.params.id

    try {
        //const session = await stripe.checkout.sessions(session_id)

        //const paymentIntentID = session.payment_intent;
        const paymentIntent = await stripe.paymentIntents.retrieve("pi_3ONmJZF1ZbHJSdCY190ZeBA4")
        
        const paymentStatus = paymentIntent.status;
        res.status(200).send({status:paymentStatus})

    } catch (error) {
        console.log("Erro ", error)
        res.status(500).send({
            error:"Erro no status do pedido",
            message:error
        })
    }
}

export default {
    getAllPurchases,
    getPurchaseById,
    getPurchasesByUserId,
    createPurchase,
    stripePayment,
    stripePaymentStatus,
}