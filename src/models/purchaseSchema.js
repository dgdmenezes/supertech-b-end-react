import mongoose from "mongoose";
const purchaseSchema = new mongoose.Schema(
{
    id:mongoose.Schema.Types.ObjectId,
    userId: {
        type: String,
        required:true,
    },
    products:[
        {
            productID:{
                type: String,
                required:true,
            },
            productQt:{
                type:Number,
                required:true,
            },
            productPrice:{
                type:Number,
                required:true,
            },
            productDescription:{
                type:String,
                required:true,
            },
            productImage:{
                type:String,
                required:true
            }
        }, 

    ],
    addressForShippingID:{
        type:String,
        required:false,
    },
    tracking:{
        type:String,
        required:false,
    },
    paymentID:{
        type:String,
        required:false,
    },
    paymentMethod:{
        type:String,
        enum:["boleto", "card"],
        required:false,
    },
    paymentStatus:{
        type:String,
        enum:["pendingPayment", "paymentError", "paymentCompleted"], 
        default: "pendingPayment"
    }
    ,
    subTotalPrice:{
        type:Number,
        required:true,
    },
    shippingPrice:{
        type:Number,
        required:true,
    },
    totalPrice:{
        type:Number,
        required:true,
    },
}, 
{timestamp: true}
);

export default mongoose.model("purchase", purchaseSchema)