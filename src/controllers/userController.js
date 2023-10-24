import UserSchema from "../models/userSchema.js";
import bcrypt from "bcrypt"

const getAll =  (req, res) => {
  UserSchema.find((err,users) =>{
    if(err){
      res.status(500).send({message: err.message})
    }
    res.status(200).send(users)
    
    })     
};

const getUser =  (req, res) =>{
  
  const findUser =  UserSchema.findById(req.params.id, (err, user) =>{
    if (err){
      res.status(500).send({message:err.message});
    }
    else{
      res.status(200).send(user)
    }
  } )
  

  }

const createUser = async(req, res) =>{

const hashedPassword = bcrypt.hashSync(req.body.password, 10) //10 é salt
req.body.password = hashedPassword;

try{

const newUser = UserSchema(req.body);

const savedUser = await newUser.save()

res.status(201).send({
  message:"usuário cadastrado com sucesso",
  statusCode: 201,
  data: savedUser,
});
}catch(err){
  console.log("erro em"+ err);
}
}

const updateUser = async (req, res) =>{
  try {
 const updatedUser = await UserSchema.findByIdAndUpdate(req.params.id, req.body) //fBIAU metodo do mongoose ver documentação.
 
 res.status(200).send({
  message: "usuario atualizado com sucesso",
  statusCode:200,
  data: updatedUser,
})

} catch (err) {
    res.status(500).send({message:err.message});
    console.log("erro em:"+err);
  }
}

const deleteUser = async (req,res) =>{
  try {
    await UserSchema.findByIdAndDelete(req.params.id)

    res.status(200).send({
      message: "usuario deletado com sucesso",
      statusCode:200,
    })
  } catch (err) {
    console.log(err);
  }
}



export default {
  getAll,
  getUser,
  createUser,
  updateUser,
  deleteUser
};