import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import './styles.css'
import { FiUpload } from 'react-icons/fi'

interface Props { //definindo para funcionar a funcao no arquivo Points, e receber o file nesse arquivo
    onFileUploaded: ( file: File) => void //funcao sem retorno
}

const Dropzone: React.FC<Props> =  ({onFileUploaded}) => {
    const [selectedFileUrl, setSelectedFileUrl] = useState('')

  const onDrop = useCallback(acceptedFiles => {
    const file = acceptedFiles[0] //pegando o arquivo selecionado

    const fileUrl = URL.createObjectURL(file)
        setSelectedFileUrl(fileUrl)
        onFileUploaded(file)
  }, [onFileUploaded])

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
      onDrop,
      accept: 'image/*' //qualquer tipo de img
    })

  return (
      <>
    <div className="dropzone" {...getRootProps()}>
      <input {...getInputProps()} accept="image/*" /> 
      
              { selectedFileUrl ? <img src={selectedFileUrl} /> : ( //pre selecao da imagem na tela
                <p>
                  <FiUpload />
                  Imagem do estabelecimento 
              </p>
              ) 
              
      }
    </div>
    </>
  )
}

export default Dropzone