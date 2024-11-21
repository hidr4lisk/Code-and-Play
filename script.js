// Importar los productos desde los archivos correspondientes
import { items } from './items.js'
import { jugador } from './jugador.js'

// Variables iniciales
let carrito = obtenerDelStorage("carrito") || [] // Cargar carrito desde localStorage si existe
let stats = obtenerDelStorage("stats") || jugador // Cargar stats desde localStorage si existe
let diamantes = 10000 // Carga los diamantes, cuando el juego este establecido arranca en 0

// Funciones auxiliares

// Guardar datos en localStorage
function guardarEnStorage(clave, valor) {
  let valorJson = JSON.stringify(valor)
  localStorage.setItem(clave, valorJson)
}

// Obtener datos desde localStorage
function obtenerDelStorage(clave) {
  const valorJson = localStorage.getItem(clave)
  return valorJson ? JSON.parse(valorJson) : null
}

// Función para actualizar la cantidad en el botón del carrito
function actualizarCantidadCarrito() {
  const cantidadCarrito = document.getElementById("btn-carrito")
  const cantidadTotal = carrito.length > 0
    ? carrito.reduce((total, producto) => total + producto.cantidad, 0)
    : 0
  cantidadCarrito.textContent = cantidadTotal === 0 ? "Carrito" : `Carrito(${cantidadTotal})`
}

// Funciones principales --------------------------------//

// Renderizar la tienda
function renderizarTienda(filtrar = '') {
  const lienzo = document.getElementById("lienzo")
  lienzo.innerHTML = '' // Limpiar la tienda actual

  const productosAMostrar = filtrar
    ? items.filter(producto => producto.nombre.toLowerCase().includes(filtrar.toLowerCase()) ||
      producto.categoria.toLowerCase().includes(filtrar.toLowerCase()))
    : items

  if (productosAMostrar.length === 0) {
    lienzo.innerHTML = "<p>No se encontraron productos en la tienda.</p>"
    return
  }

  productosAMostrar.forEach(producto => {
    const divProducto = document.createElement("div")
    divProducto.classList.add("producto")

    divProducto.innerHTML = `
      <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre} +${producto.mejora}</h3>
      <p>${producto.categoria}</p>
      <p>💎${producto.precio}</p>
      <button class="btn-agregar">Agregar al Carrito</button>
    `
    const botonAgregar = divProducto.querySelector(".btn-agregar")
    botonAgregar.addEventListener("click", () => agregarAlCarrito(producto.id))

    lienzo.appendChild(divProducto)
  })
}

// Agregar un producto al carrito
function agregarAlCarrito(idProducto) {
  const producto = items.find(p => p.id === idProducto)
  if (!producto) {
    alert("Producto no encontrado")
    return
  }

  const productoExistente = carrito.find(item => item.id === idProducto)
  if (productoExistente) {
    productoExistente.cantidad++
  } else {
    carrito.push({ ...producto, cantidad: 1 })
  }

  guardarEnStorage("carrito", carrito)
  actualizarCantidadCarrito()
}

// Mostrar el carrito
function mostrarCarrito(filtrar = '') {
  const lienzo = document.getElementById("lienzo")
  lienzo.innerHTML = '' // Limpiar el lienzo

  const productosAMostrar = filtrar
    ? carrito.filter(producto => producto.nombre.toLowerCase().includes(filtrar.toLowerCase()) ||
      producto.categoria.toLowerCase().includes(filtrar.toLowerCase()))
    : carrito

  if (productosAMostrar.length === 0) {
    lienzo.innerHTML = filtrar
      ? "<p>No se encontraron productos en el carrito.</p>"
      : "<p>El carrito está vacío.</p>"
    actualizarCantidadCarrito()
    return
  }

  productosAMostrar.forEach(producto => {
    const divProducto = document.createElement("div")
    divProducto.classList.add("producto")

    divProducto.innerHTML = `
      <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombre}">
      <h3>${producto.nombre} +${producto.mejora}</h3>
      <p>${producto.categoria}</p>
      <p>💎${producto.precio}</p>
      <p>Cantidad en Carrito: ${producto.cantidad}</p>
      <button class="btn-agregar">+</button>
      <button class="btn-eliminar">-</button>
    `
    const botonAgregar = divProducto.querySelector(".btn-agregar")
    const botonEliminar = divProducto.querySelector(".btn-eliminar")

    botonAgregar.addEventListener("click", () => {
      agregarAlCarrito(producto.id)
      mostrarCarrito()
    })

    botonEliminar.addEventListener("click", () => {
      eliminarDelCarrito(producto.id)
    })

    lienzo.appendChild(divProducto)
  })

  actualizarCantidadCarrito()
}

// Eliminar productos o reducir cantidades en el carrito
function eliminarDelCarrito(idProducto) {
  const producto = carrito.find(item => item.id === idProducto)
  if (!producto) return

  producto.cantidad--
  if (producto.cantidad === 0) carrito = carrito.filter(item => item.id !== idProducto)

  guardarEnStorage("carrito", carrito)
  mostrarCarrito()
}

// Mostrar la interfaz de batalla
function mostrarBatalla() {
  const lienzo = document.getElementById("lienzo")
  lienzo.innerHTML = 'Batalla'
}

// Renderizar los stats del jugador
function renderizarStats() {
  const statsPlayer = document.getElementById("stats_player")
  statsPlayer.innerHTML = '' // Limpiar los stats previos

  const atributosAMostrar = ["vida", "daño", "critico", "esquiva", "bloqueo", "armadura"]
  atributosAMostrar.forEach(attr => {
    if (jugador.hasOwnProperty(attr)) {
      const divStat = document.createElement("div")
      divStat.classList.add("stat")
      divStat.innerHTML = `<h2>📄 ${attr}: ${jugador[attr]}</h2>`
      statsPlayer.appendChild(divStat)
    }
  })
}

// Actualizar la visibilidad de la barra de búsqueda
function actualizarVisibilidadBusqueda() {
  const modo = document.querySelector("[data-modo]").dataset.modo
  const inputBuscar = document.getElementById("inputBuscar")

  if (modo === "batalla") {
    inputBuscar.style.visibility = "hidden"
    inputBuscar.style.pointerEvents = "none"
  } else {
    inputBuscar.style.visibility = "visible"
    inputBuscar.style.pointerEvents = "auto"
  }
}

// Función de búsqueda global
function buscarProductos() {
  const termino = document.getElementById("inputBuscar").value
  const modo = document.querySelector("[data-modo]").dataset.modo

  if (termino === '') {
    modo === "tienda" ? renderizarTienda() : mostrarCarrito()
    return
  }

  modo === "tienda" ? renderizarTienda(termino) : mostrarCarrito(termino)
}

// Eventos ---------------------------------------//

//Aca manejamos los cambios entre TIENDA / CARRITO / BATALLA
document.getElementById("btn-tienda").addEventListener("click", () => {
  document.querySelector("[data-modo]").dataset.modo = "tienda"
  renderizarTienda()
  actualizarVisibilidadBusqueda()
})
document.getElementById("btn-carrito").addEventListener("click", () => {
  document.querySelector("[data-modo]").dataset.modo = "carrito"
  mostrarCarrito()
  actualizarVisibilidadBusqueda()
})
document.getElementById("btn-batalla").addEventListener("click", () => {
  document.querySelector("[data-modo]").dataset.modo = "batalla"
  mostrarBatalla()
  actualizarVisibilidadBusqueda()
})

//Este es para buscar con el input
document.getElementById("inputBuscar").addEventListener("input", buscarProductos)

//Este es para buscar pero escribiendo
document.getElementById("inputBuscar").addEventListener("keydown", (event) => {
  if (event.key === 'Enter') buscarProductos()
})

// Inicialización ---------------------------------//

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("[data-modo]").dataset.modo = "batalla"
  actualizarVisibilidadBusqueda()
  renderizarStats()
  mostrarBatalla()
  actualizarCantidadCarrito()
})
