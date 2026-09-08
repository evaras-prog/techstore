
//Validaciones de formularios
//Muestra el mensaje de error de un campo
function mostrarError(id){
    const error = document.getElementById(id);
    if (error) error.classList.add('visible');
}

//Oculta el mensaje de error de un campo
function ocultarError(id){
    const error = document.getElementById(id);
    if (error) error.classList.remove('visible');
}

//Valida que el email tenga formato correcto
function esEmailValido(email){
    const regex = /^[^\s@]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/i;;
    return regex.test(email);
}

//Formulario de Registro
function validarFormRegistro(event){
    event.preventDefault();
    let valido = true;

    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();
    const email = document.getElementById('email').value.trim();
    const telefono = document.getElementById('telefono').value.trim();
    const password = document.getElementById('password').value;
    const confirmar = document.getElementById('confirmar').value;

    if (nombre === ''){
        mostrarError('error-nombre'); valido = false;

    } else {ocultarError('error-nombre');}

    if (apellido === ''){
        mostrarError('error-apellido'); valido = false;
    } else {ocultarError('error-apellido');}

    if (email === "" ||email.length > 100 || !esEmailValido(email)) {
        mostrarError('error-email'); valido = false;
    } else { ocultarError('error-email'); }

    if (telefono.length < 9) {
        mostrarError('error-telefono'); valido = false;
    } else { ocultarError('error-telefono'); }

    if (password.length < 4 || password.length > 10) {
        mostrarError('error-password'); valido = false;
    } else { ocultarError('error-password'); }

    if (confirmar === "" || confirmar !== password) {
        mostrarError('error-confirmar'); valido = false;
    } else { ocultarError('error-confirmar'); }

    if (valido) {
        alert('¡Cuenta creada con éxito! Bienvenido a TechStore.');
        event.target.reset();
    }
}

//Formulario de Login
function validarFormLogin(event){
    event.preventDefault();
    let valido = true;

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (email === "" ||email.length > 100 ||!esEmailValido(email)){
        mostrarError('error-email');
        valido = false;
    } else {
        ocultarError('error-email');
    }

    if (password.length < 4 || password.length > 10){
        mostrarError('error-password');
        valido = false;
    } else {
        ocultarError('error-password');

    }

        if (!valido) return;


    // OBTENER USUARIOS GUARDADOS 
    const usuarios =
        JSON.parse(localStorage.getItem("usuariosAdmin")) || [];


    // BUSCAR CORREO Y CONTRASEÑA 
    const usuarioEncontrado = usuarios.find(function (usuario) {

        return (
            usuario.correo.toLowerCase() === email.toLowerCase() &&
            usuario.password === password
        );

    });


    //  DATOS INCORRECTOS 
    if (!usuarioEncontrado) {
        mostrarError("error-login");
        return;
    }

    ocultarError("error-login");


    // GUARDAR USUARIO Y ROL ACTUAL 
    localStorage.setItem(
        "usuarioActual",
        JSON.stringify(usuarioEncontrado)
    );

    localStorage.setItem(
        "rolActual",
        usuarioEncontrado.tipo
    );


    alert(
        "Bienvenido " +
        usuarioEncontrado.nombre +
        " a TechStore"
    );


    //  REDIRECCIÓN SEGÚN ROL 

    if (usuarioEncontrado.tipo === "Administrador") {

        window.location.href =
            "admin/index.html";

    } else if (usuarioEncontrado.tipo === "Vendedor") {

        window.location.href =
            "admin/productos.html";

    } else {

        window.location.href =
            "index.html";
    }

    if (valido){
        alert('Bienvenido de vuelta a TechStore');
        event.target.reset();
    }
}


//Formulario de contacto
function validarFormContacto(event){
    event.preventDefault();
    let valido = true;

    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const asunto = document.getElementById('asunto').value;
    const mensaje = document.getElementById('mensaje').value.trim();

    if (nombre === "" || nombre.length > 100) {
        mostrarError('error-nombre');
        valido = false;
    } else {
        ocultarError('error-nombre');
    }

    if (email.length > 100 || !esEmailValido(email)) {
        mostrarError('error-email');
        valido = false;
    } else {
        ocultarError('error-email');
    }

    if (asunto === '') {
        mostrarError('error-asunto');
        valido = false;
    } else {
        ocultarError('error-asunto');
    }

    if (mensaje === "" || mensaje.length > 500) {
        mostrarError('error-mensaje');
        valido = false;
    } else {
        ocultarError('error-mensaje');
    }

    if (valido) {
        alert('¡Mensaje enviado! Te responderemos pronto.');
        event.target.reset();
    }
}


//Event Listeners
const formRegistro = document.getElementById('form-registro');
if (formRegistro) formRegistro.addEventListener('submit', validarFormRegistro);
const formLogin = document.getElementById('form-login');
if (formLogin) formLogin.addEventListener('submit', validarFormLogin);
const formContacto = document.getElementById('form-contacto');
if (formContacto) formContacto.addEventListener('submit', validarFormContacto)