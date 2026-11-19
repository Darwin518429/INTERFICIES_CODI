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

// ===== ERRORS DEL FORMULARI =====
const form = document.querySelector('.form_Registrar');
form.noValidate = true; // el navegador no valida ni bloquea: ho fem nosaltres

// ids dels inputs. El hint de cada un és id + 'Hint' (nomHint, cognomHint...)
const campos = ['email', 'pass'];


function missatgeError(input) {
  if (input.value.trim() === '') return 'Aquest camp és obligatori';
const FORMAT = /^[a-zA-Z0-9]{3,}@[a-z]{3,}\.[a-z]{3,}$/
  if (input.id === 'email' && !FORMAT.test(input.value)) {
    return 'Format incorrecte, exemple: nom@correu.com';
  }

  return '';
}


function mostrarError(input, hint, msg) {
  hint.textContent = msg;
  hint.classList.add('visible');
  input.setAttribute('aria-invalid', 'true');
}


function ocultarError(input, hint) {
  hint.textContent = '';
  hint.classList.remove('visible');
  input.removeAttribute('aria-invalid');
}


form.addEventListener('submit', (e) => {
  e.preventDefault();
  let primerError = null; // el primer input amb error, per posar-hi el focus
  let totalErrors = 0;

  campos.forEach((id) => {
    const input = document.getElementById(id);
    const hint = document.getElementById(id + 'Hint');
    const msg = missatgeError(input);

    if (msg) {
      mostrarError(input, hint, msg);
      totalErrors++;
      if (!primerError) primerError = input;
    } else {
      ocultarError(input, hint);
    }
  });

  if (primerError) {
    e.preventDefault(); // AQUÍ bloqueges l'enviament
    MISSATGE.textContent = '';
    MISSATGE.textContent = `Hi ha ${totalErrors} errors al formulari`;
    primerError.focus();
  }
});

campos.forEach((id) => {
  const input = document.getElementById(id);
  const hint = document.getElementById(id + 'Hint');
  input.addEventListener('input', () => {
    if (!missatgeError(input)) ocultarError(input, hint);
  });
});