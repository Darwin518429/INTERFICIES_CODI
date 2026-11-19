const  MISSATGE = document.getElementById("avis");

const TANCAT = "Despegable tancat"
document.querySelectorAll('.desplegable').forEach((d) => {
  const boton = d.querySelector('button');
  
  const set = (abierto) => boton.setAttribute('aria-expanded', String(abierto));

  d.addEventListener('focusin', () =>{ 
    set(true)
  });
  d.addEventListener('focusout', (e) => {
    if (!d.contains(e.relatedTarget)) {set(false);
        MISSATGE.innerText =TANCAT
    }
  });
  d.addEventListener('mouseenter', () => set(true));
  d.addEventListener('mouseleave', () => {set(false)
     MISSATGE.innerText =TANCAT
  });
});


// ===== ERRORS DEL FORMULARI =====
const form = document.querySelector('.form_Registrar');
form.noValidate = true; // el navegador no valida ni bloquea: ho fem nosaltres

// ids dels inputs. El hint de cada un és id + 'Hint' (nomHint, cognomHint...)
const campos = ['nom', 'cognom', 'email', 'pass', 'pass_2'];


function missatgeError(input) {
  if (input.value.trim() === '') return 'Aquest camp és obligatori';
const FORMAT = /^[a-zA-Z0-9]{3,}@[a-z]{3,}\.[a-z]{3,}$/
  if (input.id === 'email' && !FORMAT.test(input.value)) {
    return 'Format incorrecte. Exemple: nom@correu.com';
  }

  if (input.id === 'pass_2') {
    const pass = document.getElementById('pass');
    if (input.value !== pass.value) return 'Les contrasenyes no coincideixen';
  }

  return '';
}

// 2) Mostra l'error: text al <p>, el fa visible i marca el camp com a invàlid
function mostrarError(input, hint, msg) {
  hint.textContent = msg;
  hint.classList.add('visible');
  input.setAttribute('aria-invalid', 'true');
}

// 3) Amaga l'error
function ocultarError(input, hint) {
  hint.textContent = '';
  hint.classList.remove('visible');
  input.removeAttribute('aria-invalid');
}

// 4) En enviar: revisa tots els camps i bloqueja si n'hi ha algun amb error
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
    MISSATGE.textContent = `Hi ha ${totalErrors} error(s) al formulari`;
    primerError.focus();
  }
});

// 5) Mentre escriu, si ja està bé, amaga l'error d'aquell camp
campos.forEach((id) => {
  const input = document.getElementById(id);
  const hint = document.getElementById(id + 'Hint');
  input.addEventListener('input', () => {
    if (!missatgeError(input)) ocultarError(input, hint);
  });
});