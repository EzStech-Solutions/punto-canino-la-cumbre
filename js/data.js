/*
 * Configuración y catálogo de Punto Canino La Cumbre.
 * Para agregar o editar un producto, modifica solo este archivo.
 *
 * Campos de cada producto:
 *   id          identificador único, sin espacios (se usa en la URL: producto.html?id=...)
 *   name        nombre visible
 *   category    perro | gato | acuario | accesorio | salud
 *   desc        descripción corta (tarjeta)
 *   details     lista de puntos para la ficha del producto
 *   image       ruta de la foto (o null para mostrar un ícono)
 *   icon        ícono de respaldo (ver icons.svg)
 *   price       precio en COP (número) o null = "Consultar precio"
 *   stock       true/false (opcional, para cuando se vendan en línea)
 *
 * PAGOS EN LÍNEA (futuro): cuando los productos tengan `price`, activa
 * CONFIG.payments = true y conecta el checkout (ver README.md).
 */
window.CONFIG = {
  whatsapp: "573244709898",   // código de país + número, sin "+" ni espacios
  phone: "+576076058796",
  payments: false             // true cuando exista carrito y pasarela de pago
};

window.CATEGORIES = [
  { id: "perro", label: "Perros" },
  { id: "gato", label: "Gatos" },
  { id: "acuario", label: "Peces y tortugas" },
  { id: "accesorio", label: "Accesorios" },
  { id: "salud", label: "Vitaminas y salud" }
];

window.PRODUCTS = [
  {
    id: "concentrado-perro",
    name: "Concentrado para perros",
    category: "perro",
    desc: "Cachorros y adultos. Presentación en libra, kilo y bulto.",
    details: ["Para cachorros y perros adultos", "Varias marcas y presentaciones", "Venta por libra, kilo o bulto"],
    image: "img/concentrados.webp",
    icon: "i-bag",
    price: null
  },
  {
    id: "concentrado-gato",
    name: "Concentrado para gatos",
    category: "gato",
    desc: "Gatitos y adultos, con muchas opciones de alimentación.",
    details: ["Para gatitos y gatos adultos", "Varias marcas y presentaciones", "Venta por libra, kilo o bulto"],
    image: "img/concentrados.webp",
    icon: "i-paw",
    price: null
  },
  {
    id: "vitaminas",
    name: "Vitaminas y suplementos",
    category: "salud",
    desc: "Para gatitos, cachorros y adultos.",
    details: ["Multivitamínicos y suplementos", "Para perros y gatos de todas las edades", "Pregunta cuál es el indicado para tu mascota"],
    image: "img/vitaminas.webp",
    icon: "i-pill",
    price: null
  },
  {
    id: "alimento-peces-tortugas",
    name: "Alimento para peces y tortugas",
    category: "acuario",
    desc: "Alimento para tortugas y pececitos.",
    details: ["Alimento para tortugas", "Alimento para peces", "Se vende por porciones"],
    image: "img/acuario.webp",
    icon: "i-fish",
    price: null
  },
  {
    id: "cortaunas",
    name: "Cortaúñas",
    category: "accesorio",
    desc: "Para perros y gatos, con lima incluida en algunos sets.",
    details: ["Para perros y gatos", "Sets con lima", "Corte seguro en casa"],
    image: "img/accesorios.webp",
    icon: "i-scissors",
    price: null
  },
  {
    id: "correas",
    name: "Correas",
    category: "accesorio",
    desc: "Correas de colores para pasear a tu perro.",
    details: ["Varios colores", "Cierre de mosquetón", "Ideales para el paseo diario"],
    image: "img/tienda.webp",
    icon: "i-ball",
    price: null
  },
  {
    id: "accesorios-cuidado",
    name: "Cepillos, juguetes y más",
    category: "accesorio",
    desc: "Cepillos, juguetes y accesorios de cuidado para tu mascota.",
    details: ["Cepillos y accesorios de aseo", "Juguetes", "Y muchas cosas más: pregúntanos"],
    image: "img/cortaunas.webp",
    icon: "i-bag",
    price: null
  },
  {
    id: "snacks",
    name: "Snacks y premios",
    category: "perro",
    desc: "Premios para entrenar y consentir a tu perro.",
    details: ["Premios naturales y snacks", "Ideales para adiestramiento", "Consulta las opciones disponibles"],
    image: null,
    icon: "i-bone",
    price: null
  },
  {
    id: "helados",
    name: "Helados para mascotas",
    category: "perro",
    desc: "Helados con sabores variados, hechos para ellos.",
    details: ["Sabores variados", "Elaborados para mascotas", "Consulta disponibilidad"],
    image: null,
    icon: "i-bone",
    price: null
  },
  {
    id: "rascadores",
    name: "Rascadores y gimnasios para gatos",
    category: "gato",
    desc: "Para que tu gato juegue y deje tus muebles en paz.",
    details: ["Rascadores", "Gimnasios y torres", "Consulta modelos disponibles"],
    image: null,
    icon: "i-paw",
    price: null
  }
];
