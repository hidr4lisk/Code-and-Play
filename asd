function principal() {
    let productos = [
        { id: 12, nombre: "remera mangas largas", categoria: "indumentaria", stock: 3, precio: 7300, rutaImagen: "remera-ml.jpeg" },
        { id: 15, nombre: "short de basquet", categoria: "indumentaria", stock: 8, precio: 5600, rutaImagen: "short.jpg" },
        { id: 2, nombre: "pelota de futbol", categoria: "deportes", stock: 2, precio: 5000, rutaImagen: "pelota-futbol.jpg" },
        { id: 7, nombre: "remera mangas cortas", categoria: "indumentaria", stock: 4, precio: 4500, rutaImagen: "remera.jpg" },
        { id: 9, nombre: "pelota de voley", categoria: "deportes", stock: 1, precio: 2800, rutaImagen: "pelota-voley.jpg" },
        { id: 5, nombre: "gorra 1", categoria: "indumentaria", stock: 7, precio: 2650, rutaImagen: "gorra.jpg" },
        { id: 17, nombre: "gorra 2", categoria: "indumentariaaa", stock: 7, precio: 2650, rutaImagen: "gorra2.jpg" },
    ]

    let carrito = []
    crearTarjetasProductos(productos)

    let botonesAgregarProductos = document.getElementsByClassName("botonAgregarAlCarrito")
    for (const boton of botonesAgregarProductos) {
        boton.addEventListener("click", (e) => agregarProductoAlCarrito(e, productos, carrito))
    }

    let botonProductosCarrito = document.getElementById("productosCarrito")
    botonProductosCarrito.addEventListener("click", verOcultarCarrito)
}

principal()

function verOcultarCarrito(e) {
    let carrito = document.getElementById("carrito")
    let contenedorProductos = document.getElementById("contenedorProductos")

    carrito.classList.toggle("oculta")
    contenedorProductos.classList.toggle("oculta")

    if (e.target.innerText === "Carrito") {
        e.target.innerText = "Productos"
    } else {
        e.target.innerText = "Carrito"
    }
}

function crearTarjetasProductos(productos) {
    let contenedor = document.getElementById("contenedorProductos")
    productos.forEach(producto => {
        let mensaje = "Unidades " + producto.stock
        if (producto.stock < 5) {
            mensaje = "Quedan pocas unidades"
        }
        let tarjetaProducto = document.createElement("div")
        tarjetaProducto.className = "producto"
        tarjetaProducto.innerHTML = `
            <img src=./images/${producto.rutaImagen} />
            <h3>${producto.nombre}</h3>
            <p>${mensaje}</p>
            <button class=botonAgregarAlCarrito id=${producto.id}>Agregar al carrito</button>
        `

        contenedor.appendChild(tarjetaProducto)

        /* let botonAgregarAlCarrito = document.getElementById(producto.id)
        // botonAgregarAlCarrito.addEventListener("click", agregarProductoAlCarrito)
        botonAgregarAlCarrito.addEventListener("click", (e) => agregarProductoAlCarrito(e, productos, carrito)) */
    })
}

function agregarProductoAlCarrito(event, productos, carrito) {
    let id = Number(event.target.id)
    let productoOriginal = productos.find(producto => producto.id === id)
    let indiceProductoEnCarrito = carrito.findIndex(producto => producto.id === id)
    if (indiceProductoEnCarrito === -1) {
        carrito.push({
            id: productoOriginal.id,
            nombre: productoOriginal.nombre,
            precioUnitario: productoOriginal.precio,
            unidades: 1,
            subtotal: productoOriginal.precio
        })
    } else {
        carrito[indiceProductoEnCarrito].unidades++
        carrito[indiceProductoEnCarrito].subtotal = carrito[indiceProductoEnCarrito].precioUnitario * carrito[indiceProductoEnCarrito].unidades
    }

    renderizarCarrito(carrito)
}

function renderizarCarrito(carrito) {
    let contenedorCarrito = document.getElementById("carrito")
    contenedorCarrito.innerHTML = ""

    carrito.forEach(producto => {
        let tarjetaCarrito = document.createElement("div")
        tarjetaCarrito.className = "tarjetaCarrito"
        // tarjetaCarrito.classList.add("tarjetaCarrito")

        tarjetaCarrito.innerHTML = `
            <p>${producto.nombre}</p>
            <p>${producto.precioUnitario}</p>
            <p>${producto.unidades}</p>
            <p>${producto.subtotal}</p>
        `
        contenedorCarrito.appendChild(tarjetaCarrito)
    })
}

// filtro por buscador (input)
// filtro por categorias

// ordenar por cualquier propiedad

/* let boton = document.getElementById("botonPrueba")
console.log(boton)
console.dir(boton)

// boton.addEventListener("click", funcionDePrueba)
// boton.onclick = funcionDePrueba
boton.ondblclick = funcionDePrueba2

function funcionDePrueba() {
    alert("HICISTE CLICK")
}

function funcionDePrueba2() {
    alert("HICISTE DOBLE CLICK")
}

let cajita = document.getElementById("cajita")
cajita.addEventListener("mouseover", fnMouseOver)
cajita.addEventListener("mousedown", fnMouseDown)
cajita.addEventListener("mouseout", fnMouseOut)
cajita.addEventListener("mousemove", fnMouseMove)

function fnMouseOver() {
    console.log("Escuché MOUSEOVER")
}

function fnMouseDown() {
    console.log("Escuché MOUSEDOWN")
}

function fnMouseOut() {
    console.log("Escuché MOUSEOUT")
}

function fnMouseMove() {
    console.log("Escuché MOUSEMOVE")
}

let inputBuscar = document.getElementById("inputBuscar")
inputBuscar.addEventListener("keydown", () => console.log("Se ejecutó keydown"))
inputBuscar.addEventListener("keypress", () => console.log("Se ejecutó keypress"))
inputBuscar.addEventListener("keyup", () => console.log(inputBuscar.value))
inputBuscar.addEventListener("change", () => console.log("Se ejecutó change"))
inputBuscar.addEventListener("input", funcionInput)
// inputBuscar.addEventListener("input", (algo) => funcionInput(algo))

function funcionInput(e) {
    console.log("informacion del evento: " + e)
    console.log("informacion del elemento que escuchó el evento: " + e.target)
} */

// boton.addEventListener("click", (param1) => funcionDePrueba(param1, param2))
// boton.onclick = () => funcionDePrueba()