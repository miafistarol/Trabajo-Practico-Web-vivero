import { verificarToken } from "./jwt.mjs"

// middleware: protege rutas que requieren estar logueado
// se usa como cualquier otro middleware de express: app.use(rutaProtegida, verificarSesion, ...)

/////////////////////////////////////7
export function verificarSesion(req, res, next) {
    const token = req.cookies.token
    //req.cookies existe gracias al middleware cookie-parser  servidor.mjs

    if (!token) {
        return res.status(401).json({ estado: "error", mensaje: "Debe iniciar sesion" })
    }

    try {
        const datos = verificarToken(token)
        //si la firma es valida y no vencio, "datos" tiene { id_usuario, usuario, iat, exp }

        req.usuario = datos
    //disponible por si algun controlador necesita saber quien hizo la peticion

        next()
        //dejo pasar la peticion hacia el controlador

    } catch (error) {
        //jwt.verify tira error si el token es invalido o vencio (no devuelve true/false)
        return res.status(401).json({ estado: "error", mensaje: "Sesion invalida o vencida" })
    }
}

// middleware: protege paginas HTML (el panel admin)
// si no hay sesion valida, redirige al login en vez de devolver JSON
// (un navegador pidiendo una pagina espera HTML, no un error en formato JSON)

//////////////////FUNCION VERIFICAR SESION DE PAGINA///////////////////////

export function verificarSesionPagina(req, res, next) {
    const token = req.cookies.token

    if (!token) {
        return res.redirect("/admin/login.html")
    }

    try {
        verificarToken(token)
        next()
    } catch (error) {
        return res.redirect("/admin/login.html")
    }
}