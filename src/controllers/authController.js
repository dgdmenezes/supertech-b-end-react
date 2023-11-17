import UserSchema from '../models/userSchema.js';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';


const login = async (req, res) => {
    UserSchema.findOne({email:req.body.email}, (err, user) =>{
        if(!user){
            return res.status(401).send({
                message:"Usuário e / ou senha não encontrados",
                email:`${req.body.email}`,
                statusCode:401
            })
        }
        
        const  validPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );
        if (!validPassword){
            return res.status(401).send({
                message:"Usuário e / ou senha não encontrados",
                statusCode:401
            })
        }

        const tokenOptions = {
            algorithm: "HS256",
            expiresIn: "15m"
        }
        
        const payload = {
            id:user._id,
            name:user.name,
            email:user.email,
            cpf:user.cpf
        }
        const token = jwt.sign(payload, process.env.SECRET, tokenOptions);
        
            res.status(200).send({
            token:`${token}`
        });

    })
}

// export const verifyToken = (token) =>{
//     return async (req, res) => {
//     jwt.verify(token, process.env.SECRET, (err, decoded) =>{
//         if(err){
//             console.log("Token inválido", err);
//             res.status(401).send({
//                 message:"Token inválido. Acesso negado",
//                 err
//             })
//         }else{
//             console.log("Token Valido. Decodificado", decoded);
//             res.status(200).send({
//                 message:"Token Válido. Decodificado",
//                 decoded
                
//             })
//         }
//     })
// }
// }

export const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.SECRET, (err, decodedData) => {
        if (err){
            console.log("erro:",err);
            return reject(err);
        } 
        console.log(decodedData)
        return resolve(decodedData);
        
      });
    });
  }

export default{
    login,
    verifyToken,
}