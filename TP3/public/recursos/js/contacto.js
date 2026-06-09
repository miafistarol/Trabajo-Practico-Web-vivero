
import { abrirModal, cerraModal } from "./funciones.js"

const contenedorModal = document.getElementById("modal-gracias")
const btnCerrarModal = document.getElementById("btnCerrar")
const btnAbrirModal = document.getElementById("btnEnviar")


const form = document.getElementById("miFormulario")


// Cerrar modal
btnCerrarModal.addEventListener("click", () => {
    cerraModal(contenedorModal)
});

form.addEventListener("submit", (e) => {
    e.preventDefault()

    const datos = Object.fromEntries(new FormData(form).entries())
    console.log("Datos enviados:",datos) 

    abrirModal(contenedorModal)
    form.reset()
});

