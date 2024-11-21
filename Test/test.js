let usuarioLogueado = true;

let mensajeDeBienvenida = usuarioLogueado && (() => {
    console.log("Generando mensaje...");
    return "¡Bienvenido, usuario!";
})();

console.log(mensajeDeBienvenida); // "¡Bienvenido, usuario!" si está logueado, `false` si no.
