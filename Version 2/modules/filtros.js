// Función de búsqueda global
function buscarProductos() {
    const termino = document.getElementById("inputBuscar").value
    const modo = document.querySelector("[data-modo]").dataset.modo
  
    if (termino === '') {
      modo === "tienda" ? render.renderizarTienda() : render.renderizarPedido()
      return
    }
  
    modo === "tienda" ? render.renderizarTienda(termino) : render.renderizarPedido(termino)
  }