import productSchema from "../models/productSchema.js"

const getAll = async (req, res) =>{
    const products = await productSchema.find()
        if (!products) {
            res.status(500).send({
                statusCode:500,
                message: err.message,
            });
        }
        res.status(200).send(products)
    }

export default {
    getAll,
}
