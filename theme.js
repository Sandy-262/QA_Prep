/**
 * Manual light/dark toggle. Defaults to the system preference (see the
 * inline script in index.html's <head>, which applies any saved override
 * before first paint so there's no flash of the wrong theme).
 */
(function () {
  "use strict";

  var STORAGE_KEY = "qa-prep-theme";
  var root = document.documentElement;
  var toggleBtn;

  function effectiveTheme() {
    var explicit = root.getAttribute("data-theme");
    if (explicit) return explicit;
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  function updateButton() {
    if (!toggleBtn) return;
    var eff = effectiveTheme();
    toggleBtn.textContent = eff === "dark" ? "☀️ Light" : "🌙 Dark";
    toggleBtn.setAttribute("aria-label", "Switch to " + (eff === "dark" ? "light" : "dark") + " mode");
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    updateButton();
  }

  function init() {
    toggleBtn = document.getElementById("themeToggle");
    if (!toggleBtn) return;

    updateButton();

    toggleBtn.addEventListener("click", function () {
      var next = effectiveTheme() === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch (e) {
        /* storage unavailable — theme still applies for this page view */
      }
      applyTheme(next);
    });

    if (window.matchMedia) {
      window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function () {
        if (!root.getAttribute("data-theme")) updateButton();
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
