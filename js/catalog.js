/*
 * Catálogo dinámico: lee window.PRODUCTS (js/data.js) y pinta
 *  - productos.html  (filtros + búsqueda)
 *  - producto.html   (ficha por ?id=...)
 *  - index.html      (destacados: [data-featured])
 *
 * Para vender en línea: agrega `price` a cada producto en data.js y añade
 * un botón "Agregar al carrito" donde se ve el comentario CARRITO abajo.
 */
(function () {
  var PRODUCTS = window.PRODUCTS || [];
  var CATS = window.CATEGORIES || [];
  var SVG = function (n, s) {
    return '<svg width="' + s + '" height="' + s + '" aria-hidden="true"><use href="icons.svg#' + n + '"/></svg>';
  };
  var esc = function (t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  var catLabel = function (id) {
    var c = CATS.filter(function (x) { return x.id === id; })[0];
    return c ? c.label : id;
  };
  var money = function (n) {
    return "$" + Number(n).toLocaleString("es-CO") + " COP";
  };
  var priceText = function (p) {
    return p.price != null ? money(p.price) : "Consulta el precio";
  };
  var detailUrl = function (p) { return "producto.html?id=" + encodeURIComponent(p.id); };

  function media(p, cls) {
    if (p.image) {
      return '<img class="' + cls + '" src="' + esc(p.image) + '" loading="lazy" width="900" height="1200" alt="' + esc(p.name) + '">';
    }
    return '<div class="' + cls + ' pph" aria-hidden="true">' + SVG(p.icon || "i-paw", 56) + "</div>";
  }

  function card(p) {
    return '<article class="product reveal">' +
      '<a class="pmedia" href="' + detailUrl(p) + '" tabindex="-1" aria-hidden="true">' + media(p, "pimg") + "</a>" +
      '<span class="tag">' + esc(catLabel(p.category)) + "</span>" +
      '<h3><a href="' + detailUrl(p) + '">' + esc(p.name) + "</a></h3>" +
      "<p>" + esc(p.desc) + "</p>" +
      '<p class="price' + (p.price != null ? "" : " ask") + '">' + priceText(p) + "</p>" +
      '<div class="pactions"><a class="link" href="' + detailUrl(p) + '">Ver detalle →</a>' +
      '<a class="mini-wa" data-wa="Hola, quiero consultar: ' + esc(p.name) + '" href="#" aria-label="Consultar ' + esc(p.name) + ' por WhatsApp">' + SVG("i-wa", 20) + "</a></div>" +
      "</article>";
  }

  function render(el, list) {
    el.innerHTML = list.map(card).join("");
    window.bindWa(el);
    window.observeReveal(el);
  }

  // ---- Inicio: destacados
  var featured = document.querySelector("[data-featured]");
  if (featured) {
    render(featured, PRODUCTS.slice(0, parseInt(featured.dataset.featured, 10) || 4));
  }

  // ---- Catálogo
  var grid = document.getElementById("catalog");
  if (grid) {
    var filtersEl = document.getElementById("filters");
    var q = document.getElementById("q");
    var count = document.getElementById("count");
    var empty = document.getElementById("empty");
    var state = { cat: "all", text: "" };
    var params = new URLSearchParams(location.search);
    if (params.get("cat")) state.cat = params.get("cat");

    var norm = function (t) { return t.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, ""); };

    var chips = [{ id: "all", label: "Todos" }].concat(CATS);
    filtersEl.innerHTML = chips.map(function (c) {
      var on = c.id === state.cat;
      return '<button type="button" class="chip' + (on ? " is-on" : "") + '" data-cat="' + c.id + '" aria-pressed="' + on + '">' + esc(c.label) + "</button>";
    }).join("");

    var apply = function () {
      var t = norm(state.text);
      var list = PRODUCTS.filter(function (p) {
        var okCat = state.cat === "all" || p.category === state.cat;
        var okText = !t || norm(p.name + " " + p.desc + " " + catLabel(p.category)).indexOf(t) !== -1;
        return okCat && okText;
      });
      render(grid, list);
      empty.hidden = list.length > 0;
      count.textContent = list.length + (list.length === 1 ? " producto" : " productos");
      window.bindWa(empty);
    };

    filtersEl.addEventListener("click", function (e) {
      var b = e.target.closest(".chip");
      if (!b) return;
      state.cat = b.dataset.cat;
      filtersEl.querySelectorAll(".chip").forEach(function (c) {
        var on = c === b;
        c.classList.toggle("is-on", on);
        c.setAttribute("aria-pressed", String(on));
      });
      apply();
    });
    q.addEventListener("input", function () { state.text = q.value; apply(); });
    apply();
  }

  // ---- Ficha de producto
  var detail = document.getElementById("detail");
  if (detail) {
    var id = new URLSearchParams(location.search).get("id");
    var p = PRODUCTS.filter(function (x) { return x.id === id; })[0];
    if (!p) {
      detail.innerHTML = '<div class="notfound"><h1>No encontramos ese producto</h1><p>Puede que ya no esté disponible. Mira el catálogo o escríbenos.</p>' +
        '<a class="btn btn-primary" href="productos.html">Ver catálogo</a></div>';
    } else {
      document.title = p.name + " | Punto Canino La Cumbre";
      var md = document.querySelector('meta[name="description"]');
      if (md) md.content = p.name + ": " + p.desc;
      document.getElementById("crumb").textContent = p.name;

      var cta = '<a class="btn btn-cta" data-wa="Hola, quiero pedir: ' + esc(p.name) + '" href="#">' + SVG("i-wa", 20) + " Pedir por WhatsApp</a>";
      // CARRITO: cuando window.CONFIG.payments sea true, agrega aquí el botón "Agregar al carrito".
      detail.innerHTML =
        '<div class="pd">' +
        '<div class="pd-media">' + media(p, "pd-img") + "</div>" +
        '<div class="pd-info">' +
        '<span class="tag">' + esc(catLabel(p.category)) + "</span>" +
        "<h1>" + esc(p.name) + "</h1>" +
        '<p class="lead">' + esc(p.desc) + "</p>" +
        '<ul class="checks">' + (p.details || []).map(function (d) { return "<li>" + SVG("i-check", 18) + " " + esc(d) + "</li>"; }).join("") + "</ul>" +
        '<p class="price big' + (p.price != null ? "" : " ask") + '">' + priceText(p) + "</p>" +
        '<div class="cta-row">' + cta + '<a class="btn btn-ghost" href="productos.html">Volver al catálogo</a></div>' +
        '<p class="note">Disponibilidad y precio sujetos a confirmación por WhatsApp.</p>' +
        "</div></div>";
      window.bindWa(detail);

      var related = PRODUCTS.filter(function (x) { return x.category === p.category && x.id !== p.id; }).slice(0, 3);
      if (related.length) {
        document.getElementById("related-wrap").hidden = false;
        render(document.getElementById("related"), related);
      }
    }
  }
})();
