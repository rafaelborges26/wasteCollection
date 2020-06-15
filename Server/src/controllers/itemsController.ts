import knex from '../database/connection'
import {Request,Response} from 'express'
class ItemsController {
    async show(request: Request,response: Response){
        const items = await knex('items').select('*') //select * from items (get url_items)

        const serializedItems = items.map(item => {
            return {
                title: item.title,
                image_url:`http://localhost:3333/uploads/${item.image}`,
            } 
        }) 
        return response.send(serializedItems)
    
    }

}

export default ItemsController