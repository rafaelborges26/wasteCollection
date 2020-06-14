import path from 'path'

module.exports = {
    client: 'sqlite3',
    connection: {
        filename: path.resolve(__dirname, 'src', 'database', 'database.sqlite' ) //pega o diretorio do arquivo=database , o nome do arquivo q vamos criar
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    },
    useNullAsDefault: true //para n dar erro na inclusao de tabelas
    
}
