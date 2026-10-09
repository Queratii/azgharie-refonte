/* AZGHARIE — scripts communs (aucune dépendance) */
(function () {
  "use strict";

  /* --- Menu mobile --- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute("aria-label", open ? "Ouvrir le menu" : "Fermer le menu");
      nav.classList.toggle("is-open", !open);
    });
  }

  /* --- Sous-menu « Territoires » --- */
  var menuButtons = document.querySelectorAll("[data-menu-toggle]");
  function closeMenus(except) {
    menuButtons.forEach(function (btn) {
      if (btn === except) return;
      btn.setAttribute("aria-expanded", "false");
      var m = document.getElementById(btn.getAttribute("aria-controls"));
      if (m) m.hidden = true;
    });
  }
  menuButtons.forEach(function (btn) {
    var menu = document.getElementById(btn.getAttribute("aria-controls"));
    if (!menu) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = btn.getAttribute("aria-expanded") === "true";
      closeMenus(btn);
      btn.setAttribute("aria-expanded", String(!open));
      menu.hidden = open;
    });
  });
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".has-menu")) closeMenus();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    var openBtn = document.querySelector('[data-menu-toggle][aria-expanded="true"]');
    closeMenus();
    if (openBtn) openBtn.focus();
  });

  /* --- Filtres de l'agenda --- */
  var filters = document.querySelectorAll("[data-filter]");
  if (filters.length) {
    var days = document.querySelectorAll("[data-day]");
    var empty = document.querySelector("[data-empty]");
    var status = document.getElementById("filter-status");
    filters.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var value = chip.getAttribute("data-filter");
        filters.forEach(function (c) { c.setAttribute("aria-pressed", String(c === chip)); });
        var shown = 0;
        days.forEach(function (day) {
          var visibleInDay = 0;
          day.querySelectorAll("[data-territoire]").forEach(function (row) {
            var match = value === "tous" || row.getAttribute("data-territoire") === value;
            row.hidden = !match;
            if (match) visibleInDay++;
          });
          day.hidden = visibleInDay === 0;
          shown += visibleInDay;
        });
        if (empty) empty.hidden = shown !== 0;
        if (status) status.textContent = shown + (shown > 1 ? " rendez-vous affichés" : " rendez-vous affiché");
      });
    });
  }
})();
