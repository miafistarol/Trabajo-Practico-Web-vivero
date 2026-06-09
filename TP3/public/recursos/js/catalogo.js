import { renderizarProductos, modalDetalle, cargarProductos } from "./funciones.js"



const contenedor = document.getElementById("catalogo-plantas")
const selectorTipo = document.getElementById("id-tipo")

const btnFiltrar = document.getElementById("btn-filtrar")
const btnLimpiar = document.getElementById("btn-limpiar")
const btnMacetas = document.getElementById("btn-macetas")

let productosGlobal = []; 

cargarProductos().then(productos => {
    productosGlobal = productos;  
    renderizarProductos(productosGlobal, contenedor);
});

btnMacetas.addEventListener("click", () => {

    const filtrados = productosGlobal.filter(p => p.tipoproducto === "Maceta")
    renderizarProductos(filtrados, contenedor)
});

btnFiltrar.addEventListener("click", () => {
    const tipoElegido = selectorTipo.value;

    if (!tipoElegido) {
        alert("Elegí un tipo de planta primero")
        return;
    }

    const filtrados = productosGlobal.filter(p => p.tipoplanta === tipoElegido);

    renderizarProductos(filtrados, contenedor)
});

btnLimpiar.addEventListener("click", () => {
    selectorTipo.value = ""
    renderizarProductos(productosGlobal, contenedor)
});

