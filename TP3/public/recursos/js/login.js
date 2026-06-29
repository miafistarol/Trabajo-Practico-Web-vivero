const API_LOGIN = "http://localhost:3000/api/v1/usuarios/login"
const API_REGISTRO = "http://localhost:3000/api/v1/usuarios/registro"

// dom
const formLogin = document.getElementById("form-login")
const inputUsuario = document.getElementById("input-usuario")
const inputClave= document.getElementById("input-clave")
const mensajeLogin  = document.getElementById("mensaje-login")
const btnRegistro = document.getElementById("btn-registro")

formLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault()

    const datos = {
        usuario: inputUsuario.value.trim(),
        clave:inputClave.value
    }

    try {
        const res = await fetch(API_LOGIN, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos),
            credentials: "include"
            //credentials: "include" es necesario para que el navegador
            //guarde la cookie que el servidor manda en la respuesta
        })

        const json = await res.json()
        if (json.estado !== "ok") throw new Error(json.mensaje)

        //login correcto: ya tenemos la cookie con el token, vamos al panel
        window.location.href = "/admin/index.html"

    } catch (error) {
        mostrarMensaje(`Error: ${error.message}`, "error")
    }
})

function mostrarMensaje(texto, tipo) {
    mensajeLogin.textContent =texto
    mensajeLogin.className= `mensaje ${tipo}`
}

btnRegistro.addEventListener("click", async () => {
    const datos= {
        usuario:inputUsuario.value.trim(),
        clave: inputClave.value
    }

    if (!datos.usuario || !datos.clave) {
        mostrarMensaje("Completá usuario y clave para registrarte", "error")
        return
    }

    try {
        const res = await fetch(API_REGISTRO, {
            method:"POST",
            headers:{ "Content-Type": "application/json" },
            body:JSON.stringify(datos)
            //este endpoint no necesita credentials: "include"
            //porque registro no inicia sesion (no devuelve cookie)
        })

        const json =await res.json()
        if (json.estado !== "ok") throw new Error(json.mensaje)

        mostrarMensaje("Usuario creado, ahora podés ingresar", "exito")

    } catch (error) {
        mostrarMensaje(`Error: ${error.message}`, "error")
    }
})