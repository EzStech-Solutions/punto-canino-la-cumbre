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

  // Aviso "Abierto ahora" según el horario (hora de Colombia)
  var badge = document.querySelector("[data-open-now]");
  if (badge && window.CONFIG.hours) {
    var parts = new Intl.DateTimeFormat("en-US", { timeZone: "America/Bogota", weekday: "short", hour: "2-digit", minute: "2-digit", hour12: false }).formatToParts(new Date());
    var get = function (t) { return parts.filter(function (p) { return p.type === t; })[0].value; };
    var day = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[get("weekday")];
    var mins = (parseInt(get("hour"), 10) % 24) * 60 + parseInt(get("minute"), 10);
    var toMin = function (t) { var x = t.split(":"); return parseInt(x[0], 10) * 60 + parseInt(x[1], 10); };
    var open = (window.CONFIG.hours[day] || []).some(function (r) { return mins >= toMin(r[0]) && mins < toMin(r[1]); });
    badge.textContent = open ? "Abierto ahora" : "Cerrado ahora";
    badge.classList.add(open ? "is-open" : "is-closed");
    document.querySelectorAll(".hours tr").forEach(function (tr) {
      if (tr.dataset.days.split(",").indexOf(String(day)) !== -1) tr.classList.add("today");
    });
  }

  window.observeReveal();
  document.getElementById("year").textContent = new Date().getFullYear();
})();
