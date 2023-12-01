import addressSchema from "../models/addressSchema.js";
import userSchema from "../models/userSchema.js"

const getAllAddress = (req, res) =>{
    addressSchema.find((err, address) =>{
        if(err){
            res.status(500).send({message:err.message})
        }
        res.status(200).send(address)
    })
};

const getAddressById = (req, res) =>{
    const findAddress = addressSchema.findById(req.params.id, (err, address)=>{
        if(err){
            res.status(500).send({message:err.message})
        }
        else{
            res.status(200).send(address)
        }
    })    
};

const postAddress = async (req, res) =>{
    try {
        const{
            nameAddress,
            cep,
            address,  
            number,
            complement,
            referencePoint,
            neighborhood,
            city,
            state,
            userId,
        } = req.body;
    

    const nAddress = new addressSchema({
        nameAddress,
        cep,
        address,  
        number,
        complement,
        referencePoint,
        neighborhood,
        city,
        state,
        userId,
    })

    const newAddress = await nAddress.save();
    
    const addressId = newAddress._id
    const addressUserId = newAddress.userId
//até aqui tá sussa
    const updateUser = await userSchema.findByIdAndUpdate(addressUserId, {$push: {addresses:addressId}}, {new:true}).exec()
    
    res.status(201).send({
        address:newAddress,
        user: `${addressUserId} atualizado`}
        );
    } catch(error){
        res.status(401).send({error:error.message});
    }
    

}

const updateAddress = async (req, res) =>{
    try{
        const updatedAddress = await addressSchema.findByIdAndUpdate(req.params.id, req.body, {new:true});

    if(!updatedAddress){
        return res.status(404).send({message:"404 - Not founded"})
    }
        res.json({message:"endereço atualizado com sucesso", updatedAddress});
    }catch(err){
        console.log(err);
        res.status(500).send({messsage: "500 - erro interno do servidor"})
    }
}
const deleteAddress = async (req,res) =>{
    try {
        const addressId = req.params.id
        const deletedAddress = await addressSchema.findByIdAndDelete(addressId)
        
        if(deletedAddress){
            const userId = deletedAddress.userId
            await userSchema.findByIdAndUpdate(userId, {$pull: {addresses:addressId}}, {new:true}).exec()

            res.status(200).send(
                {
                    deletedAddress,
                    message:`User ${userId} atualizado com exclusão do registro address ${addressId}`                    
                })
        }else{
            res.status(404).send({message:"404- Not found - Endereço não encontrado"})
        }

    }catch(error){
        res.status(500).send({message:"Internal Error, erro interno"})
    }
}

export default {
    getAllAddress,
    getAddressById,
    postAddress,
    updateAddress,
    deleteAddress,
};


