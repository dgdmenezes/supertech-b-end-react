import UserSchema from '../models/userSchema.js';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';



const login = async (req, res) => {
    UserSchema.findOne({email:req.body.email}, (err, user) =>{
        if(!user){
            return res.status(403).send({
                error:"erro",
                message:"Usuário e / ou senha não encontrados",
                email:`${req.body.email}`,
                statusCode:403
            })
        }
        
        const  validPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!validPassword){
            return res.status(403).send({
                message:"Usuário e / ou senha não encontrados",
                statusCode:401
            })
        }

        const tokenOptions = {
            algorithm: "HS256",
            expiresIn: "10m"
        }
        
        const payload = {
            id:user._id,
            email:user.email,
            role:user.role
        }
        const token = jwt.sign(payload, process.env.SECRET, tokenOptions);
        
            res.status(200).send({
            token:`${token}`
        });

    })
}


export const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET, (err, decodedData) => {
        if (err){
            console.log("não autorizado");
            reject(err);
        } else{

        
        console.log(decodedData)
        return resolve(decodedData);
    }
      });
    });
  }

export default{
    login,
    
}