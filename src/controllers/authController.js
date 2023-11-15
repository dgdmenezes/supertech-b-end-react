import userSchema from '../models/userSchema.js';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';


const login = (req, res) => {
    
    
    
    userSchema.findOne({email:req.body.email}, (err, user) =>{
        if(!user){
            return res.status(401).send({
                message:"Usuário e / ou senha não encontradosF1",
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
                message:"Usuário e / ou senha não encontradosF2",
                statusCode:401
            })
        }

        const tokenOptions = {
            algorithm: "HS256",
            expiresIn: "15m"
        }

        const token = jwt.sign({name: user.name}, process.env.SECRET, tokenOptions);

        res.status(200).send({
            message:"Login autorizado",
            token:`${token}`
        });

    })
}
/*try {
    UserSchema.findOne({email:req.body.email}, (err, user) =>{
      
        
        const token = jwt.sign({name: user.name}, SECRET);

        res.status(200).send({
            message:"Login autorizado",
            token,
        });

    }) 
} catch (e) {
 console.log(e);   
}
};
*/

export default{
    login,
}