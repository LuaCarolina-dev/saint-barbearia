/* =========================================================
   Saint Barbearia — interações
   Para trocar o número, o e-mail ou os horários, mexa só
   no objeto CONFIG abaixo.
   ========================================================= */

const CONFIG = {
  // Número no formato internacional: 55 + DDD + número (só dígitos)
  whatsapp: "5541999937656",
  // Horário de funcionamento por dia da semana (0 = domingo)
  hours: {
    0: null, // domingo fechado
    1: [9, 19],
    2: [9, 19],
    3: [9, 19],
    4: [9, 19],
    5: [9, 19],
    6: [9, 19],
  },
};

/* ---------- Links de WhatsApp com mensagem pronta ---------- */

document.querySelectorAll("[data-wa]").forEach((el) => {
  const message = el.getAttribute("data-wa") || "Olá! Vim pelo site da Saint Barbearia.";
  el.setAttribute(
    "href",
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`
  );
});

/* ---------- Header ao rolar ---------- */

const header = document.getElementById("header");

const onScroll = () => {
  if (window.scrollY > 40) header.classList.add("scrolled");
  else header.classList.remove("scrolled");
};
onScroll();
window.addEventListener("scroll", onScroll, { passive: true });

/* ---------- Menu mobile ---------- */

const nav = document.getElementById("nav");
const navToggle = document.getElementById("navToggle");

const closeNav = () => {
  nav.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menu");
  document.body.classList.remove("nav-open");
};

navToggle?.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  document.body.classList.toggle("nav-open", isOpen);
});

nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeNav();
});

/* ---------- Animação de entrada ---------- */

const revealEls = document.querySelectorAll(".reveal");
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (!prefersReduced && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );
  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("in"));
}

/* ---------- Status aberto/fechado ---------- */

const openStatus = document.getElementById("openStatus");
const openText = document.getElementById("openText");

if (openStatus && openText) {
  const now = new Date();
  const today = CONFIG.hours[now.getDay()];
  const minutesNow = now.getHours() * 60 + now.getMinutes();
  const opensAt = today ? today[0] * 60 : null;
  const closesAt = today ? today[1] * 60 : null;

  if (today && minutesNow >= opensAt && minutesNow < closesAt) {
    openText.textContent = `Aberto agora · fecha às ${today[1]}h`;
  } else if (today && minutesNow < opensAt) {
    openText.textContent = `Abre hoje às ${today[0]}h`;
    openStatus.classList.add("closed");
  } else {
    openText.textContent = "Fechado agora · agende pelo WhatsApp";
    openStatus.classList.add("closed");
  }
  openStatus.hidden = false;

  // destaca o horário de hoje na lista
  const todayIndex = now.getDay();
  document.querySelectorAll("#hoursList [data-day]").forEach((row) => {
    const days = row.getAttribute("data-day");
    const match =
      days === String(todayIndex) ||
      (days.includes("-") &&
        todayIndex >= Number(days.split("-")[0]) &&
        todayIndex <= Number(days.split("-")[1]));
    row.classList.toggle("is-today", match);
  });
}

/* ---------- Galeria (lightbox) ---------- */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");
let lastFocused = null;

const openLightbox = (src, alt, trigger) => {
  lastFocused = trigger || null;
  lightboxImg.src = src;
  lightboxImg.alt = alt || "";
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
  lightboxClose.focus();
};

const closeLightbox = () => {
  lightbox.hidden = true;
  lightboxImg.removeAttribute("src");
  document.body.style.overflow = "";
  lastFocused?.focus();
};

document.querySelectorAll(".shot").forEach((shot) => {
  shot.addEventListener("click", () => {
    const img = shot.querySelector("img");
    openLightbox(shot.dataset.full, img?.alt, shot);
  });
});

lightboxClose?.addEventListener("click", closeLightbox);

lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
});

/* ---------- Ano do footer ---------- */

const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
