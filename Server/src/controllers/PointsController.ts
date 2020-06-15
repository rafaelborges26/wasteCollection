import { Request, Response } from 'express'
import knex from '../database/connection'

class PointsController {
    //methods
    async create(request: Request, response: Response) {
        const {
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
            item //para relacionamento ex: [1,2,4]
        } = request.body
    
        const trx = await knex.transaction() //para caso der erro nos inserts ele n executa, colocar a variavel no lugar do knex para usar
    
        const insertedIds = await trx('points').insert({ //peguei via requisicao e insiro no bd
            image: 'image-fake',
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf,
        })
    
        const point_id = insertedIds[0]
    
        const point_items = item.map((item_id: Number) => {
            return {
              point_id, //id eh a posição 0
              item_id,
            }
        })
    
        await trx('point_items').insert(point_items); //inserindo na tabela de relacionamento
    
        return response.json({success: true})
    }

    async show(request: Request, response: Response) {
        const  { id } = request.params

        const point = await knex('points').select('*').where('id',id).first()
        
        if(!point) {
            return response.status(400).json({message: "Point not found"})
        }

        const items = await knex('items').select('*')
        .join('point_items', 'items.id', '=',  'point_items.item_id')
        .where('point_items.point_id', id)
        .select('items.title')//somente esse camos
        response.json({point, items})
    }

    async index(request: Request, response: Response) {

        const {city, uf, items} = request.query //filtrando caso exista

        // const parseId = items.s

        response.json({message: "ok"})
        console.log(city, uf, items)

    }

}

export default PointsController  