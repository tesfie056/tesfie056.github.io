'use strict';

const year = document.getElementById('year');
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const toggle = document.querySelector('.nav-toggle');
const nav = document.getElementById('site-nav');
const desktopNavQuery = window.matchMedia('(min-width: 1181px)');

function setNav(open) {
  if (!toggle || !nav) return;
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  nav.classList.toggle('is-open', open);
}

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    setNav(open);
  });

  nav.addEventListener('click', (event) => {
    if (event.target.closest('a')) setNav(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setNav(false);
      toggle.focus();
    }
  });

  document.addEventListener('click', (event) => {
    if (toggle.getAttribute('aria-expanded') !== 'true') return;
    if (nav.contains(event.target) || toggle.contains(event.target)) return;
    setNav(false);
  });

  const closeIfDesktop = () => {
    if (desktopNavQuery.matches) setNav(false);
  };
  desktopNavQuery.addEventListener('change', closeIfDesktop);
  window.addEventListener('resize', closeIfDesktop);
}

const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('#site-nav a[href^="#"]')];

function markCurrent() {
  if (!sections.length || !links.length) return;
  const line = 130;
  const pageFits = document.documentElement.scrollHeight <= window.innerHeight + 8;
  const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
  let currentId = sections[0].id;
  if (atBottom && !pageFits) {
    currentId = sections[sections.length - 1].id;
  } else {
    sections.forEach((section) => {
      if (section.getBoundingClientRect().top - line <= 0) currentId = section.id;
    });
  }
  links.forEach((link) => {
    const id = link.getAttribute('href').slice(1);
    if (id === currentId) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}

if (sections.length && links.length) {
  markCurrent();
  window.addEventListener('scroll', markCurrent, { passive: true });
}

const shotDialog = document.getElementById('shot-dialog');
const shotDialogImg = document.getElementById('shot-dialog-img');
const shotDialogCaption = document.getElementById('shot-dialog-caption');
const shotDialogClose = document.getElementById('shot-dialog-close');

if (shotDialog && shotDialogImg && shotDialogCaption) {
  const shotButtons = [...document.querySelectorAll('.shot-open')];
  let shotIndex = 0;

  function showShot(index) {
    if (!shotButtons.length) return;
    shotIndex = (index + shotButtons.length) % shotButtons.length;
    const button = shotButtons[shotIndex];
    const image = button.querySelector('img');
    const caption = button.closest('figure').querySelector('figcaption');
    if (!image) return;
    shotDialogImg.src = image.currentSrc || image.src;
    shotDialogImg.alt = image.alt;
    shotDialogImg.classList.toggle('is-portrait', button.getAttribute('data-orientation') === 'portrait');
    shotDialogCaption.textContent = caption ? caption.textContent : image.alt;
    if (!shotDialog.open) shotDialog.showModal();
    if (shotDialogClose) shotDialogClose.focus();
  }

  shotButtons.forEach((button, index) => {
    button.addEventListener('click', () => showShot(index));
  });

  if (shotDialogClose) {
    shotDialogClose.addEventListener('click', () => shotDialog.close());
  }

  shotDialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showShot(shotIndex + 1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showShot(shotIndex - 1);
    }
  });

  shotDialog.addEventListener('click', (event) => {
    const bounds = shotDialog.getBoundingClientRect();
    const inside = event.clientX >= bounds.left && event.clientX <= bounds.right
      && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    if (!inside) shotDialog.close();
  });

  shotDialog.addEventListener('close', () => {
    shotDialogImg.removeAttribute('src');
    const opener = shotButtons[shotIndex];
    if (opener) opener.focus();
  });
}
