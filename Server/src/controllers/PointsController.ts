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
            items //para relacionamento ex: [1,2,4]
        } = request.body
    
        const trx = await knex.transaction() //para caso der erro nos inserts ele n executa, colocar a variavel no lugar do knex para usar
    
        const point = {
            image: request.file.filename,
            name,
            email,
            whatsapp,
            latitude,
            longitude,
            city,
            uf
        }

        const insertedIds = await trx('points').insert(point)
    
        const point_id = insertedIds[0]
    
        const point_items = items
        .split(',') 
        .map((item: string) => Number(item.trim()))
        .map((item_id: Number) => {
            return {
              point_id, //id eh a posição 0
              item_id,
            }
        })
    
        await trx('point_items').insert(point_items); //inserindo na tabela de relacionamento

        await trx.commit()
    
        return response.json({point})
    }

    async show(request: Request, response: Response) {
        const  { id } = request.params

        const point = await knex('points').select('*').where('id',id).first()
        
        if(!point) {
            return response.status(400).json({message: "Point not found"})
        }

        const serializedPoint = {
                ...point,
                image_url:`http://192.168.0.27:3333/uploads/${point.image}`,
            } 
         

        const items = await knex('items').select('*')
        .join('point_items', 'items.id', '=',  'point_items.item_id')
        .where('point_items.point_id', id) //todos items desse point
        .select('items.title')//somente esse camos

        response.json({point: serializedPoint, items})
    }

    async index(request: Request, response: Response) {

        const {city, uf, items} = request.query //filtrando caso exista

        const parsedItems = String(items)//array aq
        .split(',')
        .map(items => Number(items.trim()))

        //get items
        
        const points = await knex('points')
        .join('point_items', 'points.id', '=', 'point_items.point_id') 
        .whereIn('point_items.item_id',parsedItems)
        .where('city', String(city))
        .where('uf', String(uf))
        .distinct()
        .select('points.*')
        
        const serializedPoints = points.map(point => {
            return {
                ...point,
                image_url:`http://192.168.0.27:3333/uploads/${point.image}`,
            } 
        }) 
        return response.json(serializedPoints)
    }

    

}

export default PointsController  