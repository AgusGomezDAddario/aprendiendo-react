import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './assets/App'
import './assets/index.css'
// Este es el punto de entrada de la aplicacion
// En la linea 8, se selecciona el elemento del DOM con el id 'root' de HTML para mostrar donde renderizar el main
// Esta funcion solo espera que se le pase un parámtero, por ejemplo, no se pueden mandar dos botones
const root = ReactDOM.createRoot(document.getElementById('root'))
//Los nombres de los componentes siempre tienen que estar en PascalCase, para diferenciar elementos HTML de componentes

root.render(
  <App />
)
  
