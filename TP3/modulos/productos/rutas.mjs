// RUTAS — define qué URL llama a qué función del controlador
// Solo mapea método HTTP + ruta → controlador

import { Router } from "express"
import * as controlador from "./controlador.mjs"
import { verificarSesion } from "../../autenticacion.mjs"

const rutasProductos = new Router()

// CRUD

// leo y traigo todos los productos
rutasProductos.get("/api/v1/productos", controlador.obtenerTodos)

// leo y traigo un producto por id
rutasProductos.get("/api/v1/productos/:id", controlador.obtenerUno)

// creo un producto nuevo
rutasProductos.post("/api/v1/productos", verificarSesion,controlador.crearProducto)

// editar un producto existente
rutasProductos.put("/api/v1/productos/:id", verificarSesion,controlador.actualizarProducto)

// eliminar un producto
rutasProductos.delete("/api/v1/productos/:id", verificarSesion,controlador.eliminarProducto)

export { rutasProductos }
