(function () {
  document.documentElement.classList.add("js");

  // Enlaces de WhatsApp con mensaje prellenado (también sirve para contenido dinámico)
  window.waLink = function (msg) {
    return "https://wa.me/" + window.CONFIG.whatsapp + "?text=" + encodeURIComponent(msg);
  };
  window.bindWa = function (root) {
    (root || document).querySelectorAll("[data-wa]").forEach(function (a) {
      a.href = window.waLink(a.dataset.wa);
      a.target = "_blank";
      a.rel = "noopener";
    });
  };
  window.observeReveal = function (root) {
    var els = (root || document).querySelectorAll(".reveal:not(.in)");
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
        });
      }, { threshold: 0.12 });
      els.forEach(function (el, i) { el.style.transitionDelay = (i % 4) * 70 + "ms"; io.observe(el); });
    } else {
      els.forEach(function (el) { el.classList.add("in"); });
    }
  };

  window.bindWa();

  // Menú móvil
  var burger = document.querySelector(".burger");
  var menu = document.getElementById("menu");
  function setMenu(open) {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }
  burger.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  window.observeReveal();
  document.getElementById("year").textContent = new Date().getFullYear();
})();
