const regionesComunas=[ {
    region:"Región de Arica y Parinacota", comunas:["Arica", "Camarones", "Putre", "General Lagos"]
}
, {
    region:"Región de Tarapacá", comunas:["Iquique", "Alto Hospicio", "Pozo Almonte", "Pica", "Huara"]
}
, {
    region:"Región de Antofagasta", comunas:["Antofagasta", "Calama", "Tocopilla", "Mejillones", "Taltal",
    "San Pedro de Atacama"]
}
, {
    region:"Región de Atacama", comunas:["Copiapó", "Caldera", "Tierra Amarilla", "Vallenar", "Chañaral"]
}
, {
    region:"Región de Coquimbo", comunas:["La Serena", "Coquimbo", "Ovalle", "Illapel", "Los Vilos", "Vicuña"]
}
, {
    region:"Región de Valparaíso", comunas:["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "San Antonio",
    "Quillota", "Los Andes", "San Felipe"]
}
, {
    region:"Región Metropolitana de Santiago", comunas:["Santiago", "Providencia", "Las Condes", "Ñuñoa",
    "Maipú", "Puente Alto", "La Florida", "Estación Central", "Quilicura", "Pudahuel"]
}
, {
    region:"Región del Libertador General Bernardo O'Higgins", comunas:["Rancagua", "Machalí", "San Fernando",
    "Rengo", "Santa Cruz"]
}
, {
    region:"Región del Maule", comunas:["Talca", "Curicó", "Linares", "Cauquenes", "Constitución"]
}
, {
    region:"Región de Ñuble", comunas:["Chillán", "Chillán Viejo", "San Carlos", "Bulnes", "Quirihue"]
}
, {
    region:"Región del Biobío", comunas:["Concepción", "Talcahuano", "Los Ángeles", "Chiguayante", "Coronel",
    "San Pedro de la Paz"]
}
, {
    region:"Región de La Araucanía", comunas:["Temuco", "Padre Las Casas", "Villarrica", "Pucón", "Angol"]
}
, {
    region:"Región de Los Ríos", comunas:["Valdivia", "La Unión", "Río Bueno", "Panguipulli", "Paillaco"]
}
, {
    region:"Región de Los Lagos", comunas:["Puerto Montt", "Osorno", "Castro", "Ancud", "Puerto Varas", "Quellón"]
}
, {
    region:"Región de Aysén del General Carlos Ibáñez del Campo", comunas:["Coyhaique", "Aysén", "Chile Chico",
    "Cochrane"]
}
, {
    region:"Región de Magallanes y de la Antártica Chilena", comunas:["Punta Arenas", "Puerto Natales", "Porvenir",
    "Cabo de Hornos"]
}
];
function cargarRegionesSelect(idRegion, seleccion="") {
    const select=document.getElementById(idRegion);
    
    if (!select)return;
    select.innerHTML=
    '<option value="">Selecciona región</option>'+regionesComunas.map
    (r =>`<option value="${r.region}" 
        ${r.region===seleccion?"selected":""}>${r.region}</option>`).join("");
}

function cargarComunasSelect(idRegion, idComuna, seleccion="") {
    const region=document.getElementById(idRegion),
    comuna=document.getElementById(idComuna);
    
    if (!region||!comuna)return;
    const encontrada=regionesComunas.find(r =>r.region===region.value);
    comuna.innerHTML='<option value="">Selecciona comuna</option>'+(encontrada?encontrada.comunas.map(c =>`<option value="${c}" ${c===seleccion?"selected":""}>${c}</option>`).join(""):"");
}

function activarRegiones(idRegion, idComuna) {
    const region=document.getElementById(idRegion);
    if (!region)return;
    cargarRegionesSelect(idRegion);
    region.addEventListener("change", () =>cargarComunasSelect(idRegion, idComuna));
}









