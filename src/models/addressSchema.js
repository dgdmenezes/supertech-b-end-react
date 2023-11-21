import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
    {
        id: mongoose.Schema.Types.ObjectId,
        nameAddress:{
            type:String,
            required:true,
        },
        cep:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
        number:{
            type:String,
            required:true,
        },
        referencePoint:{
            type:String,
            required:false,
        },
        complement:{
            type:String,
            required:false
        },        
        neighborhood:{
            type:String,
            required:true,
        },
        city:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        userId:{
            type:String,
            required:true,
        }
    },
    {timestamps:true}
);

export default mongoose.model("address", addressSchema)
