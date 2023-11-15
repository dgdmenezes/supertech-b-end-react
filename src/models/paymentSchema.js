import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema(
    {
        userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true,
},
    checkoutValue:{
        type:Number,
        required:true,
},
    status:{
        type:String,
        enum:["pending", "approved", "refused" ],
        default:"pending",
},
    paymentMethod:{
        type:String,
        enum:["boleto", "creditCard", "pix"],
        required:true,
    }

},
{timestamp:true}
)

export default mongoose.model("payment", paymentSchema)