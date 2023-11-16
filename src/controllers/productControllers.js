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
                console.log(req.query, products.length);
                
                
            })
        }

        const productFindCount =  (req, res) =>{
            ProductSchema.aggregate([
                    {
                        $match:(
                        {$or:[
                            {
                                category:req.query.category, 
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
 }
