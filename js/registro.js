const regiones = [
    {
        nombre: "Región Metropolitana",
        comunas: ["Santiago", "Providencia", "Las Condes", "Maipú", "La Florida",
                  "Pudahuel", "Peñalolén", "Ñuñoa", "San Bernardo", "Puente Alto"]
    },
    {
        nombre: "Región de Valparaíso",
        comunas: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio"]
    },
    {
        nombre: "Región del Biobío",
        comunas: ["Concepción", "Talcahuano", "Chillán", "Los Ángeles", "Coronel"]
    },
    {
        nombre: "Región de La Araucanía",
        comunas: ["Temuco", "Padre Las Casas", "Angol", "Victoria", "Villarrica"]
    },
    {
        nombre: "Región de Los Lagos",
        comunas: ["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas"]
    }
];

// Llenar los selects de región y comuna
function cargarRegiones() {
    const selectRegion = document.getElementById('region');
    const selectComuna = document.getElementById('comuna');
    if (!selectRegion) return;

    regiones.forEach(function(r) {
        const option = document.createElement('option');
        option.value = r.nombre;
        option.textContent = r.nombre;
        selectRegion.appendChild(option);
    });

    selectRegion.addEventListener('change', function() {
        selectComuna.innerHTML = '<option value="">-- Selecciona una comuna --</option>';
        const regionSeleccionada = regiones.find(function(r) {
            return r.nombre === selectRegion.value;
        });
        if (regionSeleccionada) {
            regionSeleccionada.comunas.forEach(function(c) {
                const option = document.createElement('option');
                option.value = c;
                option.textContent = c;
                selectComuna.appendChild(option);
            });
            selectComuna.disabled = false;
        } else {
            selectComuna.disabled = true;
        }
    });
}

cargarRegiones();

// Validación del RUN con dígito verificador
function validarRun(run) {
    run = run.replace(/\./g, '').replace(/-/g, '').toUpperCase();
    if (run.length < 2) return false;

    const digito = run.slice(-1);
    const cuerpo = run.slice(0, -1);
    if (!/^\d+$/.test(cuerpo)) return false;

    let suma = 0;
    let multiplicador = 2;
    for (let i = cuerpo.length - 1; i >= 0; i--) {
        suma += parseInt(cuerpo[i]) * multiplicador;
        multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
    }
    const resto = suma % 11;
    const dvEsperado = 11 - resto === 11 ? '0' : 11 - resto === 10 ? 'K' : String(11 - resto);

    return digito === dvEsperado;
}

// Validación del formulario completo
function validarFormRegistro(event) {
    event.preventDefault();
    let valido = true;

    const nombre = document.getElementById('nombre').value.trim();
    const apellidos = document.getElementById('apellidos').value.trim();
    const run = document.getElementById('run').value.trim();
    const email = document.getElementById('email').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const region = document.getElementById('region').value;
    const comuna = document.getElementById('comuna').value;
    const tipoUsuario = document.getElementById('tipo-usuario').value;
    const password = document.getElementById('password').value;
    const confirmar = document.getElementById('confirmar').value;

    if (nombre === '') {
        document.getElementById('error-nombre').style.display = 'block';
        valido = false;
    } else {
        document.getElementById('error-nombre').style.display = 'none';
    }

    if (apellidos === '') {
        document.getElementById('error-apellidos').style.display = 'block';
        valido = false;
    } else {
        document.getElementById('error-apellidos').style.display = 'none';
    }

    if (!validarRun(run)) {
        document.getElementById('error-run').style.display = 'block';
        valido = false;
    } else {
        document.getElementById('error-run').style.display = 'none';
    }

    if (!esEmailValido(email) || !esEmailPermitido(email)) {
        document.getElementById('error-email').style.display = 'block';
        valido = false;
    } else {
        document.getElementById('error-email').style.display = 'none';
    }

    if (direccion === '') {
        document.getElementById('error-direccion').style.display = 'block';
        valido = false;
    } else {
        document.getElementById('error-direccion').style.display = 'none';
    }

    if (region === '') {
        document.getElementById('error-region').style.display = 'block';
        valido = false;
    } else {
        document.getElementById('error-region').style.display = 'none';
    }

    if (comuna === '') {
        document.getElementById('error-comuna').style.display = 'block';
        valido = false;
    } else {
        document.getElementById('error-comuna').style.display = 'none';
    }

    if (tipoUsuario === '') {
        document.getElementById('error-tipo-usuario').style.display = 'block';
        valido = false;
    } else {
        document.getElementById('error-tipo-usuario').style.display = 'none';
    }

    if (password.length < 4 || password.length > 10) {
        document.getElementById('error-password').style.display = 'block';
        valido = false;
    } else {
        document.getElementById('error-password').style.display = 'none';
    }

    if (confirmar !== password) {
        document.getElementById('error-confirmar').style.display = 'block';
        valido = false;
    } else {
        document.getElementById('error-confirmar').style.display = 'none';
    }

    if (valido) {
        alert('Cuenta creada exitosamente. ¡Bienvenido a TechStore!');
        event.target.reset();
        document.getElementById('comuna').disabled = true;
    }
}

document.getElementById('form-registro').addEventListener('submit', validarFormRegistro);
