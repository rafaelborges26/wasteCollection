import Knex from 'knex' //importar para conseguimos acessar as funcoes pelo ponto

//up serve para criar tabela
export async function up(knex: Knex){ //atribuindo o import para conseguimos pegar as funcoes atraves do ponto
    //PARA CRIAR A TABELA
    return knex.schema.createTable('points', table => {
        table.increments('id').primary()
        table.string('image').notNullable()
        table.string('name').notNullable()
        table.string('email').notNullable()
        table.string('whatsapp').notNullable()
        table.decimal('latitude').notNullable()
        table.decimal('longitude').notNullable()
        table.string('city').notNullable()
        table.string('uf',2).notNullable()
    })

} 

export async function down(knex: Knex) {
//PARA VOLTAR ATRAS (DELETAR A TABELA)
    return knex.schema.dropTable('points')

}