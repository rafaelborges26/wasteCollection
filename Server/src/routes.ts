import knex from './database/connection' //conexao com o banco de dados
import express from 'express'
import PointsController from './controllers/PointsController'
import ItemsControllers from './controllers/itemsController'
import multer from 'multer'
import multerConfig from './config/multer'
import {celebrate, Joi}  from 'celebrate'

const routes = express.Router() //para focar as rotas nesse arquivo
const upload = multer(multerConfig)
const pointsController = new PointsController() //instancia da classe para conseguir chegar nos metodos
const itemsController = new ItemsControllers()


routes.get('/items',itemsController.index) 

routes.post('/points', 
    upload.single('image'),
    celebrate({
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),     
            items: Joi.string().required()
    })
    },
    {abortEarly: false} //para mostrar o erro de todos os campos, não só do primeiro campo
    ),
pointsController.create),

routes.get('/points/:id',pointsController.show)
routes.get('/points/', pointsController.index)
export default routes //estamos exportando as rotas para o arquivouest principal

