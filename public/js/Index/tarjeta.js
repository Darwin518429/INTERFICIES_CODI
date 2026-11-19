const CONTENIDOR = document.getElementById("TarjetaAfegir");

const SVG_ARXIU = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#F4F0EB" stroke="#000"
    stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M8 16h28v44H8z" />
    <path d="M14 12h28v44H14z" />
    <path d="M20 8h22l12 12v36H20z" />
    <path d="M42 8v12h12" fill="none" />
    <path d="M26 30h20M26 36h20M26 42h20M26 48h20" fill="none" />
</svg>`;

const SVG_CARPETA = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="#F4F0EB" stroke="#000"
    stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M6 28V14a2 2 0 0 1 2-2h14l6 6h22a2 2 0 0 1 2 2v10" />
    <path d="M14 22h36v8H14z" />
    <path d="M6 28h52v24a6 6 0 0 1-6 6H12a6 6 0 0 1-6-6z" />
</svg>`;

const creaTarjeta = (svg, nom) => {
  const li = document.createElement("li");
  li.className = "tarjeta";

  const boto = document.createElement("button");
  boto.type = "button";

  const icona = document.createElement("span");
  icona.className = "tarjeta-icona";
  icona.innerHTML = svg;

  const nomEl = document.createElement("span");
  nomEl.className = "tarjeta-nom";
  nomEl.textContent = nom;

  boto.append(icona, nomEl);
  li.appendChild(boto);
  return li;
};

const afegirCarpetes = (quantitat) => {
  for (let i = 1; i <= quantitat; i++) {
    CONTENIDOR.appendChild(creaTarjeta(SVG_CARPETA, `Carpeta_${i}`));
  }
};

const afegirArxius = (quantitat) => {
  for (let i = 1; i <= quantitat; i++) {
    CONTENIDOR.appendChild(creaTarjeta(SVG_ARXIU, `Arxiu_${i}`));
  }
};

afegirCarpetes(5);
afegirArxius(3);