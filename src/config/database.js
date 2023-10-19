import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

const connect = async () =>{
    try{
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser:true,
            useUnifiedTopology:true,
        });
        console.log("Banco Mongo Conectado");
    } catch (err){
        console.log("Erro", err.message);
    }
    
}

export default{
    connect,
}