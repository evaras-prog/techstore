function mostrarCarrito() {
    const tbody = document.getElementById('carrito-body');
    const totalEl = document.getElementById('carrito-total');
    if (!tbody) return;

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        tbody.innerHTML = '<tr><td colspan="4">El carrito está vacío.</td></tr>';
        totalEl.textContent = '$0';
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

    totalEl.textContent = '$' + total.toLocaleString('es-CL');
}

mostrarCarrito();