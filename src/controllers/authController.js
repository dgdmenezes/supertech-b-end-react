import UserSchema from '../models/userSchema.js';
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';

const login = (req, res) => {
try {
    UserSchema.findOne({email:req.body.email}, (err, user) =>{
        if (!user){
            return res.staus(401).send({
                message:"Usuario não encontrado",
                email: `&{req.body.email}`,
            });
        }

        const  validPassword = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if(!validPassword){
            return res.staus(401).send({
                message: "Login não autorizado"
            });
        }

        const token = jwt.sign({name: user.name}, SECRET);

        res.status(200).send({
            message:"Login autorizado",
            token,
        });

    }) 
} catch (err) {
 console.log(err);   
}
};

export default{
    login,
}