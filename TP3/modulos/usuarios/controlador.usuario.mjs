// CONTROLADOR recibe req/res de express y va a llamar al modelo y responder usando la vista
/*
status HTTP 
200 = ok 
201 = creado
400 = datos incorrectos
401 = no autorizado (credenciales invalidas)
409 = conflicto (el usuario ya existe)
500 = error del servidor
*/
import * as modelo from "./modelo.usuario.mjs"
import * as vista from "./vista.usuario.mjs"
import { compararClave } from "../../hash.mjs"
import { firmarToken , verificarToken } from "../../jwt.mjs"

/////////////////////// FUNCION REGISTRAR//////////////////////////////
export async function registro(req, res) {
    try {
        const { usuario, clave } = req.body

        if (!usuario || !clave) {
            return res.status(400).json({ estado: "error", mensaje: "usuario y clave son obligatorios" })
        }

        //verificamos que no exista antes de intentar el insert
        
        const existente = await modelo.obtenerPorUsuario(usuario)
        if (existente) {
            return res.status(409).json({ estado: "error", mensaje: "Ese usuario ya existe" })
        }

        const nuevo = await modelo.insertarUsuario({ usuario, clave })
        res.status(201).json({ estado: "ok", datos: vista.formatearUno(nuevo) })

    } catch (error) {
        console.error("Error registro:", error.message)
        res.status(500).json({ estado: "error", mensaje: "Error al registrar el usuario" })
    }
}

////////////////////////FUNCION LOGIN//////////////////////////
export async function login(req, res) {
    try {
        const { usuario, clave } = req.body

        if (!usuario || !clave) {
            return res.status(400).json({ estado: "error", mensaje: "usuario y clave son obligatorios" })
        }

        const encontrado = await modelo.obtenerPorUsuario(usuario)

        //mensaje generico a proposito: no decimos si el usuario no existe
        //o si la clave esta mal, siempre lo mismo
        if (!encontrado) {
            return res.status(401).json({ estado: "error", mensaje: "Usuario o clave incorrectos" })
        }

        const claveValida = await compararClave(clave, encontrado.clave)
        if (!claveValida) {
            return res.status(401).json({ estado: "error", mensaje: "Usuario o clave incorrectos" })
        }

        //credenciales correctas Y firmamos el token con los datos minimos necesarios
        const token = firmarToken({ id_usuario: encontrado.id_usuario, usuario: encontrado.usuario })

        //lo mandamos en una cookie httpOnly el JS del navegador no puede leerla
        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 2 * 60 * 60 * 1000 
        })

        res.json({ estado: "ok", mensaje: "Login exitoso", datos: vista.formatearUno(encontrado) })
    } catch (error) {
        console.error("Error login:", error.message)
        res.status(500).json({ estado: "error", mensaje: "Error al iniciar sesion" })
    }
}

export async function sesion(req, res) {
    //este endpoint NO usa el middleware verificarSesion como filtro
    // porque queremos que responda algo en los dos casos (logueado o no)
    //asi el frontend puede preguntar si esta logado sin que le tire 401
    const token = req.cookies.token

    if (!token) {
        return res.json({ estado: "ok", logueado: false })
    }

    try {
        const datos = verificarToken(token)
        return res.json({ estado: "ok", logueado: true, usuario: datos.usuario })
    } catch (error) {
        return res.json({ estado: "ok", logueado: false })
    }
}

export async function logout(req, res) {
    //borramos la cookie del lado del cliente
    res.clearCookie("token")
    res.json({ estado: "ok", mensaje: "Sesion cerrada" })
}