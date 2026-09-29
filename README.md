# Punto Canino La Cumbre — sitio web

Sitio web creado por **[EzStech Solutions](https://ezstech-solutions.netlify.app/)** para Punto Canino La Cumbre (Floridablanca, Santander).

Logo original (SVG): `brand/logo-punto-canino.svg`. Versiones web optimizadas en `img/logo*.webp`.

Estado: **demo** con `noindex` (los buscadores no lo indexan). Al publicar la versión final, quitar la etiqueta `robots` de cada página.

Sitio estático (HTML/CSS/JS, sin build). Para verlo en local: `python -m http.server 5173` y abrir http://localhost:5173.
Necesita un servidor (no funciona abriendo el archivo con doble clic, por el archivo de íconos).

## Páginas
| Archivo | Contenido |
|---|---|
| `index.html` | Inicio: resumen de servicios, laboratorio y productos destacados |
| `servicios.html` | Cada servicio por separado (con anclas `#consulta`, `#vacunacion`, `#laboratorio`, `#peluqueria`, `#domicilio`) |
| `productos.html` | Catálogo con filtros por categoría y buscador |
| `producto.html?id=…` | Ficha de cada producto |
| `contacto.html` | Dirección, teléfonos, mapa y redes |

## Cambiar datos
- **WhatsApp / teléfono:** `js/data.js` → `CONFIG`.
- **Productos:** `js/data.js` → `PRODUCTS` (nombre, categoría, descripción, foto, precio). Las fotos van en `img/` (WebP recomendado, ~900 px de ancho).
- **Categorías:** `js/data.js` → `CATEGORIES`.
- **Horarios:** buscar "Horario" en `contacto.html`.
- **Encabezado y pie:** están repetidos en cada `.html`; al cambiarlos, hay que editar los 5 archivos.

## Cuando quieran vender en línea
El catálogo ya está separado de las páginas y cada producto tiene su propia ficha, así que el camino es:
1. Poner `price` (en COP) y `stock` a cada producto en `js/data.js`.
2. Poner `CONFIG.payments = true` y agregar el botón "Agregar al carrito" en `js/catalog.js` (marcado con el comentario `CARRITO`).
3. Crear un carrito (localStorage) y una página `carrito.html`.
4. Conectar una pasarela de pagos colombiana (Wompi, Mercado Pago, ePayco o PayU). Ninguna clave secreta debe ir en el navegador: la confirmación del pago necesita un pequeño backend o función serverless.
Alternativa sin backend: enlaces de pago / botón de pago de la pasarela por producto.
