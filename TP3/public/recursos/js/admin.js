const API = "http://localhost:3000/api/v1/productos"

// dom
const formProducto      = document.getElementById("form-producto")
const formTitulo        = document.getElementById("form-titulo")
const inputId           = document.getElementById("input-id")
const inputNombre       = document.getElementById("input-nombre")
const inputTipoplanta   = document.getElementById("input-tipoplanta")
const inputTipoproducto = document.getElementById("input-tipoproducto")
const inputImagen       = document.getElementById("input-imagen")
const inputDetalle1     = document.getElementById("input-detalle1")
const inputDetalle2     = document.getElementById("input-detalle2")
const tbodyProductos    = document.getElementById("tbody-productos")
const mensajeForm       = document.getElementById("mensaje-form")
const btnCancelar       = document.getElementById("btn-cancelar")

//cargo la tabla
document.addEventListener("DOMContentLoaded", cargarTabla)

async function cargarTabla() {
    try {
        const res  = await fetch(API)
        const json = await res.json()

        if (json.estado !== "ok") throw new Error(json.mensaje)

        tbodyProductos.innerHTML = ""  

        if (json.datos.length === 0) {
            tbodyProductos.innerHTML = `<tr><td colspan="5">No hay productos cargados.</td></tr>`
            return
        }

        json.datos.forEach(producto => {
            tbodyProductos.appendChild(crearFila(producto))
        })
        //por cada producto del array crea una fila html y lo agrego al <tbody> de la tabla

    } catch (error) {
        tbodyProductos.innerHTML = `<tr><td colspan="5">Error al cargar: ${error.message}</td></tr>`
    }
}

function crearFila(producto) {
    const tr = document.createElement("tr")
    tr.innerHTML = `
        <td>${producto.id}</td>
        <td>${producto.nombre}</td>
        <td>${producto.tipoplanta || "—"}</td>
        <td>${producto.tipoproducto || "—"}</td>
        <td>
            <button class="btn btn-editar"   onclick="prepararEdicion(${producto.id})">Editar</button>
            <button class="btn btn-eliminar" onclick="eliminarProducto(${producto.id})">Eliminar</button>
        </td>
    `
    return tr
}

// Envío del formulario 
formProducto.addEventListener("submit", async (evento) => {
    evento.preventDefault()  
    const id = inputId.value  // vacío = alta, tiene valor = edición

   const datos = {
    nombre:       inputNombre.value.trim(),
    tipoplanta:   inputTipoplanta.value,
    tipoproducto: inputTipoproducto.value,
    imagen:       inputImagen.value.trim(),
    detalle1:     inputDetalle1.value.trim(),
    detalle2:     inputDetalle2.value.trim()
}

    try {
        let res

        if (id) {
            // PUT modificar
            res = await fetch(`${API}/${id}`, {
                method:  "PUT",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(datos)
            })
        } else {
            // POST crear
            res = await fetch(API, {
                method:  "POST",
                headers: { "Content-Type": "application/json" },
                body:    JSON.stringify(datos)
            })
        }

        const json = await res.json()
        if (json.estado !== "ok") throw new Error(json.mensaje)

        mostrarMensaje("Guardado correctamente ✓", "exito")
        limpiarFormulario()
        cargarTabla()

    } catch (error) {
        mostrarMensaje(`Error: ${error.message}`, "error")
    }
})


btnCancelar.addEventListener("click", limpiarFormulario)


async function prepararEdicion(id) {
    try {
        const res  = await fetch(`${API}/${id}`)
        const json = await res.json()
        if (json.estado !== "ok") throw new Error(json.mensaje)

        const p = json.datos

        inputId.value           = p.id
        inputNombre.value       = p.nombre
        inputTipoplanta.value   = p.tipoplanta   || ""
        inputTipoproducto.value = p.tipoproducto || ""
        inputImagen.value       = p.imagen       || ""
        inputDetalle1.value     = p.detalle1     || ""
        inputDetalle2.value     = p.detalle2     || ""

        formTitulo.textContent = `Editando: ${p.nombre}`

    } catch (error) {
        mostrarMensaje(`Error al cargar producto: ${error.message}`, "error")
    }
}

// Eliminar producto
async function eliminarProducto(id) {
    if (!confirm("¿Seguro que querés eliminar este producto?")) return

    try {
        const res  = await fetch(`${API}/${id}`, { method: "DELETE" })
        const json = await res.json()

        if (json.estado !== "ok") throw new Error(json.mensaje)

        mostrarMensaje("Producto eliminado ✓", "exito")
        cargarTabla()

    } catch (error) {
        mostrarMensaje(`Error al eliminar: ${error.message}`, "error")
    }
}

//
function limpiarFormulario() {
 inputNombre.value        = ""
inputTipoplanta.value    = ""
inputTipoproducto.value  = ""
inputImagen.value        = ""
inputDetalle1.value      = ""
inputDetalle2.value      = ""
    formTitulo.textContent = "Agregar producto"
    ocultarMensaje()
}

function mostrarMensaje(texto, tipo) {
    mensajeForm.textContent = texto
    mensajeForm.className   = `mensaje ${tipo}`
}

function ocultarMensaje() {
    mensajeForm.className = "mensaje oculto"
}