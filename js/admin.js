const regionesComunas = [
    {
        region: "Región Metropolitana",
        comunas: ["Santiago", "Providencia", "Maipú", "Las Condes", "Estación Central"]
    },
    {
        region: "Región de Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana"]
    },
    {
        region: "Región del Biobío",
        comunas: ["Concepción", "Talcahuano", "San Pedro de la Paz", "Los Ángeles"]
    }
];

document.addEventListener("DOMContentLoaded", function () {

    /* PROTEGER PÁGINA */
    if (!verificarAccesoPagina()) return;

    /* PRODUCTOS */
    const formProducto = document.getElementById("form-producto");
    if (formProducto) formProducto.addEventListener("submit", validarProducto);

    /* EDITAR PRODUCTO */
    const codigoOriginal = document.getElementById("codigo-original");

    if (
        codigoOriginal &&
        window.location.pathname.includes("editar-producto.html")
    ) {
        cargarProductoEditar();
    }

    /* TABLA PRODUCTOS */
    const tablaProductos = document.getElementById("tabla-productos");

    if (tablaProductos) {
        inicializarProductos();
        mostrarProductos();
    }


    /* USUARIOS */
    const formUsuario = document.getElementById("form-usuario");
    if (formUsuario) formUsuario.addEventListener("submit", validarUsuario);

    const tablaUsuarios = document.getElementById("tabla-usuarios");
    if (tablaUsuarios) mostrarUsuarios();


    /* REGIÓN Y COMUNA */
    const regionUsuario = document.getElementById("region-usuario");

    if (regionUsuario) {
        cargarRegiones();
        regionUsuario.addEventListener("change", cargarComunas);
    }


    /* EDITAR USUARIO */
    const runOriginal = document.getElementById("run-original");

    if (
        runOriginal &&
        window.location.pathname.includes("editar-usuario.html")
    ) {
        cargarUsuarioEditar();
    }

    const btnCerrarSesion = document.getElementById("cerrar-sesion");

    if (btnCerrarSesion) {
    btnCerrarSesion.addEventListener("click", function (evento) {
        evento.preventDefault();
        cerrarSesion();
    });

    }

    /* PERMISOS */
    aplicarPermisos();
});


/* =========================================================
   FUNCIONES GENERALES
========================================================= */

function mostrarError(idError) {
    const error = document.getElementById(idError);
    if (error) error.classList.add("visible");
}

function ocultarError(idError) {
    const error = document.getElementById(idError);
    if (error) error.classList.remove("visible");
}


/* =========================================================
   PRODUCTOS
========================================================= */

function validarProducto(evento) {
    evento.preventDefault();

    let formularioValido = true;

    const codigo = document.getElementById("codigo-prod").value.trim();
    const nombre = document.getElementById("nombre-prod").value.trim();
    const descripcion = document.getElementById("desc-prod").value.trim();
    const precioTexto = document.getElementById("precio-prod").value;
    const stockTexto = document.getElementById("stock-prod").value;
    const stockCriticoTexto = document.getElementById("stock-critico-prod").value;
    const categoria = document.getElementById("categoria-prod").value;
    const imagenInput = document.getElementById("imagen-prod");


    /* CÓDIGO */

    if (codigo === "" || codigo.length < 3) {
        mostrarError("error-codigo-prod");
        formularioValido = false;
    } else {
        ocultarError("error-codigo-prod");
    }


    /* NOMBRE */

    if (nombre === "" || nombre.length > 100) {
        mostrarError("error-nombre-prod");
        formularioValido = false;
    } else {
        ocultarError("error-nombre-prod");
    }


    /* DESCRIPCIÓN */

    if (descripcion.length > 500) {
        mostrarError("error-desc-prod");
        formularioValido = false;
    } else {
        ocultarError("error-desc-prod");
    }


    /* PRECIO */

    const precio = Number(precioTexto);

    if (precioTexto === "" || isNaN(precio) || precio < 0) {
        mostrarError("error-precio-prod");
        formularioValido = false;
    } else {
        ocultarError("error-precio-prod");
    }


    /* STOCK */

    const stock = Number(stockTexto);

    if (stockTexto === "" || stock < 0 || !Number.isInteger(stock)) {
        mostrarError("error-stock-prod");
        formularioValido = false;
    } else {
        ocultarError("error-stock-prod");
    }


    /* STOCK CRÍTICO */

    let stockCritico = null;

    if (stockCriticoTexto !== "") {

        stockCritico = Number(stockCriticoTexto);

        if (
            stockCritico < 0 ||
            !Number.isInteger(stockCritico)
        ) {
            mostrarError("error-stock-critico-prod");
            formularioValido = false;

        } else {
            ocultarError("error-stock-critico-prod");
        }

    } else {
        ocultarError("error-stock-critico-prod");
    }


    /* CATEGORÍA */

    if (categoria === "") {
        mostrarError("error-categoria-prod");
        formularioValido = false;
    } else {
        ocultarError("error-categoria-prod");
    }


    /* ALERTA STOCK */

    const alertaStock =
        document.getElementById("alerta-stock");

    if (alertaStock) {

        alertaStock.textContent =
            stockCritico !== null &&
            stockTexto !== "" &&
            stock <= stockCritico

                ? "⚠ El producto se encuentra en nivel de stock crítico."
                : "";
    }


    if (!formularioValido) return;


    /* SABER SI ESTAMOS EDITANDO */

    const codigoOriginalInput =
        document.getElementById("codigo-original");

    const imagenAnteriorInput =
        document.getElementById("imagen-anterior");


    /* IMAGEN */

    let imagen = "";

    if (
        imagenInput &&
        imagenInput.files.length > 0
    ) {

        imagen =
            imagenInput.files[0].name;

    } else if (imagenAnteriorInput) {

        imagen =
            imagenAnteriorInput.value;
    }


    /* OBJETO PRODUCTO */

    const producto = {
        codigo: codigo,
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        stock: stock,
        stockCritico: stockCritico,
        categoria: categoria,
        imagen: imagen
    };


    /* EDITAR */

 if (codigoOriginalInput) {

    const actualizado =
        actualizarProducto(
            codigoOriginalInput.value,
            producto
        );

    if (!actualizado) return;

    alert(
        "Producto actualizado correctamente"
    );

} else {

    guardarProducto(producto);

    alert(
        "Producto guardado correctamente"
    );
}


    window.location.href =
        "productos.html";
}


function inicializarProductos() {
    const productos = JSON.parse(localStorage.getItem("productosAdmin"));

    if (productos !== null) return;

    const productosIniciales = [
        {
            codigo: "001",
            nombre: "Laptop Ultrabook Pro",
            descripcion: "Notebook de alto rendimiento",
            precio: 599990,
            stock: 12,
            stockCritico: 5,
            categoria: "Notebooks",
            imagen: ""
        },
        {
            codigo: "002",
            nombre: "Smartphone Galaxy X",
            descripcion: "Smartphone de última generación",
            precio: 399990,
            stock: 8,
            stockCritico: 3,
            categoria: "Smartphone",
            imagen: ""
        },
        {
            codigo: "003",
            nombre: "Audífonos Bluetooth",
            descripcion: "Audífonos inalámbricos",
            precio: 49990,
            stock: 25,
            stockCritico: 5,
            categoria: "Audio",
            imagen: ""
        }
    ];

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(productosIniciales)
    );
}


function guardarProducto(producto) {
    const productos =
        JSON.parse(localStorage.getItem("productosAdmin")) || [];

    productos.push(producto);

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(productos)
    );
}


function mostrarProductos() {
    const tabla = document.getElementById("tabla-productos");

    if (!tabla) return;

    const productos =
        JSON.parse(localStorage.getItem("productosAdmin")) || [];

    tabla.innerHTML = "";

    if (productos.length === 0) {
        tabla.innerHTML =
            '<tr><td colspan="6">No hay productos registrados.</td></tr>';

        return;
    }

    productos.forEach(function (producto) {
        const fila = document.createElement("tr");

        fila.innerHTML = `
            <td>${producto.codigo}</td>
            <td>${producto.nombre}</td>
            <td>$${Number(producto.precio).toLocaleString("es-CL")}</td>
            <td>${producto.stock}</td>
            <td>${producto.categoria}</td>

            <td>
                <a
                    href="editar-producto.html?codigo=${producto.codigo}"
                    class="btn btn-secundario accion-administrador"
                    style="padding:0.3rem 0.8rem; font-size:0.85rem;"
                >
                    ✏️ Editar
                </a>

                <button
                    type="button"
                    class="btn btn-eliminar accion-administrador"
                    onclick="eliminarProducto('${producto.codigo}')"
                >
                    🗑️ Eliminar
                </button>
            </td>
        `;

        tabla.appendChild(fila);
    });
}


function eliminarProducto(codigo) {
    let productos =
        JSON.parse(localStorage.getItem("productosAdmin")) || [];

    const confirmar =
        confirm("¿Estás seguro de que deseas eliminar este producto?");

    if (!confirmar) return;

    productos = productos.filter(function (producto) {
        return producto.codigo !== codigo;
    });

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(productos)
    );

    mostrarProductos();
    aplicarPermisos();

    alert("Producto eliminado correctamente");
}


/* =========================================================
   USUARIOS
========================================================= */

function validarRun(run) {
    run = run.toUpperCase().trim();

    if (run.length < 7 || run.length > 9) {
        return false;
    }

    const cuerpo = run.slice(0, -1);
    const dv = run.slice(-1);

    if (!/^\d+$/.test(cuerpo)) {
        return false;
    }

    if (!/^[0-9K]$/.test(dv)) {
        return false;
    }

    let suma = 0;
    let multiplicador = 2;

    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += Number(cuerpo[i]) * multiplicador;

        multiplicador =
            multiplicador === 7
                ? 2
                : multiplicador + 1;
    }

    const resultado = 11 - (suma % 11);

    const dvCalculado =
        resultado === 11
            ? "0"
            : resultado === 10
            ? "K"
            : String(resultado);

    return dv === dvCalculado;
}


function runDuplicado(run, runOriginal = null) {
    const usuarios =
        JSON.parse(localStorage.getItem("usuariosAdmin")) || [];

    if (
        runOriginal !== null &&
        run === runOriginal
    ) {
        return false;
    }

    return usuarios.some(function (usuario) {
        return usuario.run === run;
    });
}


function correoPermitido(correo) {
    const regex =
        /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;

    return regex.test(correo);
}


function validarUsuario(evento) {
    evento.preventDefault();

    let formularioValido = true;

    const run =document.getElementById("run-usuario").value.trim().toUpperCase();
    const nombre =document.getElementById("nombre-usuario").value.trim();
    const apellidos =document.getElementById("apellidos-usuario").value.trim();
    const correo =document.getElementById("correo-usuario").value.trim();
    const password = document.getElementById("password-usuario").value;
    const fechaNacimiento =document.getElementById("fecha-usuario").value;
    const tipoUsuario =document.getElementById("tipo-usuario").value;
    const region =document.getElementById("region-usuario").value;
    const comuna =document.getElementById("comuna-usuario").value;
    const direccion =document.getElementById("direccion-usuario").value.trim();
    const runOriginalInput =document.getElementById("run-original");
    const runOriginal =runOriginalInput? runOriginalInput.value: null;


    /* VALIDACIÓN RUN */
    if (!validarRun(run)) {
        mostrarError("error-run-usuario");
        ocultarError("error-run-duplicado");

        formularioValido = false;

    } else {
        ocultarError("error-run-usuario");

        if (runDuplicado(run, runOriginal)) {
            mostrarError("error-run-duplicado");

            formularioValido = false;

        } else {
            ocultarError("error-run-duplicado");
        }
    }


    /* VALIDACIÓN NOMBRE */
    if (
        nombre === "" ||
        nombre.length > 50
    ) {
        mostrarError("error-nombre-usuario");

        formularioValido = false;

    } else {
        ocultarError("error-nombre-usuario");
    }


    /* VALIDACIÓN APELLIDOS */
    if (
        apellidos === "" ||
        apellidos.length > 100
    ) {
        mostrarError("error-apellidos-usuario");

        formularioValido = false;

    } else {
        ocultarError("error-apellidos-usuario");
    }


    /* VALIDACIÓN CORREO */
    if (
        correo === "" ||
        correo.length > 100 ||
        !correoPermitido(correo)
    ) {
        mostrarError("error-correo-usuario");

        formularioValido = false;

    } else {
        ocultarError("error-correo-usuario");
    }

    // VALIDACIÓN CONTRASEÑA

    if (password.length < 4 || password.length > 10) {
        mostrarError("error-password-usuario");

        formularioValido = false;

    } else {
        ocultarError("error-password-usuario");
    }





    /* VALIDACIÓN DIRECCIÓN */
    if (
        direccion === "" ||
        direccion.length > 300
    ) {
        mostrarError("error-direccion-usuario");

        formularioValido = false;

    } else {
        ocultarError("error-direccion-usuario");
    }


    if (!formularioValido) return;


    const usuario = {
        run: run,
        nombre: nombre,
        apellidos: apellidos,
        correo: correo,
        password: password,
        fechaNacimiento: fechaNacimiento,
        tipo: tipoUsuario,
        region: region,
        comuna: comuna,
        direccion: direccion
    };


    /* EDITAR */
    if (runOriginalInput) {
        actualizarUsuario(
            runOriginal,
            usuario
        );

        alert(
            "Usuario actualizado correctamente"
        );

    }

    /* AGREGAR */
    else {
        guardarUsuario(
            usuario
        );

        alert(
            "Usuario guardado correctamente"
        );
    }


    window.location.href =
        "usuarios.html";
}


/* =========================================================
   REGIÓN Y COMUNA
========================================================= */

function cargarRegiones() {
    const selectRegion =
        document.getElementById("region-usuario");

    if (!selectRegion) return;

    selectRegion.innerHTML =
        '<option value="">Selecciona región</option>';

    regionesComunas.forEach(function (item) {
        const opcion =
            document.createElement("option");

        opcion.value =
            item.region;

        opcion.textContent =
            item.region;

        selectRegion.appendChild(
            opcion
        );
    });
}


function cargarComunas() {
    const selectRegion =
        document.getElementById("region-usuario");

    const selectComuna =
        document.getElementById("comuna-usuario");

    if (!selectRegion || !selectComuna) {
        return;
    }

    selectComuna.innerHTML =
        '<option value="">Selecciona comuna</option>';

    const regionEncontrada =
        regionesComunas.find(
            function (item) {
                return (
                    item.region ===
                    selectRegion.value
                );
            }
        );

    if (!regionEncontrada) {
        return;
    }

    regionEncontrada.comunas.forEach(
        function (comuna) {
            const opcion =
                document.createElement(
                    "option"
                );

            opcion.value =
                comuna;

            opcion.textContent =
                comuna;

            selectComuna.appendChild(
                opcion
            );
        }
    );
}


/* =========================================================
   GUARDAR USUARIO
========================================================= */

function guardarUsuario(usuario) {
    const usuarios =
        JSON.parse(
            localStorage.getItem(
                "usuariosAdmin"
            )
        ) || [];

    usuarios.push(
        usuario
    );

    localStorage.setItem(
        "usuariosAdmin",
        JSON.stringify(
            usuarios
        )
    );
}


/* =========================================================
   MOSTRAR USUARIOS
========================================================= */

function mostrarUsuarios() {
    const tabla =
        document.getElementById(
            "tabla-usuarios"
        );

    if (!tabla) return;

    const usuarios =
        JSON.parse(
            localStorage.getItem(
                "usuariosAdmin"
            )
        ) || [];

    tabla.innerHTML = "";

    if (usuarios.length === 0) {
        tabla.innerHTML =
            '<tr><td colspan="6">No hay usuarios registrados.</td></tr>';

        return;
    }

    usuarios.forEach(
        function (usuario) {

            const fila =
                document.createElement(
                    "tr"
                );

            fila.innerHTML = `
                <td>${usuario.run}</td>
                <td>${usuario.nombre}</td>
                <td>${usuario.apellidos}</td>
                <td>${usuario.correo}</td>
                <td>${usuario.tipo}</td>

                <td>
                    <a
                        href="editar-usuario.html?run=${usuario.run}"
                        class="btn btn-secundario accion-administrador"
                    >
                        ✏️ Editar
                    </a>

                    <button
                        type="button"
                        class="btn btn-eliminar accion-administrador"
                        onclick="eliminarUsuario('${usuario.run}')"
                    >
                        🗑️ Eliminar
                    </button>
                </td>
            `;

            tabla.appendChild(
                fila
            );
        }
    );
}


/* =========================================================
   ELIMINAR USUARIO
========================================================= */

function eliminarUsuario(run) {
    let usuarios =
        JSON.parse(
            localStorage.getItem(
                "usuariosAdmin"
            )
        ) || [];

    const confirmar =
        confirm(
            "¿Estás seguro de que deseas eliminar este usuario?"
        );

    if (!confirmar) return;

    usuarios =
        usuarios.filter(
            function (usuario) {
                return usuario.run !== run;
            }
        );

    localStorage.setItem(
        "usuariosAdmin",
        JSON.stringify(
            usuarios
        )
    );

    mostrarUsuarios();
    aplicarPermisos();

    alert(
        "Usuario eliminado correctamente"
    );
}


/* =========================================================
   CARGAR USUARIO PARA EDITAR
========================================================= */

function cargarUsuarioEditar() {
    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const run =
        parametros.get("run");

    if (!run) return;


    const usuarios =
        JSON.parse(
            localStorage.getItem(
                "usuariosAdmin"
            )
        ) || [];


    const usuario =
        usuarios.find(
            function (item) {
                return item.run === run;
            }
        );


    if (!usuario) {
        alert(
            "Usuario no encontrado"
        );

        window.location.href =
            "usuarios.html";

        return;
    }


    document.getElementById( "run-original").value =usuario.run;
    document.getElementById("run-usuario").value =usuario.run;
    document.getElementById("nombre-usuario").value =usuario.nombre;
    document.getElementById("apellidos-usuario").value =usuario.apellidos;
    document.getElementById( "correo-usuario").value =usuario.correo;
    document.getElementById("password-usuario").value =usuario.password || "";
    document.getElementById("fecha-usuario").value =usuario.fechaNacimiento || "";
    document.getElementById("tipo-usuario").value =usuario.tipo;
    document.getElementById("region-usuario").value =usuario.region;


    cargarComunas();


    document.getElementById("comuna-usuario").value =usuario.comuna;
    document.getElementById("direccion-usuario").value =usuario.direccion;
}


/* =========================================================
   ACTUALIZAR USUARIO
========================================================= */

function actualizarUsuario(
    runOriginal,
    usuarioActualizado
) {

    const usuarios =
        JSON.parse(
            localStorage.getItem(
                "usuariosAdmin"
            )
        ) || [];


    const indice =
        usuarios.findIndex(
            function (usuario) {
                return (
                    usuario.run ===
                    runOriginal
                );
            }
        );


    if (indice === -1) {
        alert(
            "No se encontró el usuario a modificar"
        );

        return;
    }


    usuarios[indice] =
        usuarioActualizado;


    localStorage.setItem(
        "usuariosAdmin",
        JSON.stringify(
            usuarios
        )
    );
}

function cargarProductoEditar() {

    const parametros =
        new URLSearchParams(
            window.location.search
        );

    const codigo =
        parametros.get("codigo");


    if (!codigo) return;


    const productos =
        JSON.parse(
            localStorage.getItem(
                "productosAdmin"
            )
        ) || [];


    const producto =
        productos.find(
            function (item) {
                return item.codigo === codigo;
            }
        );


    if (!producto) {

        alert(
            "Producto no encontrado"
        );

        window.location.href =
            "productos.html";

        return;
    }


    document.getElementById("codigo-original").value =
        producto.codigo;

    document.getElementById("codigo-prod").value =
        producto.codigo;

    document.getElementById("nombre-prod").value =
        producto.nombre;

    document.getElementById("desc-prod").value =
        producto.descripcion || "";

    document.getElementById("precio-prod").value =
        producto.precio;

    document.getElementById("stock-prod").value =
        producto.stock;

    document.getElementById("stock-critico-prod").value =
        producto.stockCritico ?? "";

    document.getElementById("categoria-prod").value =
        producto.categoria;

    document.getElementById("imagen-anterior").value =
        producto.imagen || "";
}

function actualizarProducto(codigoOriginal, productoActualizado) {

    const productos =
        JSON.parse(localStorage.getItem("productosAdmin")) || [];

    const indice = productos.findIndex(function (producto) {
        return producto.codigo === codigoOriginal;
    });

    if (indice === -1) {
        alert("No se encontró el producto a modificar");
        return false;
    }

    productos[indice] = productoActualizado;

    localStorage.setItem(
        "productosAdmin",
        JSON.stringify(productos)
    );

    return true;
}

function verificarAccesoPagina() {

    const rol = localStorage.getItem("rolActual");
    const pagina = window.location.pathname.split("/").pop();

    /* NO HAY SESIÓN */
    if (!rol) {
        alert("Debes iniciar sesión para acceder al panel.");
        window.location.href = "../login.html";
        return false;
    }

    const rolNormalizado = rol.toLowerCase();

    /* CLIENTE */
    if (rolNormalizado === "cliente") {
        window.location.href = "../index.html";
        return false;
    }

    /* PÁGINAS PERMITIDAS */
    const permisosPaginas = {

        "index.html": ["administrador"],

        "productos.html": [
            "administrador",
            "vendedor"
        ],

        "agregar-producto.html": [
            "administrador"
        ],

        "editar-producto.html": [
            "administrador"
        ],

        "usuarios.html": [
            "administrador"
        ],

        "agregar-usuario.html": [
            "administrador"
        ],

        "editar-usuario.html": [
            "administrador"
        ],

        "pedidos.html": [
            "administrador",
            "vendedor"
        ]
    };


    const rolesPermitidos =
        permisosPaginas[pagina];


    /* SI LA PÁGINA NO ESTÁ REGISTRADA */
    if (!rolesPermitidos) {
        return true;
    }


    /* NO TIENE PERMISO */
    if (!rolesPermitidos.includes(rolNormalizado)) {

        alert(
            "No tienes permisos para acceder a esta página."
        );

        if (rolNormalizado === "vendedor") {
            window.location.href =
                "productos.html";
        }

        return false;
    }


    return true;
}

/* =========================================================
   PERMISOS
========================================================= */

function aplicarPermisos() {
    const rol =
        localStorage.getItem(
            "rolActual"
        );

    if (!rol) return;


    const rolNormalizado =
        rol.toLowerCase();


    /* CLIENTE */
    if (
        rolNormalizado ===
        "cliente"
    ) {

        window.location.href =
            "../index.html";

        return;
    }


    /* OPCIONES DEL MENÚ */
    const opciones =
        document.querySelectorAll(
            "[data-permiso]"
        );


    opciones.forEach(
        function (opcion) {

            const permisos =
                opcion.dataset.permiso
                    .toLowerCase()
                    .split(/\s+/);


            if (
                !permisos.includes(
                    rolNormalizado
                )
            ) {

                opcion.style.display =
                    "none";
            }

        }
    );


    /* VENDEDOR */
    if (
        rolNormalizado ===
        "vendedor"
    ) {

        const accionesAdmin =
            document.querySelectorAll(
                ".accion-administrador"
            );


        accionesAdmin.forEach(
            function (accion) {

                accion.style.display =
                    "none";
            }
        );
    }
}

function cerrarSesion() {

    localStorage.removeItem("rolActual");
    localStorage.removeItem("usuarioActual");

    alert("Sesión cerrada correctamente.");

    window.location.href = "../login.html";
}