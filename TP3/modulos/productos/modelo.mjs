import { pool } from "../../bd/conexion.mjs"

//pool.query() va a ejecutar el SQL

export async function obtenerTodos() {
    const resultado = await pool.query("SELECT * FROM plantas ORDER BY id_planta")
    return resultado.rows
}

export async function obtenerUno(id) {
    const resultado = await pool.query(
        "SELECT * FROM plantas WHERE id_planta = $1",
        //$1 es un placeholder
        [id]
    )
    return resultado.rows
}

export async function insertarUno(datos) {
    const { nombre, tipoplanta, tipoproducto, imagen, detalle1, detalle2 } = datos

    const resultado = await pool.query(
        `INSERT INTO plantas (nombre, tipoplanta, tipoproducto, imagen, detalle1, detalle2)
         VALUES ($1, $2, $3, $4, $5, $6)
         RETURNING *`,
        [nombre, tipoplanta, tipoproducto, imagen, detalle1, detalle2]
    )
    return resultado.rows[0]

//RETURNING* le dice a postgres que despues de insertar me devuelva la fila completa recien creada
}

export async function actualizarUno(id, datos) {
    const { nombre, tipoplanta, tipoproducto, imagen, detalle1, detalle2 } = datos

    const resultado = await pool.query(
        `UPDATE plantas
         SET nombre = $1, tipoplanta = $2, tipoproducto = $3,
             imagen = $4, detalle1 = $5, detalle2 = $6
         WHERE id_planta = $7
         RETURNING *`,
        [nombre, tipoplanta, tipoproducto, imagen, detalle1, detalle2, id]
    )
    return resultado.rows[0]
}

export async function eliminarUno(id) {
    const resultado = await pool.query(
        "DELETE FROM plantas WHERE id_planta = $1 RETURNING *",
        [id]
    )
    return resultado.rows[0]
}