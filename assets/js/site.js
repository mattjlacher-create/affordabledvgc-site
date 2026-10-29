/* Affordable Dryer Vent & Gutter Specialists: shared site script.
   Minimal, dependency-free. Every page loads this with `defer`. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");

  var PHONE_DISPLAY = "(732) 966-6914";
  var PHONE_TEL = "tel:+17329666914";

  /* ---------- Mobile nav ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var setOpen = function (open) {
      toggle.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-open", open);
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
  }

  /* ---------- Current year ---------- */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* ---------- Before / after sliders ---------- */
  document.querySelectorAll("[data-ba]").forEach(function (ba) {
    var range = ba.querySelector(".ba-range");
    if (!range) return;
    var update = function () { ba.style.setProperty("--pos", range.value + "%"); };
    range.addEventListener("input", update);
    update();
  });

  /* ---------- Town links prefill the quote form ---------- */
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-town]");
    if (!link) return;
    var field = document.querySelector("#quote input[name='town_zip']");
    if (field) field.value = link.getAttribute("data-town");
  });

  /* ---------- Gallery: filters + lightbox ---------- */
  document.querySelectorAll("[data-gallery]").forEach(function (gallery) {
    var items = Array.prototype.slice.call(gallery.querySelectorAll("[data-categories]"));
    var buttons = gallery.querySelectorAll("[data-filter]");
    var count = gallery.querySelector("[data-gallery-count]");

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var f = btn.getAttribute("data-filter");
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
        var shown = 0;
        items.forEach(function (li) {
          var match = f === "all" || (" " + li.getAttribute("data-categories") + " ").indexOf(" " + f + " ") !== -1;
          li.hidden = !match;
          if (match) shown++;
        });
        if (count) count.textContent = shown + (shown === 1 ? " photo" : " photos");
      });
    });

    var dialog = gallery.querySelector("dialog");
    if (!dialog || typeof dialog.showModal !== "function") return;
    var img = document.createElement("img");
    dialog.querySelector("figure").prepend(img);
    var cap = dialog.querySelector("figcaption");
    var current = 0;
    var visible = function () { return items.filter(function (li) { return !li.hidden; }); };
    var show = function (li) {
      var btn = li.querySelector("[data-full]");
      img.src = btn.getAttribute("data-full");
      img.alt = btn.querySelector("img").alt;
      cap.textContent = btn.getAttribute("data-caption");
      current = visible().indexOf(li);
    };
    var step = function (d) {
      var list = visible();
      if (!list.length) return;
      show(list[(current + d + list.length) % list.length]);
    };
    items.forEach(function (li) {
      var btn = li.querySelector("[data-full]");
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        show(li);
        dialog.showModal();
      });
    });
    dialog.querySelector(".lightbox-close").addEventListener("click", function () { dialog.close(); });
    dialog.querySelector(".lightbox-prev").addEventListener("click", function () { step(-1); });
    dialog.querySelector(".lightbox-next").addEventListener("click", function () { step(1); });
    dialog.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
    dialog.addEventListener("click", function (e) { if (e.target === dialog) dialog.close(); });
  });

  /* ---------- Lead form ---------- */
  document.querySelectorAll("[data-lead-form]").forEach(function (form) {
    var status = form.querySelector(".form-status");
    var phone = form.querySelector('input[type="tel"]');

    // Light (xxx) xxx-xxxx formatting as the visitor types.
    if (phone) {
      phone.addEventListener("input", function () {
        var d = phone.value.replace(/\D/g, "");
        if (d.length === 11 && d.charAt(0) === "1") d = d.slice(1);
        if (d.length > 10 || /[^\d\s()+.\-]/.test(phone.value)) return;
        if (d.length > 6) phone.value = "(" + d.slice(0, 3) + ") " + d.slice(3, 6) + "-" + d.slice(6);
        else if (d.length > 3) phone.value = "(" + d.slice(0, 3) + ") " + d.slice(3);
      });
    }

    var setError = function (field, message) {
      var holder = field.closest(".field");
      var err = holder.querySelector(".field-error");
      if (message) {
        field.setAttribute("aria-invalid", "true");
        if (!err) {
          err = document.createElement("p");
          err.className = "field-error";
          err.id = (field.id || field.getAttribute("data-err-id") || "err-" + Math.random().toString(36).slice(2)) + "-error";
          holder.appendChild(err);
        }
        err.textContent = message;
        field.setAttribute("aria-describedby", err.id);
      } else {
        field.removeAttribute("aria-invalid");
        field.removeAttribute("aria-describedby");
        if (err) err.remove();
      }
    };

    var validate = function () {
      var firstBad = null;
      form.querySelectorAll("input[required], textarea[required]").forEach(function (input) {
        var msg = "";
        var val = input.value.trim();
        if (!val) msg = "Please fill this in.";
        else if (input.type === "tel" && val.replace(/\D/g, "").length < 10) msg = "Please enter a 10-digit phone number.";
        setError(input, msg);
        if (msg && !firstBad) firstBad = input;
      });
      var email = form.querySelector('input[type="email"]');
      if (email) {
        var bad = email.value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim());
        setError(email, bad ? "Please check your email address." : "");
        if (bad && !firstBad) firstBad = email;
      }
      form.querySelectorAll("[data-required-group]").forEach(function (group) {
        var checked = group.querySelector("input:checked");
        setError(group, checked ? "" : "Please choose at least one service.");
        if (!checked && !firstBad) firstBad = group.querySelector("input");
      });
      return firstBad;
    };

    form.addEventListener("change", function (e) {
      var group = e.target.closest("[data-required-group]");
      if (group && group.hasAttribute("aria-invalid") && group.querySelector("input:checked")) setError(group, "");
    });
    form.addEventListener("input", function (e) {
      if (e.target.getAttribute("aria-invalid") === "true" && e.target.value.trim()) setError(e.target, "");
    });

    form.addEventListener("submit", function (e) {
      var firstBad = validate();
      if (firstBad) {
        e.preventDefault();
        firstBad.focus();
        if (status) status.textContent = "";
        return;
      }
      // Honeypot filled: silently drop.
      var hp = form.querySelector(".hp input");
      if (hp && hp.value) { e.preventDefault(); return; }

      // TODO(form backend): remove this block once the form has a real action/endpoint.
      var action = form.getAttribute("action") || "";
      if (!action || action.indexOf("TODO") !== -1) {
        e.preventDefault();
        if (status) {
          status.innerHTML = "Thanks! Online requests are being set up. For the fastest response, please call or text us at " +
            '<a href="' + PHONE_TEL + '">' + PHONE_DISPLAY + "</a>.";
        }
      }
    });
  });
})();
