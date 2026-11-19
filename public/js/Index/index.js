const MISSATGE = document.getElementById("avis");

document.querySelectorAll('.desplegable').forEach((d) => {
  const boton = d.querySelector('button');
  const set = (abierto) => boton.setAttribute('aria-expanded', String(abierto));

  d.addEventListener('focusin', () => set(true));
  d.addEventListener('mouseenter', () => set(true));
  d.addEventListener('focusout', (e) => {
    if (!d.contains(e.relatedTarget)) set(false);
  });
  d.addEventListener('mouseleave', () => set(false));
});