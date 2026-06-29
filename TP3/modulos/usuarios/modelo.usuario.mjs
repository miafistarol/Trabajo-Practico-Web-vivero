import { pool } from "../../bd/conexion.mjs"
import { hashClave } from "../../hash.mjs"

//pool.query() va a ejecutar el SQL

////////////////////// OBTENER USUARIO //////////////////////
export async function obtenerPorUsuario(usuario) {
    const resultado = await pool.query(
        "SELECT * FROM usuarios WHERE usuario = $1",
        [usuario]
    )
    return resultado.rows[0]
    //devuelve un solo registro (o undefined si no existe), no un arreglo
    
}

/////////////////////////// INSERTAR USUARIO/////////////////////////////////
export async function insertarUsuario(datos) {
    const { usuario, clave } = datos

    //el modelo nunca guarda la clave en texto plano lo hasheo aca antes de armar la consulta
    const claveHasheada = await hashClave(clave)

    const resultado = await pool.query(
        `INSERT INTO usuarios (usuario, clave)
         VALUES ($1, $2)
         RETURNING id_usuario, usuario`,
       //no devuelvo clave
        [usuario, claveHasheada]
    )
    return resultado.rows[0]
}