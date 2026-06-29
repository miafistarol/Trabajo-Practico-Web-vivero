// RUTAS — define que URL llama a que función del controlador
// Solo mapea método HTTP + ruta → controlador

import { Router } from "express"
import * as controlador from "./controlador.usuario.mjs"

const rutasUsuarios = new Router()

// registro de un nuevo usuario administrador
rutasUsuarios.post("/api/v1/usuarios/registro", controlador.registro)

// login: valida credenciales y entrega la cookie con el token
rutasUsuarios.post("/api/v1/usuarios/login", controlador.login)

// logout: borra la cookie
rutasUsuarios.post("/api/v1/usuarios/logout", controlador.logout)

// consulta si hay una sesion activa (para mostrar u ocultar en ancla de admin 
// segun corresponda)
rutasUsuarios.get("/api/v1/usuarios/sesion", controlador.sesion)

export { rutasUsuarios }