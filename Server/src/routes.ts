import knex from './database/connection' //conexao com o banco de dados
import express from 'express'

const routes = express.Router() //para focar as rotas nesse arquivo


routes.get('/items', async (req,res) => { //se usar o await deve usar o async, await pois o processamento demorara ai faz ele esperar
    const items = await knex('items').select('*') //select * from items (get url_items)

    const serializedItems = items.map(item => {
        return {
            title: item.title,
            image_url:`http://localhost:3333/uploads/${item.image}`,
        } 
    }) 
    return res.send(serializedItems)
})

routes.post('/points',async (request,response) => { //insert
    const {
        name,
        email,
        whatsapp,
        latitude,
        longitude,
        city,
        uf,
        item //para relacionamento
    } = request.body

    const trx = await knex.transaction() //para caso der erro nos inserts ele n executa, colocar a variavel no lugar do knex para usar

    const insertedIds = await trx('points').insert({
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

})

export default routes //estamos exportando as rotas para o arquivouest principal

