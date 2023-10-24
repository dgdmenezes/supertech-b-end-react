import ProductSchema from "../models/productSchema.js"

const getAllP =  (req, res) =>{
    ProductSchema.find((err, products) =>{
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
}
