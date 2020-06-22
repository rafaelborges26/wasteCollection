import knex from './database/connection' //conexao com o banco de dados
import express from 'express'
import PointsController from './controllers/PointsController'
import ItemsControllers from './controllers/itemsController'

const routes = express.Router() //para focar as rotas nesse arquivo
const pointsController = new PointsController() //instancia da classe para conseguir chegar nos metodos
const itemsController = new ItemsControllers()


routes.get('/items',itemsController.index) 

routes.post('/points',pointsController.create)
routes.get('/points/:id',pointsController.show)
routes.get('/points/',pointsController.index)
export default routes //estamos exportando as rotas para o arquivouest principal

