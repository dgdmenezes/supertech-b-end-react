import addressSchema from "../models/addressSchema.js";

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
        referencePoint,
        neighborhood,
        city,
        state,
        userId,
    })

    const newAddress = await nAddress.save();
    res.status(201).json(newAddress)
    } catch(err){
        console.log("erro ao criar o esquema do endereço", err);
        res.status(500).json({error:"Erro ao criar o esquema do endereço: ", err})
    }
}

const updateAddress = async (req, res) =>{
    try{
        const updatedAddress = await addressSchema.findByIdAndUpdate(req.params.id, req.body, {new:true});

    if(!updatedAddress){
        return res.status(404).json({message:"404 - Not founded"})
    }
        res.json({message:"endereço atualizado com sucesso", updatedAddress});
    }catch(err){
        console.log(err);
        res.status(500).json({messsage: "500 - erro interno do servidor"})
    }
}
const deleteAddress = async (req,res) =>{
    try {
        const deletedAddress = await addressSchema.findByIdAndDelete(req.params.id)

        if(!deletedAddress){
            return res.status(404).json({message:"404 - not founded"})
        }

        res.status(200).json({message: "Endereço excluído", deletedAddress})

        
    } catch (err) {
        console.log(err);
        res.status(500).json({message:"500 - Internal server error - Erro interno do servidor"})
    }
    
    
}

export default {
    getAllAddress,
    getAddressById,
    postAddress,
    updateAddress,
    deleteAddress,
};


