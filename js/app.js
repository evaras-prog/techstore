function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem("carritoTechStore")) || [];
    const total = carrito.reduce((s, i) => s + i.cantidad, 0);

    // Actualiza elementos con data-carrito-contador (por si alguna página los tiene)
    document.querySelectorAll("[data-carrito-contador]").forEach(e => e.textContent = total);

    // Inyecta el contador en el enlace del carrito del navbar automáticamente
    const navCarrito = document.querySelector('nav a[href="carrito.html"]');
    if (navCarrito) {
        let badge = navCarrito.querySelector('.carrito-badge');
        if (!badge) {
            badge = document.createElement('span');
            badge.className = 'carrito-badge';
            navCarrito.appendChild(badge);
        }
        badge.textContent = total > 0 ? ' (' + total + ')' : '';
    }
}

function actualizarSesionPublica() {
    const u = JSON.parse(localStorage.getItem("usuarioActual") || "null");
    document.querySelectorAll("[data-sesion]").forEach(e => e.textContent = u ? `Hola, ${u.nombre} (${u.tipo})` : "");
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarContadorCarrito();
    actualizarSesionPublica();
});
