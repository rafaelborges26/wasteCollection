import React from 'react'

interface HeaderProps {
    title: string //obrigatoria
    //title?: string; //n obrigatoria
}

const Header: React.FC<HeaderProps> = () => { //React.FC GENERICO, TIPO Q PODE RECEBER UM PARAMETRO, INFORMANDO QUAIS PROPRIEDADES O COMPONENTE PODE RECEBER
    return (
    <header>
        <h1>teste</h1>
    </header>
    )
}

export default Header