import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    gender: {
      type:String,
      enum:["male", "female", "other"],
      required:true,
    },
    birthDate: {
      type:Date,
      required:true,
    },
    cpf:{
      type:String,
      required:true,
    },
    phoneNumber:{
      type:String,
      required:true,
    },
    addresses:[
      {
      type: String,
      required:false,
      }
    ], 
    purchases:[
      {
      type: String,
      required:false,
      }
    ], 
  },
  { timestamps: true }
);
export default mongoose.model("user", userSchema);
