function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carritoTechStore")) || [];
}

function guardarCarrito(c) {
    localStorage.setItem("carritoTechStore", JSON.stringify(c));
    if (typeof actualizarContadorCarrito === "function") actualizarContadorCarrito();
}

function agregarAlCarrito(codigo, cantidad = 1) {
    const p = productoPorCodigo(codigo);
    if (!p || Number(p.stock) <= 0) return alert("Producto sin stock.");
    cantidad = Math.max(1, Number(cantidad) || 1);

    const carrito = obtenerCarrito(),
        existente = carrito.find(i => i.codigo === codigo),
        actual = existente ? existente.cantidad : 0,
        nueva = Math.min(actual + cantidad, Number(p.stock));

    if (existente) existente.cantidad = nueva;
    else carrito.push({
        codigo: p.codigo, nombre: p.nombre, precio: Number(p.precio), imagen: p.imagen, cantidad: nueva
    });

    guardarCarrito(carrito);
    alert("Producto agregado al carrito.");
}

function cambiarCantidad(codigo, valor) {
    const p = productoPorCodigo(codigo),
        carrito = obtenerCarrito(),
        item = carrito.find(i => i.codigo === codigo);

    if (!item || !p) return;
    item.cantidad = Math.max(1, Math.min(Number(valor) || 1, Number(p.stock)));
    guardarCarrito(carrito);
    mostrarCarrito();
}

function eliminarDelCarrito(codigo) {
    guardarCarrito(obtenerCarrito().filter(i => i.codigo !== codigo));
    mostrarCarrito();
}

function vaciarCarrito() {
    if (confirm("¿Vaciar el carrito?")) {
        guardarCarrito([]);
        mostrarCarrito();
    }
}

function mostrarCarrito() {
    const tbody = document.getElementById('carrito-body');
    const totalEl = document.getElementById('carrito-total');
    if (!tbody) return;

    // FIX: ahora lee de 'carritoTechStore' (clave unificada)
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">El carrito está vacío.</td></tr>';
        if (totalEl) totalEl.textContent = '$0';
        return;
    }

    let total = 0;
    tbody.innerHTML = '';

    carrito.forEach(function(item) {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        tbody.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>$${item.precio.toLocaleString('es-CL')}</td>
                <td>${item.cantidad}</td>
                <td>$${subtotal.toLocaleString('es-CL')}</td>
            </tr>
        `;
    });

    if (totalEl) totalEl.textContent = '$' + total.toLocaleString('es-CL');
}

mostrarCarrito();
