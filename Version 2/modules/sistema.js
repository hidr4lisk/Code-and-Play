export {guardarEnStorage, obtenerDelStorage}
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

  