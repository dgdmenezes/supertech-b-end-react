import paymentSchema from "../models/paymentSchema.js"
import Stripe from "stripe"

const URLFrontEnd = process.env.URL_CLIENT

const stripe = new Stripe(process.env.STRIPE_SECRET)

const PaymentController = async (req, res) => {
    try {
        const products  = req.body;
        console.log(products);
   
        const line_Itensx = products.map((item)=>({
        price_data:{
            currency:"brl",
            unit_amount: Math.round(item.productPrice*100),
            product_data:{
                name:item.productID,
                description:item.productDescription,
                images:[`${item.productImage}`]
            },
            quantity:item.productQt
        },
        

    }))
    
    const line_items2 = [{
        price_data: {
          currency: 'brl',
          unit_amount: 2000,
          product_data: {
            name: 'T-shirt',
            description: 'Comfortable cotton t-shirt',
            images: ['https://example.com/t-shirt.png'],
          },
        },
        quantity: 1,
      },
      {
        price_data: {
          currency: 'brl',
          unit_amount: 200,
          product_data: {
            name: 'Casa',
            description: 'Comfortable cotton t-Casa',
            images: ['https://example.com/t-shirt.png'],
          },
        },
        quantity: 2,
      }
    ]


    const session = await stripe.checkout.sessions.create({
        payment_method_types:["pix"],
        line_items:line_items2,
        mode:"payment",
        success_url:"http://localhost:3000/cart/checkout/success",
        cancel_url:"http://localhost:3000/cart/checkout/error"
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