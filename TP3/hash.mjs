import bcrypt from "bcryptjs";

//recibe la contraseña en texto plano y devuelve el hash

export async function hashClave(claveTextoPlano) {
    return await bcrypt.hash(claveTextoPlano, 10);
}

//compara la contraseña ingresada con el hash guardado
//cevuelve true o false
 
export async function compararClave(claveTextoPlano, hashGuardado) {
    return await bcrypt.compare(claveTextoPlano, hashGuardado);
}

