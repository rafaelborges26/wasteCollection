import multer from 'multer'
import path from 'path'
import crypto from 'crypto' //para gerar um hash
 
export default {
   storage: multer.diskStorage({
       destination: path.resolve(__dirname,'..', '..' ,'uploads'), //destino dos arquivos de imagens q os users inserem
       filename(request, file, callback ) { //nome salvo dos uploads de aquivos dos users
           const hash = crypto.randomBytes(6).toString('hex') //criar um hash para os arquivos nao terem o mesmo nome apos salvar
         
           const fileName = `${hash}-${file.originalname}` //hash-nome do arquivo
           callback(null,fileName) //1 eh um callback de erro caso exista, segundo eh o nome do arq
 
       }
   }),
}
