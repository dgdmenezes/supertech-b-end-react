import ProductSchema from "../models/productSchema.js"

const getAllP =  (req, res) =>{
    ProductSchema.aggregate([
        {$match:{}},
    
    ]).exec((err, products) =>{
        if (err){
            res.status(500).send({message: err.message})
        }
        res.status(200).send(products)
    })
}
const getCountProducts = (req,res) =>{
    ProductSchema.aggregate([
        {$count:"productsCount"}
    ]).exec((err, counter)=>{
        if(err){
            res.status(500).send({message:err.message})
        }
        res.status(200).send(counter)
    })
}

const getIndexHome =  (req, res) =>{
    ProductSchema.aggregate([
        {$skip:parseInt(req.params.skip)},
        {$limit:parseInt(req.params.limit)},
        
    
    ]).exec((err, products) =>{
        if (err){
            res.status(500).send({message: err.message})
        }
        res.status(200).send(products)
        
    })
       
    }

    const getOne =  (req, res) =>{
        ProductSchema.findById(req.params.id, (err,products) =>{
            if (err){
                res.status(500).send({message: err.message})
            }
            res.status(200).send(products)
        })
           
        }

 /*   const getAll =  (req, res) => {
        UserSchema.find((err,users) =>{
          if(err){
            res.status(500).send({message: err.message})
          }
          res.status(200).send(users)
          
          })     
      };
*/
export default {
    getAllP,
    getOne,
    getIndexHome,
    getCountProducts
}
