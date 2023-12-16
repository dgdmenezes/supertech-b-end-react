import paymentSchema from "../models/paymentSchema.js"
import Stripe from "stripe"

const URLFrontEnd = process.env.URL_CLIENT

const stripe = new Stripe(process.env.STRIPE_SECRET)

const PaymentController = async (req, res) => {
    try {
        const {products}  = req.body.products;
       
       const line_itens = products.map((item)=>({
        price_data:{
            currency:"brl",
              product_data:{
                name:item.productID,
                description:item.productDescription,
                images:[`${item.productImage}`]
            },
            unit_amount: Math.round(item.productPrice*100),
          },
            quantity:item.productQt
    }))
    
    
    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items:line_itens,
        mode:"payment",
        success_url:`${URLFrontEnd}/cart/checkout/success`,
        cancel_url:`${URLFrontEnd}/cart/checkout/checkout/error`
    })
    
    res.json({id:session.id})
    } catch (error) {
        console.log(error);
        res.status(400).send({message:error})
    }
    

}

   
export default {
    PaymentController
}