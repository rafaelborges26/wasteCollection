import knex from 'knex'
import path from 'path' //para acessarmos arquivos em pastas de uma forma mais facil

const connection = knex({
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'database.sqlite') //pega o diretorio do arquivo=database , o nome do arquivo q vamos criar
    },
    useNullAsDefault: true //para nao dar erro na criacao de tabelas
})


export default connection //estamos exportando para nosso arquivo server

//migrations é o historico do banco de dados

//com migrations caso seja mais de uma pessoa desenvolvendo conseguimos compartilhar as tabelas criadas.

