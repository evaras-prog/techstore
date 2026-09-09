function actualizarContadorCarrito() {
    const carrito=JSON.parse(localStorage.getItem("carritoTechStore"))||[],
    total=carrito.reduce((s, i) =>s+i.cantidad, 0);
    document.querySelectorAll("[data-carrito-contador]").forEach(e =>e.textContent=total);
}

function actualizarSesionPublica() {
    const u=JSON.parse(localStorage.getItem("usuarioActual")||"null");
    document.querySelectorAll("[data-sesion]").forEach(e =>e.textContent=u?`Hola, ${u.nombre} (${u.tipo})`:"");
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito(); actualizarSesionPublica();
}
);
