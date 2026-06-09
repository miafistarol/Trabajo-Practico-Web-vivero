// CONTROLADOR recibe req/res de express y va a llamar al modelo, y responder usando la vista
/*
status HTTP 
200 = ok 
201 = creado
404 = no encontrado
400 = datos incorrectos
500 = error del servidor
*/
import * as modelo from "./modelo.mjs"
import * as vista from "./vista.mjs"

export async function obtenerTodos(req, res) {
    try {
        const datos = await modelo.obtenerTodos()
        res.json({ estado: "ok", datos: vista.formatearTodos(datos) })
    } catch (error) {
        console.error("Error obtenerTodos:", error.message)
        res.status(500).json({ estado: "error", mensaje: "Error al obtener plantas" })
    }
}

export async function obtenerUno(req, res) {
    try {
        const id = Number(req.params.id)
        const datos = await modelo.obtenerUno(id)

        if (datos.length === 0) {
            return res.status(404).json({ estado: "error", mensaje: `Planta ${id} no encontrada` })
        }

        res.json({ estado: "ok", datos: vista.formatearUno(datos[0]) })
    } catch (error) {
        console.error("Error obtenerUno:", error.message)
        res.status(500).json({ estado: "error", mensaje: "Error al obtener la planta" })
    }
}

export async function crearProducto(req, res) {
    try {
        const { nombre, tipoplanta, tipoproducto, imagen, detalle1, detalle2 } = req.body
//req.body es el json que se mando en el POST o PUT 
// hago una constante para sacar los campos que quiero
        if (!nombre) {
            return res.status(400).json({ estado: "error", mensaje: "nombre es obligatorio" })
        }

        const nuevo = await modelo.insertarUno({ nombre, tipoplanta, tipoproducto, imagen, detalle1, detalle2 })
        res.status(201).json({ estado: "ok", datos: vista.formatearUno(nuevo) })
    } catch (error) {
        console.error("Error crearProducto:", error.message)
        res.status(500).json({ estado: "error", mensaje: "Error al crear la planta" })
    }
}

export async function actualizarProducto(req, res) {
    try {
        const id = Number(req.params.id)
        const { nombre, tipoplanta, tipoproducto, imagen, detalle1, detalle2 } = req.body

        if (!nombre) {
            return res.status(400).json({ estado: "error", mensaje: "nombre es obligatorio" })
        }

        const actualizado = await modelo.actualizarUno(id, { nombre, tipoplanta, tipoproducto, imagen, detalle1, detalle2 })

        if (!actualizado) {
            return res.status(404).json({ estado: "error", mensaje: `Planta ${id} no encontrada` })
        }

        res.json({ estado: "ok", datos: vista.formatearUno(actualizado) })
    } catch (error) {
        console.error("Error actualizarProducto:", error.message)
        res.status(500).json({ estado: "error", mensaje: "Error al actualizar la planta" })
    }
}

export async function eliminarProducto(req, res) {
    try {
        const id = Number(req.params.id)
        const eliminado = await modelo.eliminarUno(id)

        if (!eliminado) {
            return res.status(404).json({ estado: "error", mensaje: `Planta ${id} no encontrada` })
        }

        res.json({ estado: "ok", datos: vista.formatearUno(eliminado) })
    } catch (error) {
        console.error("Error eliminarProducto:", error.message)
        res.status(500).json({ estado: "error", mensaje: "Error al eliminar la planta" })
    }
}