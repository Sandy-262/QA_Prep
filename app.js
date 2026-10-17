/**
 * Renders window.QA_PREP_DATA into the DOM and handles the progress
 * checklist. Pure rendering logic only — content lives in data.js,
 * presentation lives in styles.css.
 */
(function () {
  "use strict";

  var DATA = window.QA_PREP_DATA;
  var STORAGE_KEY = "qa-prep-progress";

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    attrs = attrs || {};
    Object.keys(attrs).forEach(function (key) {
      if (key === "class") node.className = attrs[key];
      else if (key === "text") node.textContent = attrs[key];
      else node.setAttribute(key, attrs[key]);
    });
    (children || []).forEach(function (child) {
      if (child) node.appendChild(child);
    });
    return node;
  }

  function link(text, url) {
    return el("a", { href: url, target: "_blank", rel: "noopener", text: text });
  }

  function renderResourceTitle(resource) {
    var titleDiv = el("div", { class: "res-title" });
    if (resource.links && resource.links.length) {
      resource.links.forEach(function (l, i) {
        if (i > 0) titleDiv.appendChild(document.createTextNode(" · "));
        titleDiv.appendChild(link(l.text, l.url));
      });
    } else {
      titleDiv.appendChild(link(resource.title, resource.url));
    }
    return titleDiv;
  }

  function renderResource(resource, resourceId) {
    var checkbox = el("input", { type: "checkbox", "data-key": resourceId });
    checkbox.setAttribute(
      "aria-label",
      "Mark " + (resource.title || resource.links.map(function (l) { return l.text; }).join(", ")) + " as done"
    );

    var body = el("div", { class: "res-body" }, [
      renderResourceTitle(resource),
      resource.note ? el("div", { class: "res-note", text: resource.note }) : null
    ]);

    var li = el("li", {}, [checkbox, body]);
    return { li: li, checkbox: checkbox };
  }

  function renderModule(mod, sectionClass) {
    var ul = el("ul", { class: "resources" });
    var checkboxes = [];

    mod.resources.forEach(function (resource, i) {
      var id = "m" + mod.num + "-r" + i;
      var rendered = renderResource(resource, id);
      ul.appendChild(rendered.li);
      checkboxes.push(rendered.checkbox);
    });

    var section = el("section", { class: sectionClass || "module", "data-module": mod.num }, [
      el("div", { class: "module-head" }, [
        el("span", { class: "module-num", text: mod.num }),
        el("h2", { text: mod.title })
      ]),
      el("p", { class: "module-goal", text: mod.goal }),
      ul
    ]);

    return { section: section, checkboxes: checkboxes };
  }

  function renderCapstone(capstone) {
    var ol = el("ol");
    capstone.steps.forEach(function (step) {
      ol.appendChild(el("li", { text: step }));
    });
    return el("section", { class: "module capstone", "data-module": capstone.num }, [
      el("div", { class: "module-head" }, [
        el("span", { class: "module-num", text: capstone.num }),
        el("h2", { text: capstone.title })
      ]),
      el("p", { class: "module-goal", text: capstone.goal }),
      ol
    ]);
  }

  function renderFooter(footer) {
    return el("footer", {}, [
      el("strong", { text: footer.lead }),
      document.createTextNode(" " + footer.body)
    ]);
  }

  function loadState() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      return {};
    }
  }

  function saveState(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* storage unavailable (private mode, blocked cookies) — progress just won't persist */
    }
  }

  function wireProgress(allCheckboxes) {
    var bar = document.getElementById("bar");
    var label = document.getElementById("progressLabel");

    function updateProgress() {
      var done = allCheckboxes.filter(function (b) { return b.checked; }).length;
      var total = allCheckboxes.length;
      var pct = total ? Math.round((done / total) * 100) : 0;
      if (bar) bar.style.width = pct + "%";
      if (label) label.textContent = done + " of " + total + " done";
    }

    var state = loadState();
    allCheckboxes.forEach(function (box) {
      var key = box.getAttribute("data-key");
      if (state[key]) box.checked = true;
      box.closest("li").classList.toggle("checked", box.checked);
      box.addEventListener("change", function () {
        var st = loadState();
        st[key] = box.checked;
        saveState(st);
        box.closest("li").classList.toggle("checked", box.checked);
        updateProgress();
      });
    });
    updateProgress();

    var reset = document.getElementById("resetProgress");
    if (reset) {
      reset.addEventListener("click", function () {
        saveState({});
        allCheckboxes.forEach(function (box) {
          box.checked = false;
          box.closest("li").classList.remove("checked");
        });
        updateProgress();
      });
    }
  }

  function render() {
    document.getElementById("eyebrow").textContent = DATA.meta.eyebrow;
    document.getElementById("pageTitle").textContent = DATA.meta.title;
    document.getElementById("pageSubtitle").textContent = DATA.meta.subtitle;

    var modulesContainer = document.getElementById("modules");
    var allCheckboxes = [];

    DATA.modules.forEach(function (mod) {
      var rendered = renderModule(mod);
      modulesContainer.appendChild(rendered.section);
      allCheckboxes = allCheckboxes.concat(rendered.checkboxes);
    });

    modulesContainer.appendChild(renderCapstone(DATA.capstone));
    modulesContainer.appendChild(renderFooter(DATA.footer));

    wireProgress(allCheckboxes);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
