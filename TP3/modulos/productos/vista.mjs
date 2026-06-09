// VISTA se encarga de formatear los datos antes de enviarlos
// define exactamente cómo luce la respuesta JSON de la API


export function formatearUno(planta) {
    return {
        id:           planta.id_planta,
        nombre:       planta.nombre,
        tipoplanta:   planta.tipoplanta,
        tipoproducto: planta.tipoproducto,
        imagen:       planta.imagen,
        detalle1:     planta.detalle1,
        detalle2:     planta.detalle2
    }
}

export function formatearTodos(plantas) {
    return plantas.map(formatearUno)
}
//map recorre el array y aplica formatearUno a cada elemento y me devuelve un array ya listo