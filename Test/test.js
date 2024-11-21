/* let usuarioLogueado = true;

let mensajeDeBienvenida = usuarioLogueado && (() => {
    console.log("Generando mensaje...");
    return "¡Bienvenido, usuario!";
})();

console.log(mensajeDeBienvenida); // "¡Bienvenido, usuario!" si está logueado, `false` si no.
 */


let producto = {
    id: 10,
    precio : 100,
    marca: "rolex",
}

let {id, precio: price, marca} = producto 
console.log(producto)
console.log(id)
console.log(price)
console.log(marca)



let nombres = ["juan", "pedro", "mingo"]
let [a, ,c] = nombres
console.log(a,c)