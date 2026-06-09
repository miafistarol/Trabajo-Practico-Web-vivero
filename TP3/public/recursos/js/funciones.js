
//Función Abrir modal
function abrirModal(contenedorModal) {
    contenedorModal.style.display = "flex"
}

//Función Cerrar modal
function cerraModal(contenedorModal) {
    contenedorModal.style.display = "none"
}

//Función redenderizar productos
function renderizarProductos(lista, contenedor) {
    let contenidoProductos = ''

    lista.forEach(producto => {

        const plantilla = `

                <div class="planta-etiqueta" data-id="${producto.id}">
                    <img src="${producto.imagen}" alt="${producto.nombre}" onerror="this.style.display='none'">
                    <p> ${producto.nombre} </p>
                </div>

            `

        contenidoProductos += plantilla

    });

    contenedor.innerHTML = contenidoProductos


    document.querySelectorAll(".planta-etiqueta").forEach(elem => {
        elem.addEventListener("click", () => {
            const id = elem.dataset.id;
            const prod = lista.find(p => p.id == id);
            modalDetalle(prod)
        });
    });

}

//Función cargar y mostrar ventana modal

function modalDetalle(producto) {
    const modal = document.getElementById("modal-planta")

    //  IMAGEN Y NOMBRE //
    const imgPlanta = modal.querySelector(".planta-seleccionada")
    const nombrePlanta = modal.querySelector("#nombre-planta")

    imgPlanta.src = producto.imagen
    imgPlanta.alt = producto.nombre
    imgPlanta.title= producto.nombre
    nombrePlanta.textContent = producto.nombre

    //  DETALLES //
    const detalle1 = modal.querySelector("#detalle1")
    const detalle2 = modal.querySelector("#detalle2")


    if (producto.detalle && producto.detalle.length > 0) {
        // DESPUÉS — los campos vienen directo del objeto
detalle1.textContent = producto.detalle1 || "—"
detalle2.textContent = producto.detalle2 || "—"
    }

    // ICONOS DE CUIDADOS  //
    const contenedorCuidados = modal.querySelector(".iconos-cuidados")
    contenedorCuidados.innerHTML = ""; // limpio lo previo

    producto.cuidados.forEach(cuidado => {
        const icono = document.createElement("img")
        icono.src = cuidado.imagen
        icono.alt = cuidado.descripcion
        icono.title = cuidado.descripcion
        contenedorCuidados.appendChild(icono)
    });

    // MOSTRAR MODAL  //
    modal.style.display = "flex";

    const btnCerrar = modal.querySelector("#btn-cerrar-modal")
    btnCerrar.addEventListener("click", () => cerraModal(modal))
}

//Función asincrónica
// async function cargarProductos() {
//     const response = await fetch('http://localhost:3000/productos')
//     const data = await response.json() /*API JSON*/ 
//     return data
// }

async function cargarProductos() {
    try {
        const response = await fetch('/api/v1/productos')  // ← URL corregida
        const data = await response.json()
        console.log("DATOS:", data)
        return data.datos  // ← antes decía solo "data"
    } catch (error) {
        console.log("ERROR:", error)
    }
}

export { cerraModal, abrirModal, renderizarProductos, modalDetalle, cargarProductos}
