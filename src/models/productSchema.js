import mongoose from "mongoose";

// Definindo o esquema (schema) do produto de tecnologia
const productSchema = new mongoose.Schema(
    {
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
    },
    
    image: {
        type: String,
        required:true,
    },
    image2: {
        type: String,
        required:false,
    },
    image3: {
        type: String,
        required:false,
    },
    image4: {
        type: String,
        required:false,
    },
    tags: [
        {
        type: String,
        required:false,
        }
        ],
    brand: String,
    model: String,
    reviews: [
        {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario', // Referência ao modelo de usuário, se desejar rastrear quem fez a avaliação.
        },
        texto: String,
        rating: Number,
        },
    ],
    specs: [
        {
        processador: String,
        memoriaRAM: String,
        armazenamento: String,
        sistemaOperacional: String,
        tamanhoTela: String,
        resolucaoTela: String,
        conectividade: String,
        genero: String,
        classificacao: String,
        idiomas:String,
        itensInclusos:String
    }
       ]   ,
},
{timestamp: true},
);

// Criando o modelo de Produto de Tecnologia usando o esquema definido
export default mongoose.model("product", productSchema);
