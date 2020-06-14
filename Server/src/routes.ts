import express from 'express'

const routes = express.Router() //para focar as rotas nesse arquivo

routes.get('/',(request, response) => { //recebe a rota e a função, ou seja o q ira acontecer quando o usuario utilizar essa rota
    
    return response.json({message: "Hello word"})
});

export default routes //estamos exportando as rotas para o arquivo principal

