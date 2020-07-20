import Knex from 'knex' //importar para conseguimos acessar as funcoes pelo ponto

//up serve para criar tabela
export async function up(knex: Knex){ //atribuindo o import para conseguimos pegar as funcoes atraves do ponto
    //PARA CRIAR A TABELA
    return knex.schema.createTable('point_items', table => {
        table.increments('id').primary()
        table.integer('point_id')
        .notNullable()
        .references('id') //o id tem q ser um id valido na tabela points
        .inTable('points')
        table.integer('item_id')
        .notNullable()
        .references('id')
        .inTable('items')
    })

} 

export async function down(knex: Knex) {
//PARA VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('point_items')

}