import jwt from "jsonwebtoken"

//la clave secreta para firmar/verificar tokens vive en .env
//nunca hardcodeada en el codigo
const CLAVE_SECRETA = process.env.JWT_SECRET

export function firmarToken(datos) {
    //datos = lo que va adentro del token (id_usuario, usuario)
    //expiresIn: el token deja de ser valido despues de este tiempo
    return jwt.sign(datos, CLAVE_SECRETA, { expiresIn: "2h" })
}

export function verificarToken(token) {
    //si el token es invalido o vencio jwt.verify tira un error
    
    return jwt.verify(token, CLAVE_SECRETA)
}