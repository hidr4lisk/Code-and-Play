// Importar los productos desde los archivos correspondientes
//import { mejoras } from './mejoras.js'
import { estadisticas } from './estadisticas.js'
//import { diamantes } from './dinero.js'
import * as sys from './sistema.js'
import * as render from './render.js'
//import * as search from './filtros.js'


// Variables iniciales
//let pedido = sys.obtenerDelStorage("pedido") || [] 
let estadisticasJugador = sys.obtenerDelStorage("estadisticas") || estadisticas 
//let diamantesJugador = sys.obtenerDelStorage("diamantes") || diamantes 




// EVENTOS ---------------------------------//
document.getElementById("btn-tienda").addEventListener("click", () => render.configurarModo("tienda")) // render tienda
document.getElementById("btn-pedido").addEventListener("click", () => render.configurarModo("pedido")) //render pedido

//document.getElementById("inputBuscar").addEventListener("input", buscarProductos)

document.getElementById("inputBuscar").addEventListener("keydown", (event) => {if (event.key === 'Enter') buscarProductos()}) 

// Inicialización ---------------------------------//

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("[data-modo]").dataset.modo = "tienda"
})

render.renderizarEstadisticas(estadisticasJugador)
