/**
 * Builds the language dropdown from playground-data.js and runs code
 * against the Wandbox online-compiler API. Keeps a separate code buffer
 * per language so switching languages doesn't lose what you wrote.
 */
(function () {
  "use strict";

  var DATA = window.QA_PLAYGROUND_DATA;
  var langSelect = document.getElementById("langSelect");
  var codeInput = document.getElementById("codeInput");
  var runBtn = document.getElementById("runBtn");
  var resetBtn = document.getElementById("resetCode");
  var outputEl = document.getElementById("codeOutput");
  var statusEl = document.getElementById("runStatus");

  if (!DATA || !langSelect || !codeInput || !runBtn || !outputEl) return;

  var codeByLang = {};
  var activeLang = null;

  function buildLanguageOptions() {
    Object.keys(DATA.languages).forEach(function (key) {
      var conf = DATA.languages[key];
      codeByLang[key] = conf.starter;
      var opt = document.createElement("option");
      opt.value = key;
      opt.textContent = conf.label;
      langSelect.appendChild(opt);
    });
    activeLang = Object.keys(DATA.languages)[0];
    langSelect.value = activeLang;
  }

  function loadActiveLangIntoEditor() {
    codeInput.value = codeByLang[activeLang];
  }

  function clearOutput() {
    outputEl.textContent = "Run your code to see output here.";
    outputEl.classList.remove("has-error");
  }

  function renderResult(result) {
    var parts = [];
    if (result.compiler_error) parts.push(result.compiler_error.trim());
    if (result.program_output) parts.push(result.program_output.replace(/\n$/, ""));
    if (result.program_error) parts.push(result.program_error.trim());
    var text = parts.join("\n").trim();
    outputEl.textContent = text || "(no output)";
    outputEl.classList.toggle("has-error", result.status !== "0");
  }

  function runCode() {
    var conf = DATA.languages[activeLang];
    var code = codeInput.value;

    if (!code.trim()) {
      outputEl.textContent = "Write some code first.";
      outputEl.classList.remove("has-error");
      return;
    }

    runBtn.disabled = true;
    statusEl.textContent = "Running…";
    outputEl.textContent = "Running…";
    outputEl.classList.remove("has-error");

    fetch(DATA.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ compiler: conf.compiler, code: code })
    })
      .then(function (res) {
        if (!res.ok) throw new Error("HTTP " + res.status);
        return res.json();
      })
      .then(renderResult)
      .catch(function (err) {
        outputEl.textContent =
          "Could not reach the code runner. Check your connection and try again in a moment.\n\n(" +
          err.message +
          ")";
        outputEl.classList.add("has-error");
      })
      .finally(function () {
        runBtn.disabled = false;
        statusEl.textContent = "";
      });
  }

  buildLanguageOptions();
  loadActiveLangIntoEditor();

  codeInput.addEventListener("input", function () {
    codeByLang[activeLang] = codeInput.value;
  });

  langSelect.addEventListener("change", function () {
    activeLang = langSelect.value;
    loadActiveLangIntoEditor();
    clearOutput();
  });

  codeInput.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      runCode();
    }
  });

  runBtn.addEventListener("click", runCode);

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      codeByLang[activeLang] = DATA.languages[activeLang].starter;
      loadActiveLangIntoEditor();
      clearOutput();
    });
  }
})();
