import express from "express"
import cors from "cors"

import dotenv from "dotenv"
import cookieParser from "cookie-parser"
//dotenv lee el archivo .env y carga todas las variables en process.env

import { rutasProductos } from "./modulos/productos/rutas.mjs"
import { rutasUsuarios } from "./modulos/usuarios/rutas.usuario.mjs"
import { verificarSesionPagina } from "./autenticacion.mjs"
dotenv.config()

const app = express()
const PUERTO = process.env.PUERTO || 3000

/*
process.env es un objeto de Node que contiene todas las variables de entorno del sistema
con dotenv.config cargo las variables ahi y con || es un "o" donde luego pongo un valor 
de respaldo 
*/

// middlewares 

/* CORS: no se usa cors() porque el front-end (web publica/panel admin)
y la API se sirven desde el mismo servidor Express, mismo origen siempre
(mismo protocolo, dominio y puerto). 
El CORS lo usamos cuando navegador solo aplica restricciones
de origen cruzado cuando esos 3 componentes difieren.*/
app.use(express.json())         
app.use(cookieParser())
//cookieParser lee la cabecera "Cookie" de cada peticion y la convierte en el objeto req.cookies


// login.html queda PUBLICO a proposito porque no podrian entrar 
// ver el formulario para autenticarse (se serviria antes de poder loguearse)
app.get("/admin/login.html", (req, res) => {
    res.sendFile("login.html", { root: "admin" })
})

// el resto de /admin (el panel de gestion) queda protegido
// si no hay sesion valida, verificarSesionPagina redirige a /admin/login.html
app.use("/admin", verificarSesionPagina, express.static("admin"))

app.use(express.static("public"))

// API 
app.use(rutasProductos)
app.use(rutasUsuarios)

app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
    console.log(`Panel admin:  http://localhost:${PUERTO}/admin`)
    console.log(`API:          http://localhost:${PUERTO}/api/v1/productos`)
})
