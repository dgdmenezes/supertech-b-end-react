# API do projeto Full Stack para certificação na Tera Treinamentos

##API - no padrão MVC (model-view-controller) - do projeto de ecommerce que tem seu frontEnd em https://github.com/dgdmenezes/supertech-front-end
Conexão com Banco de dados NOSQL MongoDb

#O que nossa API faz? Organizado por rotas
##Usuários (users)
###	Faz um find completo em todos os usuários (retorno de objeto)
###	Faz um findById em um Id específico (retorno de objeto)
###	Retorna o ID do usuário caso receba um token válido
###	Cadastra um usuário
###	Faz login do usuário com parâmetros email e senha (retorno token válido)
###	Atualiza um usuário por ID
###	Apaga um usuário por ID

##Produtos (products)
###	Faz o Count do Total de produtos (retorno em Count) (objetivo de usar no pagination)
###	Faz um find no total produtos (retorno de objeto)
###	Faz um find utilizando os filtros skip e limit no total de produtos (retorno de objeto) 
###	Faz um find utilizando os filtros skip e limit em uma categoria produtos (retorno de objeto)
###	Faz o Count de uma categoria de produtos (retorno Count) (objetivo de usar no pagination do front end)
###	Cadastra produto e insere tags com os dados principais do produto para utilização em sistema de busca

##Endereços (addresses)
###	Faz o find em todos os endereços cadastrados
###	Faz o findById em um endereço específico pelo seu id
###	Cadastra um endereço novo
###	Atualiza um endereço
###	Apaga um endereço

##Pedidos (purchases)
###	Faz o find em todos os pedidos
###	Faz o findById em um pedido específico pelo seu ID
###	Faz o findByUserId em todos os pedidos de um usuário pelo seu id
###	Cadastra um novo pedido (em construção)

##Payment (pagamento) – (em construção)
