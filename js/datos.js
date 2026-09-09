const PRODUCTOS_BASE=[ {
    codigo:"TEC001", nombre:"Laptop Ultrabook Pro", descripcion:"Notebook liviano para estudio, desarrollo y productividad. Intel Core i7, 16 GB RAM y SSD 512 GB.",
    precio:899990, stock:8, stockCritico:3, categoria:"Computación", imagen:"img/laptop.svg"
}
, {
    codigo:"TEC002", nombre:"Smartphone Galaxy X", descripcion:"Smartphone 5G con pantalla AMOLED de 6.7 pulgadas y 128 GB de almacenamiento.",
    precio:499990, stock:12, stockCritico:4, categoria:"Telefonía", imagen:"img/smartphone.svg"
}
, {
    codigo:"TEC003", nombre:"Audífonos Noise Pro", descripcion:"Audífonos Bluetooth con cancelación activa de ruido y autonomía aproximada de 30 horas.",
    precio:129990, stock:4, stockCritico:5, categoria:"Accesorios", imagen:"img/audifonos.svg"
}
, {
    codigo:"TEC004", nombre:"Tablet ProPad 11", descripcion:"Tablet de 11 pulgadas, 256 GB, WiFi 6 y compatibilidad con stylus.",
    precio:349990, stock:6, stockCritico:2, categoria:"Tablets", imagen:"img/tablet.svg"
}
, {
    codigo:"TEC005", nombre:"Monitor Vision 27", descripcion:"Monitor IPS Full HD de 27 pulgadas, 100 Hz y diseño de bordes delgados.",
    precio:189990, stock:7, stockCritico:2, categoria:"Monitores", imagen:"img/monitor.svg"
}
, {
    codigo:"TEC006", nombre:"Teclado Mechanical K", descripcion:"Teclado mecánico RGB con switches táctiles y conexión USB-C.",
    precio:79990, stock:15, stockCritico:5, categoria:"Accesorios", imagen:"img/teclado.svg"
}
];
const USUARIOS_BASE=[ {
    run:"111111111", nombre:"Admin", apellidos:"TechStore", correo:"admin@duoc.cl", password:"1234", fechaNacimiento:"",
    tipo:"Administrador", region:"Región Metropolitana de Santiago", comuna:"Santiago", direccion:"Av. Providencia 1234"
}
, {
    run:"222222222", nombre:"Vendedor", apellidos:"TechStore", correo:"vendedor@duoc.cl", password:"1234",
    fechaNacimiento:"", tipo:"Vendedor", region:"Región Metropolitana de Santiago", comuna:"Santiago", direccion:"Av. Providencia 1234"
}
, {
    run:"333333333", nombre:"Cliente", apellidos:"Demo", correo:"cliente@gmail.com", password:"1234", fechaNacimiento:"",
    tipo:"Cliente", region:"Región Metropolitana de Santiago", comuna:"Santiago", direccion:"Av. Providencia 1234"
}
];
const PEDIDOS_BASE=[ {
    id:"PED001", cliente:"Ana Pérez", fecha:"2026-09-05", total:579980, estado:"Preparando", items:["Smartphone Galaxy X",
    "Teclado Mechanical K"]
}
, {
    id:"PED002", cliente:"Luis Soto", fecha:"2026-09-06", total:899990, estado:"Pagado", items:["Laptop Ultrabook Pro"]
}
, {
    id:"PED003", cliente:"Camila Díaz", fecha:"2026-09-07", total:319980, estado:"Despachado", items:["Monitor Vision 27",
    "Audífonos Noise Pro"]
}
];
function inicializarDatos() {
    if (!localStorage.getItem("productosAdmin"))localStorage.setItem("productosAdmin", JSON.stringify(PRODUCTOS_BASE));
    if (!localStorage.getItem("usuariosAdmin"))localStorage.setItem("usuariosAdmin", JSON.stringify(USUARIOS_BASE));
    if (!localStorage.getItem("pedidosAdmin"))localStorage.setItem("pedidosAdmin", JSON.stringify(PEDIDOS_BASE));
}

function obtenerProductos() {
    inicializarDatos();
    return JSON.parse(localStorage.getItem("productosAdmin"))||[];
}

function guardarProductos(lista) {
    localStorage.setItem("productosAdmin", JSON.stringify(lista));
}

function obtenerUsuarios() {
    inicializarDatos();
    return JSON.parse(localStorage.getItem("usuariosAdmin"))||[];
}

function guardarUsuarios(lista) {
    localStorage.setItem("usuariosAdmin", JSON.stringify(lista));
}

function formatoCLP(valor) {
    return new Intl.NumberFormat("es-CL", {
        style:"currency", currency:"CLP", maximumFractionDigits:0
    }
    ).format(Number(valor)||0);
}
inicializarDatos();
