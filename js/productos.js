const productos = [
    { id: 1, nombre: "Laptop Ultrabook Pro", atributos: "Intel Core i7 | 16GB RAM | 512GB SSD", precio: 899990, imagen: "img/laptop.jpg" },
    { id: 2, nombre: "Smartphone Galaxy X", atributos: "6.7\" AMOLED | 128GB | 5G", precio: 499990, imagen: "img/smartphone.jpg" },
    { id: 3, nombre: "Audífonos Noise Pro", atributos: "Bluetooth 5.0 | ANC | 30h batería", precio: 129990, imagen: "img/audifonos.jpg" },
    { id: 4, nombre: "Tablet ProPad 11", atributos: "11\" | 256GB | WiFi 6 | Stylus", precio: 349990, imagen: "img/tablet.jpg" },
    { id: 5, nombre: "Monitor UltraWide 34\"", atributos: "3440x1440 | 144Hz | IPS | HDR", precio: 459990, imagen: "img/monitor.jpg" },
    { id: 6, nombre: "Teclado Mecánico RGB", atributos: "Switch Red | TKL | Retroiluminado", precio: 89990, imagen: "img/teclado.jpg" },
    { id: 7, nombre: "Mouse Gamer Pro", atributos: "16000 DPI | RGB | 7 botones", precio: 49990, imagen: "img/mouse.jpg" },
    { id: 8, nombre: "Webcam 4K Stream", atributos: "4K 30fps | Micrófono | USB-C", precio: 79990, imagen: "img/webcam.jpg" }
];

function mostrarProductos() {
    const grid = document.getElementById('grid-productos');
    if (!grid) return;

    grid.innerHTML = '';

    productos.forEach(function(producto) {
        const precio = producto.precio.toLocaleString('es-CL');
        grid.innerHTML += `
            <article class="tarjeta-producto">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <div class="tarjeta-info">
                    <h3>${producto.nombre}</h3>
                    <p class="atributos">${producto.atributos}</p>
                    <p class="precio">$${precio}</p>
                    <button class="btn btn-agregar" onclick="agregarAlCarrito(${producto.id})">
                        Añadir al carrito
                    </button>
                </div>
            </article>
        `;
    });
}

mostrarProductos();

function agregarAlCarrito(id) {
    const producto = productos.find(function(p) { return p.id === id; });
    if (!producto) return;

    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const existente = carrito.find(function(p) { return p.id === id; });

    if (existente) {
        existente.cantidad += 1;
    } else {
        carrito.push({ ...producto, cantidad: 1 });
    }

    localStorage.setItem('carrito', JSON.stringify(carrito));
    alert(`"${producto.nombre}" añadido al carrito.`);
}