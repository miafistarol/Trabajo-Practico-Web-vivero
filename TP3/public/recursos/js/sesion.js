const API_SESION = "http://localhost:3000/api/v1/usuarios/sesion"

document.addEventListener("DOMContentLoaded", actualizarItemSesion)

async function actualizarItemSesion() {
    const itemSesion = document.getElementById("item-sesion")
    if (!itemSesion) return
    //si la pagina no tiene ese elemento, no hacemos nada (por si me olvido en alguna)

    try {
        const res  = await fetch(API_SESION, { credentials: "include" })
        //credentials: "include" es necesario para que el navegador
        //mande la cookie "token" junto con esta peticion
        const json = await res.json()

        if (json.logueado) {
            itemSesion.innerHTML = `<a href="/admin/index.html">PANEL DE ADMINISTRACIÓN</a>`
        } else {
            itemSesion.innerHTML = `<a href="/admin/login.html">INICIAR SESIÓN</a>`
        }
    } catch (error) {
        //si falla la consulta (ej: servidor caido), dejamos el link de login por defecto
        itemSesion.innerHTML = `<a href="/admin/login.html">INICIAR SESIÓN</a>`
    }
}