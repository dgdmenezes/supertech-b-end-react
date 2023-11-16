import mongoose from "mongoose";
const purchaseSchema = new mongoose.Schema(
{
    id:mongoose.Schema.Types.ObjectId,
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required:true,
    },
    products:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            },
        }
    ],
    totalPrice:{
        type:Number,
        required:true,
    },
}, 
{timestamp: true}
);

export default mongoose.model("purchase", purchaseSchema)