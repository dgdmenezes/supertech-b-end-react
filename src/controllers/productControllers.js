import productSchema from "../models/productSchema.js"
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

const getIndexHome =  (req, res) =>{ //--> route "/index/index?"
    ProductSchema.aggregate([
        // {$match:{}},
        {$skip:parseInt(req.query.skip)},
        {$limit:parseInt(req.query.limit)},
        
    
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
                {
                    $match:(
                    {$or:[
                        {
                            category:{
                                $regex:req.query.category, 
                                $options:"i",//ignora o case sensitive da busca
                            }
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
                console.log(req.query, products.length)
                
                
            })
        }

        const productFindCount =  (req, res) =>{
            ProductSchema.aggregate([
                    {
                        $match:(
                        {$or:[
                            {
                                category:{
                                    $regex:req.query.category, 
                                    $options:"i",//ignora o case sensitive da busca
                                }
                            },
                            {
                                stock:parseInt(req.query.stock),
                            }
                            ]
                    })},
                    {$count:"counter"}
                            
                ]).exec((err, products) =>{
                    if (err){
                        res.status(500).send({message: err.message})
                    }
                    res.status(200).send(products)
                    console.log(req.query);
                    
                    
                })
            }
        
        const categoryAutomaticList = async (req,res) =>{
            try {
                const result = await productSchema.aggregate([
                    { $group: {_id:"$category", count:{ $sum: 1 } } },
                    { $match: { count: { $gt: 0 } } }
                ])
            
            res.status(200).send(result)
            } catch (error) {
                console.log("Erro ao listar categorias", error);
                res.status(500).send({error:error})
            }
        }
            
        const searchBarProductFind =  (req, res) =>{
            ProductSchema.aggregate([
                        {
                            $match:(
                                {
                                tags:{
                                        $regex:req.query.tags,
                                        $options:"i",
                                    }   
                                }
                            
                        )},
                        {$limit:parseInt(req.query.limit)},
                        {$skip:parseInt(req.query.skip)},
                        
                        
                                
                    ]).exec((err, products) =>{
                        if (err){
                            res.status(500).send({message: err.message})
                            
                        }
                        res.status(200).send(products)
                        console.log(req.query, products.length, req.query.tags);
                        
                        
                    })
            }
    
    const searchBarProductFindCount = (req, res) =>{
        ProductSchema.aggregate([
            {
                $match:(
                    {
                    tags:{
                            $regex:req.query.tags,
                            $options:"i",
                        }   
                    }
                
            )},
            {$count:"counter"},                       
            
                    
        ]).exec((err, products) =>{
            if (err){
                res.status(500).send({message: err.message})
            }
            res.status(200).send(products)
            console.log(req.query, products.length);
            
            
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
            brand,
            model,
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
            brand,
            model,
            specs,
            tags:[req.body.category, req.body.brand, req.body.model], 
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
    productFindCount,
    searchBarProductFind,
    searchBarProductFindCount,
    categoryAutomaticList,
 }
