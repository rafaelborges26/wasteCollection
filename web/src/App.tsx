import React, { useState } from 'react';
import './App.css'

import Header from './Header'


function App() {
  const [c, setC] = useState(0) //valor inicial de estado - [valor do estado(valor do c), funcao pra atualizar o valor do estado]

  function handleButtonClick() {
    setC(c + 1)//contador
  }

  return ( <div>
          <Header title= {`contador: ${c}`} />
          
          <h1>{c} </h1>
          <button type="button" onClick={handleButtonClick}>Aumentar</button>
        </div>
        )
}

export default App;


