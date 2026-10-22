// Menu sidebar untuk tampilan HP.
// Skrip ini membuat tombol menu (tiga garis) dan lapisan gelap secara otomatis,
// jadi HTML setiap halaman tidak perlu diubah selain menambah satu baris <script>.
(function () {
  var header = document.querySelector(".site-header");
  var nav = header && header.querySelector("nav");
  if (!nav) return;

  var root = document.documentElement;
  root.classList.add("js-menu");
  if (!nav.id) nav.id = "menu-utama";

  // Tombol buka/tutup
  var btn = document.createElement("button");
  btn.type = "button";
  btn.className = "menu-toggle";
  btn.setAttribute("aria-label", "Buka menu");
  btn.setAttribute("aria-controls", nav.id);
  btn.setAttribute("aria-expanded", "false");
  btn.innerHTML = "<span></span><span></span><span></span>";
  header.appendChild(btn);

  // Lapisan gelap di belakang sidebar
  var overlay = document.createElement("div");
  overlay.className = "menu-overlay";
  document.body.appendChild(overlay);

  function isOpen() {
    return root.classList.contains("menu-open");
  }

  function setOpen(open, moveFocus) {
    root.classList.toggle("menu-open", open);
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    btn.setAttribute("aria-label", open ? "Tutup menu" : "Buka menu");
    if (!moveFocus) return;
    if (open) {
      var first = nav.querySelector("a");
      if (first) first.focus();
    } else {
      btn.focus();
    }
  }

  btn.addEventListener("click", function () { setOpen(!isOpen(), true); });
  overlay.addEventListener("click", function () { setOpen(false, true); });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a")) setOpen(false, false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && isOpen()) setOpen(false, true);
  });
  window.addEventListener("resize", function () {
    if (window.innerWidth > 760 && isOpen()) setOpen(false, false);
  });
})();
