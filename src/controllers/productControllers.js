import ProductSchema from "../models/productSchema.js"

const getAllP =  (req, res) =>{
    ProductSchema.aggregate([
        {$match:{},},
       
    
    ]).exec((err, products) =>{
        if (err){
            res.status(500).send({message: err.message})
        }
        res.status(200).send(products)
        console.log(products.length);
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
        console.log(products.length);
        
    })
       
    }

    const productFind =  (req, res) =>{
        ProductSchema.aggregate([
            {$match:
                {category:req.params.category},
                
        },
                    
        ]).exec((err, products) =>{
            if (err){
                res.status(500).send({message: err.message})
            }
            res.status(200).send(products)
            console.log(products.length);
            
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
    
    const testController2 = (req, res) => {
        console.log(req.query)
        ProductSchema.aggregate([
            {
                $match:(
                {$and:[
                    {
                        category:req.query.category, 
                    },
                    {
                        stock:parseInt(req.query.stock),
                    }
                    ]
            })},
            {$limit:parseInt(req.query.limit)},
            {$skip:parseInt(req.query.skip)}
                    
        ]).exec((err, products) =>{
            if (err){
                res.status(500).send({message: err.message})
            }
            res.status(200).send(products)
            console.log(req.query);
            
            
        })
        
        /*return res.json({
           message:"Hello World",
           name:req.query.name,
           age:req.query.age,
           city:req.query.city,
           country:req.query.country
        })*/
        
}
        
    

    const createProdutct = async (req, res) =>{
        try {
        const{
            name,
            description,
            price,
            category,
            stock,
            image,
            image2,
            image3,
            image4,
            specs
        } = req.body;
        

        const product = new ProductSchema({
            name,
            description,
            price,
            category,
            stock,
            image,
            image2,
            image3,
            image4,
            specs
        })

        const newProduct = await product.save();
        res.json(newProduct);
    } catch(err){
        console.log(`Erro ao criar produto detalhes: ${err}`);
        res.status(500).json({error:"Erro de esquema ao criar produto"})
    }
}
        
        

 export default {
    getAllP,
    getOne,
    getIndexHome,
    getCountProducts,
    createProdutct,
    productFind,
    testController2,
}
