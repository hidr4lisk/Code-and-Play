export { configurarModo, renderizarEstadisticas }

function configurarModo(modo) {
  document.querySelector("[data-modo]").dataset.modo = modo
  actualizarVisibilidadBarraSecundaria()
  if (modo === "tienda") renderizarTienda()
  else renderizarPedido()
}

function renderizarEstadisticas(estadisticasJugador) {
  const estadisticasContainer = document.getElementById("estadisticas_jugador")
  estadisticasContainer.innerHTML = '' // Limpiar los stats previos

  for (let atributo in estadisticasJugador) {
    if (estadisticasJugador.hasOwnProperty(atributo)) {
      const divStat = document.createElement("div")
      divStat.classList.add("estadistica")

      // Capitalizar la primera letra del atributo para una mejor presentación
      const atributoFormateado =
        atributo.charAt(0).toUpperCase() + atributo.slice(1)

      // Definir el color dependiendo del atributo
      let colorNombre = 'black' // Valor por defecto para el nombre del atributo

      switch (atributo) {
        case 'vida':
          colorNombre = 'green' // "vida"
          break
        case 'daño':
          colorNombre = 'red' // "daño"
          break
        case 'critico':
          colorNombre = 'orange' // "critico"
          break
        case 'esquiva':
          colorNombre = 'gray' // "esquiva"
          break
        case 'bloqueo':
          colorNombre = 'violet' // "bloqueo"
          break
        case 'armadura':
          colorNombre = 'purple' // "armadura"
          break
        case 'suerte':
          colorNombre = 'cyan' // "suerte"
          break
        default:
          colorNombre = 'black' // Si no tiene un color asignado, negro por defecto
      }

      // Crear el HTML para el atributo con el color en el nombre y blanco en el valor
      divStat.innerHTML = `
        <p style="
          color: ${colorNombre}; 
          text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3), 0 0 5px ${colorNombre}; 
          font-weight: bold; 
          text-transform: uppercase; 
          font-family: 'Arial', sans-serif;">
          ${atributoFormateado}
        </p>
        <p style="color: black; font-weight: normal; font-family: 'Arial', sans-serif;">
          ${estadisticasJugador[atributo]}
        </p>
      `
      estadisticasContainer.appendChild(divStat)
    }
  }
}
