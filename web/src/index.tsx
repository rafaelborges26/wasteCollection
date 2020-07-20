import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'

ReactDOM.render( //oq importa eh o app, estamos chamado um arquivo App
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);