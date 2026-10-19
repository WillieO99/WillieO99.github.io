(function () {
  var root = document.documentElement;

  var year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  function currentTheme() {
    var set = root.getAttribute("data-theme");
    if (set) return set;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  }
  document.querySelectorAll(".theme").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var next = currentTheme() === "dark" ? "light" : "dark";
      root.setAttribute("data-theme", next);
      try { localStorage.setItem("wo-theme", next); } catch (e) {}
    });
  });

  var menuBtn = document.querySelector(".menu-btn");
  var side = document.getElementById("side");
  function setMenu(open) {
    side.classList.toggle("open", open);
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  if (menuBtn && side) {
    menuBtn.addEventListener("click", function () { setMenu(!side.classList.contains("open")); });
    side.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && side.classList.contains("open")) { setMenu(false); menuBtn.focus(); }
    });
  }

  document.querySelectorAll(".copy").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var label = btn.textContent;
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(btn.getAttribute("data-copy")).then(function () {
          btn.textContent = "Copied";
          btn.classList.add("done");
          setTimeout(function () { btn.textContent = label; btn.classList.remove("done"); }, 1600);
        }, function () {});
      }
    });
  });

  var modal = document.getElementById("video-modal");
  if (modal && typeof modal.showModal === "function") {
    var frame = modal.querySelector("iframe");
    var title = modal.querySelector(".video-title");
    modal.addEventListener("close", function () { frame.removeAttribute("src"); });
    modal.addEventListener("click", function (e) { if (e.target === modal) modal.close(); });
    modal.querySelector(".video-close").addEventListener("click", function () { modal.close(); });
    document.querySelectorAll("[data-video]").forEach(function (link) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        title.textContent = link.getAttribute("data-video-title") || "";
        frame.setAttribute("src", link.getAttribute("data-video"));
        modal.showModal();
      });
    });
  }

  var navLinks = Array.prototype.slice.call(document.querySelectorAll(".side-nav a"));
  var sections = navLinks.map(function (a) { return document.querySelector(a.getAttribute("href")); }).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navLinks.forEach(function (a) { a.classList.toggle("active", a.getAttribute("href") === "#" + e.target.id); });
        }
      });
    }, { rootMargin: "-35% 0px -60% 0px" });
    sections.forEach(function (s) { so.observe(s); });
  }
})();
