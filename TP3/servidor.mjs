import express from "express"
import cors from "cors"

import dotenv from "dotenv"
//dotenv lee el archivo .env y carga todas las variables en process.env

import { rutasProductos } from "./modulos/productos/rutas.mjs"

dotenv.config()

const app = express()
const PUERTO = process.env.PUERTO || 3000

/*
process.env es un objeto de Node que contiene todas las variables de entorno del sistema
con dotenv.config cargo las variables ahi y con || es un "o" donde luego pongo un valor 
de respaldo 
*/

// middlewares 
app.use(cors())
app.use(express.json())         

// web pública
app.use(express.static("public"))

// panel de administración
app.use("/admin", express.static("admin"))

// API 
app.use(rutasProductos)


app.listen(PUERTO, () => {
    console.log(`Servidor corriendo en http://localhost:${PUERTO}`)
    console.log(`Panel admin:  http://localhost:${PUERTO}/admin`)
    console.log(`API:          http://localhost:${PUERTO}/api/v1/productos`)
})
