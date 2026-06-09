import pg from "pg"
import dotenv from "dotenv"

dotenv.config()

const { Pool } = pg

// Pool mantiene varias conexiones abiertas y las reutiliza
// Es más eficiente que abrir/cerrar una conexión por request
const pool = new Pool({
    host:     process.env.DB_HOST,
    database: process.env.DB_NOMBRE,
    user:     process.env.DB_USUARIO,
    password: process.env.DB_PASSWORD,
    port:     Number(process.env.DB_PUERTO)
})

export { pool }

/*
import {Pool} from "pg"
 //pool es asincrona y nos devuelve una promesa 

 const pool = new Pool({

    host: "localhost",
    database: "tienda",
    user: "root", 
    password: "pass",
    port: 5432
})

export {pool} 

*/