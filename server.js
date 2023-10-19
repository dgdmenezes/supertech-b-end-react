// app já foi instanciado em src/app.js
import app from "./src/app.js"
const PORT = process.env.PORT; //pega o dado do arquivo .env 

//listen(Porta do servidor, função anônima)
app.listen(PORT, () =>{
    console.log(`Servidor rodando na porta ${PORT}`);
})