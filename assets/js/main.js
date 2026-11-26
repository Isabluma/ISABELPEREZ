/* Isabel Pérez — portafolio · interacción (sin librerías) */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FINE = matchMedia('(hover:hover) and (pointer:fine)').matches;
document.documentElement.classList.add('js');

/* imágenes optimizadas: cada foto existe en 480, 960 y 1600 px; el navegador elige la que necesita */
const IMG = (n, w) => `assets/img/${n}-${w}.jpg`;
const SRCSET = n => [480, 960, 1600].map(w => `${IMG(n, w)} ${w}w`).join(', ');
// carga diferida: una foto solo se descarga cuando está a punto de aparecer
// iPhone pausa los vídeos que se inician ocultos: se reproducen al hacerse visibles y se pausan al ocultarse
const RMQ = matchMedia('(prefers-reduced-motion: reduce)');
function syncVideo(el, on) {
  const v = el && el.querySelector('.hero video');
  if (!v || v.hasAttribute('data-vsrc')) return;
  if (on && !RMQ.matches) { if (v.paused && !v._try) { v._try = 1; v.muted = true; v.play().catch(() => {}).finally(() => { v._try = 0; }); } }
  else if (!v.paused) v.pause();
}
function prime(el) {
  if (!el) return;
  el.querySelectorAll('img[data-srcset]').forEach(im => {
    im.sizes = im.dataset.sizes; im.srcset = im.dataset.srcset; im.src = im.dataset.src;
    im.removeAttribute('data-srcset');
  });
  el.querySelectorAll('video[data-vsrc]').forEach(v => {
    v.muted = true; v.defaultMuted = true; v.playsInline = true;
    v.src = v.dataset.vsrc; v.removeAttribute('data-vsrc'); v.load();
  });
}

  /* nombre letra a letra */
  const nameEl = $('.name');
  // al acabar la entrada, la letra se libera del desenfoque para que el texto quede nítido (Safari)
  nameEl.addEventListener('animationend', e => { if (e.target !== nameEl) e.target.classList.add('ok'); });
  nameEl.innerHTML = [...'ISABEL PÉREZ'].map((c, i) => c === ' ' ? '<span style="--i:' + i + '">&nbsp;</span>' : `<span style="--i:${i}">${c}</span>`).join('');

  /* contenido: h = altura (vh), y = desplazamiento vertical (vh), gap = espacio antes (vw) */
  // título en letras sueltas (para la animación)
  const TTL = t => { let j = 0; return t.split(' ').map(w => `<i class="wd" aria-hidden="true">${[...w].map(x => `<span style="--i:${j++}">${x === '&' ? '&amp;' : x}</span>`).join('')}</i>`).join(' '); };
  // nombre del proyecto en el idioma actual
  const TT = k => (document.documentElement.lang === 'en' && CH[k].tEn) || CH[k].t;
  const CH = {
    bali:  { n:'01', t:'Bali', s:'Iba pasando la vida', m:'Fotografía y ensayo', read:'p-bali', readT:'Leer el ensayo' },
    guate: { n:'02', t:'Guatemala', s:'Orilla de fuego', m:'Fotografía y ensayo', read:'p-guate', readT:'Leer «Poesía geográfica»' },
    table: { n:'03', t:'The Table Club', s:'Branding y escritura de marca', m:'Copy y fotografía', read:'p-table', readT:'Ver los textos' },
    js:    { n:'04', t:'Testigo', tEn:'Witness', s:'Jose & Stephanie', m:'Fotografía · Boda civil', video:'js-zapatos' },
    nat:   { n:'05', t:'Natalia', s:'Piel y luz', m:'Fotografía · Retrato íntimo', video:'nat-cama' },
    car:   { n:'06', t:'Carmen', s:'Ciclo de lavado', m:'Fotografía · Editorial' },
    hil:   { n:'07', t:'Hilda', s:'Estudio en gris', m:'Fotografía · Retrato de estudio' },
  };
  const PH = [
    ['bali','bali-01-cesta',986,1500,'Una mujer camina por una calle de Bali con una cesta sobre la cabeza',78,10,0],
    ['bali','bali-04-calle',1125,1500,'Una persona con recipientes sobre la cabeza junto a una estatua y motos',46,40,3],
    ['bali','bali-02-moto',844,1500,'Una niña en una moto mira hacia la cámara',56,32,4],
    ['bali','bali-06-templo',1125,1500,'Tejados de un templo frente al mar azul',52,22,4],
    ['bali','bali-07-surfista',1124,1500,'Un surfista sale del agua entre grandes rocas',70,16,8],
    ['bali','bali-03-rocas',1125,1500,'Luz dorada y mar entre dos paredes de roca',64,6,7],
    ['bali','bali-08-roca',1125,1500,'Una roca con una bandera bajo el cielo del anochecer',40,46,3],
    ['bali','bali-05-movimiento',1125,1500,'Una calle de Bali difuminada por el movimiento al anochecer',82,8,6],
    ['guate','guate-07-volcan',1565,1037,'Un volcán sobre el lago de Atitlán, entre ramas',60,16,5],
    ['guate','guate-06-atitlan',1125,1500,'Una lancha y un helicóptero sobre el lago de Atitlán',74,14,6],
    ['guate','guate-09-bandera',954,1440,'La bandera de Guatemala en un poste de madera frente al cielo',64,20,6],
    ['guate','guate-08-saludo',1037,1565,'Un hombre con sombrero saluda sonriendo en una calle pintada de colores',76,10,4],
    ['guate','guate-03-mural',939,1418,'Una mujer cruza frente a un mural de colores',68,12,4],
    ['guate','guate-05-canastas',1206,791,'Canastas en una ventana junto a una pared con aves pintadas',50,20,4],
    ['guate','guate-02-nina',912,1361,'Una niña mira a la cámara junto a una ventana y un poste verde',54,30,5],
    ['guate','guate-10-banca',1037,1483,'Dos mujeres con trajes bordados sentadas en una banca junto a una pared blanca',70,12,5],
    ['guate','guate-04-arbol',920,1388,'Dos mujeres sentadas bajo un árbol junto a una plaza pintada',48,40,7],
    ['guate','guate-01-corredor',994,1500,'Corredor en sombra con columnas y luz entre las plantas',80,9,0],
    ['table','table-03-empaque',960,1200,'Bolsa de empaque verde oliva de The Table Club',76,10,6],
    ['table','table-01-mesa',1500,998,'Comidas de The Table Club en el baúl de un auto antiguo',58,18,0],
    ['table','table-02-olive-hour',1400,1120,'Platos de cerámica verde oliva',46,44,5],
    ['table','table-05-merch',1254,1254,'Gorra y calcetines de The Table Club en su empaque',60,14,5],
    ['table','table-04-cena',1121,1403,'Un hombre prueba la comida de The Table Club en una mesa de noche frente al mar',74,10,5],
    ['js','js-03-camino',1066,1600,'Los dos caminan de espaldas, de la mano, entre los árboles',72,14,0],
    ['js','js-01-miradas',1066,1600,'Jose y Stephanie, de la mano en un bosque de pinos, se miran y sonríen',78,10,5],
    ['js','js-05-bosque',1046,1600,'La pareja de pie, pequeña, en medio de un camino rodeado de pinos altos',80,8,4],
    ['js','js-02-ramo',1066,1600,'Stephanie, con un ramo de anémonas blancas, mira hacia un lado; Jose sonríe detrás de ella',74,12,5],
    ['js','js-10-zapatos',1066,1600,'Jose camina por el bosque llevando en la mano los zapatos blancos de Stephanie',74,12,6],
    ['js','js-06-escalinata',1066,1600,'Jose y Stephanie sentados en la escalinata de piedra de un edificio, mirándose',74,12,4],
    ['js','js-07-frente',1066,1600,'En blanco y negro, Stephanie besa la frente de Jose, que se inclina hacia ella',76,10,5],
    ['js','js-08-risa',1066,1600,'Stephanie ríe con una porción de pizza en la mano mientras Jose sostiene la caja',72,14,5],
    ['js','js-09-mar',1066,1600,'Frente al mar, Jose le da pizza a Stephanie, descalza y con los pies llenos de arena',78,10,4],
    ['nat','nat-01-hombro',1078,717,'Natalia mira por encima del hombro, con el pelo cayéndole sobre un ojo, a la luz del sol',56,22,0],
    ['nat','nat-02-sentada',562,1010,'Natalia sentada, abrazada a sus rodillas, con los ojos cerrados y el pelo largo al sol',74,12,5],
    ['nat','nat-03-perfil',1600,1739,'Perfil de Natalia con el pelo cruzándole la cara, contra una pared clara',70,15,5],
    ['nat','nat-04-sombra',559,1016,'Silueta a contraluz del perfil de Natalia, con la barbilla alzada y el mar al fondo',76,10,4],
    ['nat','nat-05-jersey',1600,2462,'En blanco y negro, una mujer se quita un jersey de punto que le cubre la cara',80,8,5],
    ['car','car-01-lavadora',1600,2258,'Carmen, de espaldas con un tatuaje de alas, mete la mano en una lavadora y mira a cámara por encima del hombro',76,10,0],
    ['car','car-02-noticias',1600,2281,'Carmen lee The Miami Times con una mano en el pelo, junto a una fila de secadoras',76,10,5],
    ['car','car-03-espera',1600,2219,'Carmen, con chaleco oscuro y un ojo turco al cuello, sentada con una percha en la mano, mira hacia un lado',74,12,5],
    ['car','car-04-ropa',1600,1238,'En película, Carmen sostiene ropa vaquera y una camisa de cuadros bajo un tubo de luz',56,22,5],
    ['car','car-05-cambio',1600,2307,'Carmen lee el periódico apoyada en la pared, frente a una máquina de cambio con un gran signo de dólar',76,10,4],
    ['car','car-06-banco',1600,2413,'Carmen sentada en un banco de madera, entre azulejos blancos y máquinas de monedas, mira de frente',78,10,5],
    ['car','car-07-giro',1600,2400,'En blanco y negro y en movimiento, Carmen gira la cabeza; el pelo le cubre los ojos y deja ver el tatuaje de su espalda',80,8,5],
    ['hil','hil-01-suelo',1435,2000,'Hilda apoyada en el suelo del estudio, con top blanco y pantalón de cuero, mira de frente',76,10,0],
    ['hil','hil-02-pared',1557,2000,'Hilda de perfil contra una pared clara, con una mano alzada y la otra en el bolsillo, mira a cámara',78,8,5],
    ['hil','hil-03-chaleco',1471,2000,'Hilda sentada en el suelo con chaleco negro y vaqueros, la mano en la barbilla',76,10,5],
    ['hil','hil-04-tumbada',1600,1104,'Hilda tumbada de lado sobre el suelo del estudio, la cabeza apoyada en la mano',54,24,5],
    ['hil','hil-05-mirada',1600,1197,'Hilda recostada en el suelo, sujetando su top blanco, mira por encima del hombro',56,22,5],
    ['hil','hil-06-perfil',1435,2000,'Hilda de perfil, con el pelo largo cayendo por la espalda, mira a cámara',80,8,5],
  ].map(([p,f,w,h,alt,vh,y,gap], i) => ({ p, src:f, w, h, alt, vh, y, gap, i }));
  /* tus palabras para cada foto (se ven al abrirla en grande) */
  const CAPS = [
    'Lo sagrado está abajo. A ras de calle.',
    'Entre dioses tallados y cables enredados.',
    'Ojos de no saber que ya son memoria para alguien.',
    'Entre templo y viento.',
    'Una forma más desnuda de estar viva.',
    'Captura una grieta. Un temblor.',
    'Quedarse mirando.',
    'Incluso el caos tiene pulso.',
    'De pronto una montaña te recuerda tu pequeñez.',
    'Es permitir que el mundo se mueva dentro de uno.',
    'Algo mucho más grande que sí misma.',
    'La alegría, la esperanza, el cansancio, el amor.',
    'Me gusta tanto perderme en lugares ajenos.',
    'La historia empezó mucho antes de tu llegada.',
    'El rostro de un desconocido te devuelve algo que creías tuyo.',
    'Acercarse lo suficiente a otras vidas.',
    'Ninguna nos es completamente ajena.',
    'Cuanto más lejos voy, más familiar se vuelve el mundo.',
    'Inside, a little ceremony for an ordinary day.',
    'Slow days, shared.',
    'The Olive Hour',
    'Market Finds. Made to Share.',
    'There’s always room for one more.',
    'Caminar hacia adentro, de la mano.',
    'Mirarse como quien vuelve a casa.',
    'Todo el bosque guardó silencio.',
    'Hay sonrisas que no son para nadie más.',
    'Lo que se carga por amor no pesa.',
    'Entre la piedra y el pulso.',
    'Cerrar los ojos también es mirar.',
    'La alegría también es un lugar sagrado.',
    'Yo solo estuve ahí. Mirando hasta sentir.',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
  ];

  const track = $('#track');
  const body = document.body, cover = $('#top'), expo = $('#expo');
  const TINT = { none: 'rgb(239, 239, 237)', bali: 'rgb(240, 234, 224)', guate: 'rgb(241, 229, 221)', table: 'rgb(233, 234, 222)', js: 'rgb(238, 233, 229)', nat: 'rgb(236, 233, 230)', car: 'rgb(234, 235, 233)', hil: 'rgb(235, 235, 234)' };
  const reel = $('#reel'), viewer = $('#viewer');
  const RAIN = .4; // volumen máximo de la lluvia (0 a 1): moderado
  let fading = false;

/* las diapositivas: escena de cada proyecto, una foto por pantalla, y un intervalo (MA) entre proyectos */
const SL = [];
const OFF = [[-5,-2],[4,2],[-2,3],[6,-1],[-6,1],[3,-3],[0,2],[-4,-1]];
// foto de cada escena (posición en la lista PH): Bali = la luz entre las piedras, Guatemala = el volcán, The Table Club = la comida en el auto
const HERO = { bali: 5, guate: 8, table: 19, js: 23, nat: 32, car: 43, hil: 44 };
// encuadre de la portada cuando hay que recortarla (para no cortar la cara)
const HPOS = { hil: '50% 22%' };
// fotos que se muestran completas, sin el zoom del paralaje (el motivo toca el borde)
const NZ = new Set(['nat-04-sombra']);
function interval() {
  const m = document.createElement('div'); m.className = 'slide ma';
  m.innerHTML = `<span class="ma-k" aria-hidden="true"></span>`;
  track.appendChild(m); SL.push({ el: m, p: null, t: 'ma' });
}
let last = null;
PH.forEach(ph => {
  if (ph.p !== last) {
    if (last) interval();
    last = ph.p; const c = CH[ph.p];
    const hero = PH[HERO[ph.p]] || ph;
    const ch = document.createElement('div'); ch.className = 'slide chap scene';
    const media = c.video
      ? `<video data-vsrc="assets/video/${c.video}.mp4" poster="assets/video/${c.video}-poster.jpg" muted loop playsinline preload="none" aria-hidden="true"></video>`
      : `<img data-src="${IMG(hero.src, 1600)}" data-srcset="${SRCSET(hero.src)}" data-sizes="100vw" alt="" decoding="async"${HPOS[ph.p] ? ` style="object-position:${HPOS[ph.p]}"` : ''}>`;
    ch.innerHTML = `<div class="hero">${media}</div><div class="chap-in"><span class="meta v">${c.n}</span><b class="ttl" aria-label="${c.t}"${c.tEn ? ` data-i18n="ch-${ph.p}-t" data-al-en="${c.tEn}"` : ''}>${TTL(c.t)}</b><span data-i18n="ch-${ph.p}-s">${c.s}</span>${c.read ? `<button class="hov" data-open="${c.read}" data-i18n="ch-${ph.p}-r">${c.readT}</button>` : `<span class="meta" data-i18n="ch-${ph.p}-m">${c.m}</span>`}</div>`;
    track.appendChild(ch); SL.push({ el: ch, p: ph.p, t: 'chap' });
  }
  const el = document.createElement('div'); el.className = 'slide card ' + ['rv-b', 'rv-l', 'rv-c'][ph.i % 3];
  const o = OFF[ph.i % OFF.length];
  el.innerHTML = `<figure${NZ.has(ph.src) ? ' class="nz"' : ''} style="--ox:${o[0]}vw;--oy:${o[1]}vh"><div class="ph"><img data-src="${IMG(ph.src, 960)}" data-srcset="${SRCSET(ph.src)}" data-sizes="(max-width: 760px) 86vw, 50vw" alt="${ph.alt}" width="${ph.w}" height="${ph.h}" decoding="async"></div><figcaption class="cap"><span class="n">${String(ph.i + 1).padStart(2,'0')}</span><span class="w" data-i18n="cap-${ph.i}">${CAPS[ph.i] || ''}</span></figcaption></figure>`;
  const fig = $('figure', el);
  fig.addEventListener('click', () => openViewer(ph.i));
  if (FINE) { fig.addEventListener('pointerenter', () => cur.classList.add('on')); fig.addEventListener('pointerleave', () => cur.classList.remove('on')); }
  ph.el = el; ph.s = SL.length; track.appendChild(el); SL.push({ el, p: ph.p, t: 'card', ph });
});
interval();
const end = document.createElement('div'); end.className = 'slide chap endcard';
end.innerHTML = `<div class="chap-in"><b data-i18n="end-big">Mirar hasta sentir.</b><span class="thanks" data-i18n="end-thanks">Gracias por mirar despacio.</span><div class="row"><button class="hov" data-open="p-about" data-i18n="end-about">Sobre mí</button><button class="hov" data-open="p-contact" data-i18n="end-contact">Contacto</button><a class="hov" href="#top" data-i18n="end-back">Volver a la lluvia ↑</a></div></div>`;
track.appendChild(end); SL.push({ el: end, p: null, t: 'end' });
  $('#tot').textContent = String(PH.length).padStart(2, '0');

  /* tamaños: cada foto grande y entera en la pantalla */
  /* altura estable: en iPhone la barra de Safari cambia innerHeight al hacer scroll; solo recalculamos si cambia de verdad */
  let VH = innerHeight, VW = innerWidth, STEP = VH * .9;
  document.documentElement.style.setProperty('--vh', VH + 'px');
  function size() {
    const H = VH, W = VW, mob = W < 760;
    STEP = H * (mob ? .9 : 1.05);
    PH.forEach(ph => {
      const maxH = H * (mob ? .56 : .62), maxW = W * (mob ? .82 : .5);
      let h = maxH, w = h * ph.w / ph.h;
      if (w > maxW) { w = maxW; h = w * ph.h / ph.w; }
      const img = $('img', ph.el); img.style.width = w + 'px'; img.style.height = h + 'px';
      $('figure', ph.el).style.width = w + 'px';
    });
    expo.style.height = ((SL.length - 1) * STEP + H) + 'px';
  }

  /* scroll: portada + revelado de cada foto */
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  let raf = 0, kk = 0, lastSY = scrollY;
  function tick() {
    raf = 0;
    const H = VH;
    const c = Math.min(1, Math.max(0, scrollY / H));
    cover.style.setProperty('--c', c.toFixed(3));
    body.classList.toggle('cover-on', scrollY < H * .55);
    const top = expo.offsetTop;
    const target = Math.max(0, (scrollY - top) / STEP);
    kk += (target - kk) * (RM ? 1 : .14);
    if (Math.abs(target - kk) < .0006) kk = target;
    const k = kk;
    // navegación discreta
    const dy = scrollY - lastSY;
    if (dy > 4 && scrollY > H) body.classList.add('nav-up'); else if (dy < -4 || scrollY < H) body.classList.remove('nav-up');
    lastSY = scrollY;
    const now = Math.min(SL.length - 1, Math.round(k));
    SL.forEach((s, i) => {
      const t = i === 0 ? 1 : Math.min(1, Math.max(0, k - (i - 1)));
      const u = Math.min(1, Math.max(0, k - i));
      const e = RM ? (t > .5 ? 1 : 0) : easeOut(t);
      s.el.style.setProperty('--r', (1 - e).toFixed(4));
      s.el.style.setProperty('--u', (RM ? (u > .5 ? 1 : 0) : u).toFixed(4));
      s.el.style.visibility = (e <= 0 || u >= 1) ? 'hidden' : 'visible';
      s.el.classList.toggle('now', i === now);
      if (i >= now - 1 && i <= now + 2) prime(s.el);
      if (s.t !== 'card') syncVideo(s.el, e > 0 && u < 1);
      s.el.setAttribute('aria-hidden', String(i !== now));
      if (s.t === 'card' && !RM) s.el.style.setProperty('--py', ((k - i) * -16).toFixed(1) + 'px');
    });
    // contador
    let n = 1; for (let i = now; i >= 0; i--) if (SL[i].t === 'card') { n = SL[i].ph.i + 1; break; }
if (n !== lastN) {
  const cnt = $('#cnt'); cnt.textContent = String(n).padStart(2, '0');
  if (!RM && lastN) cnt.animate([{ transform: `translateY(${n > lastN ? 70 : -70}%)`, opacity: 0 }, { transform: 'none', opacity: 1 }], { duration: 520, easing: 'cubic-bezier(.22,.8,.24,1)' });
  lastN = n;
}
// proyecto y foto actual, fijos a la izquierda
const sNow = SL[now];
body.classList.toggle('in-gal', !!sNow && sNow.t === 'card' && scrollY > top - H * .2);
if (sNow && sNow.t === 'card') {
  const pj = sNow.ph.p, list = PH.filter(x => x.p === pj), pos = list.indexOf(sNow.ph) + 1;
  if (pj !== lastP) {
    const wp = $('#w-p'); wp.textContent = TT(pj);
    if (!RM && lastP) wp.animate([{ opacity: 0, transform: 'translateY(12px)' }, { opacity: 1, transform: 'none' }], { duration: 700, easing: 'cubic-bezier(.22,.8,.24,1)' });
    lastP = pj;
  }
  $('#w-c').textContent = String(pos).padStart(2, '0') + ' / ' + String(list.length).padStart(2, '0');
}
    $('#pr').style.setProperty('--pr', Math.min(1, k / (SL.length - 1)).toFixed(3));
    // la luz de cada proyecto
    const p = SL[now].p;
    const tint = scrollY < top - H * .3 || !p ? TINT.none : TINT[p];
    if (body.style.backgroundColor !== tint) { body.style.backgroundColor = tint; body.style.setProperty('--tint', tint); }
    // la lluvia acompaña: fuerte en la portada, más suave entre las fotos
    if (!reel.muted && !fading) { try { reel.volume = viewer.classList.contains('open') ? RAIN * .3 : RAIN * (1 - c * .55); } catch (e) {} }
    curSlide = now;
    if (kk !== target) raf = requestAnimationFrame(tick);
  }
  let curSlide = 0, lastN = 0, lastP = null;
  const req = () => { if (!raf) raf = requestAnimationFrame(tick); };
  addEventListener('scroll', req, { passive: true });
  addEventListener('touchend', () => { SL.forEach(s => { if (s.t !== 'card' && s.el.style.visibility === 'visible') syncVideo(s.el, true); }); }, { passive: true });
  addEventListener('resize', () => {
    if (innerWidth === VW && Math.abs(innerHeight - VH) < 160) return;
    VW = innerWidth; VH = innerHeight;
    document.documentElement.style.setProperty('--vh', VH + 'px');
    size(); req();
  });
  size(); tick();
  addEventListener('load', () => { size(); req(); });

  /* cursor */
  const cur = $('#cur');
if (FINE) {
  const pvEl = document.getElementById('pv'); let cx = innerWidth / 2, cy = innerHeight / 2, mx = cx, my = cy;
  addEventListener('pointermove', e => { mx = e.clientX; my = e.clientY; }, { passive: true });
  (function follow() {
    cx += (mx - cx) * (RM ? 1 : .18); cy += (my - cy) * (RM ? 1 : .18);
    cur.style.left = cx.toFixed(1) + 'px'; cur.style.top = cy.toFixed(1) + 'px';
    if (pvEl.classList.contains('on')) { pvEl.style.left = cx.toFixed(1) + 'px'; pvEl.style.top = cy.toFixed(1) + 'px'; }
    requestAnimationFrame(follow);
  })();
}

/* flechas del teclado: de escena en escena */
addEventListener('keydown', e => {
  if (!['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) return;
  if (!body.classList.contains('entered') || viewer.classList.contains('open') || $('.panel.open') || $('#index.open')) return;
  if (scrollY < expo.offsetTop - VH * .5 && (e.key === 'ArrowUp' || e.key === 'ArrowLeft')) return;
  e.preventDefault();
  const d = (e.key === 'ArrowDown' || e.key === 'ArrowRight') ? 1 : -1;
  const i = scrollY < expo.offsetTop - 2 ? (d > 0 ? 0 : -1) : Math.max(0, Math.min(SL.length - 1, curSlide + d));
  if (i < 0) { scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' }); return; }
  scrollTo({ top: expo.offsetTop + i * STEP, behavior: RM ? 'auto' : 'smooth' });
});
/* si alguien se queda quieto mirando una foto, cae una gota */
let idle = Date.now();
['scroll', 'pointermove', 'keydown', 'touchstart'].forEach(ev => addEventListener(ev, () => { idle = Date.now(); }, { passive: true }));
setInterval(() => {
  if (RM || document.hidden || Date.now() - idle < 7000) return;
  const s = SL[curSlide]; if (!s || s.t !== 'card' || viewer.classList.contains('open')) return;
  const ph = $('.ph', s.el), r = ph.getBoundingClientRect();
  const d = document.createElement('span'); d.className = 'drop ink' + (Math.random() > .5 ? ' big' : '');
  d.style.left = (r.width * (.25 + Math.random() * .5)) + 'px'; d.style.top = (r.height * (.25 + Math.random() * .5)) + 'px';
  ph.appendChild(d); setTimeout(() => d.remove(), 1800);
  idle = Date.now() - 3500;
}, 1000);

  /* ir a una foto */
  function goTo(i) {
    scrollTo({ top: expo.offsetTop + PH[i].s * STEP, behavior: RM ? 'auto' : 'smooth' });
  }

/* vista previa del índice */
const pv = $('#pv'), pvImg = $('img', pv);
let pvT = 0;
function pvStart(k) {
  const list = PH.filter(p => p.p === k); let j = 0;
  pvImg.src = IMG(list[0].src, 480); pv.classList.add('on');
  clearInterval(pvT);
  if (!RM) pvT = setInterval(() => { j = (j + 1) % list.length; pvImg.src = IMG(list[j].src, 480); }, 650);
}
function pvStop() { clearInterval(pvT); pv.classList.remove('on'); }

/* índice */
  const index = $('#index'), grid = $('#grid');
  /* lista de sala: una línea por proyecto; al pasar el cursor, sus fotos */
  const list = document.createElement('ol'); list.className = 'idx';
  Object.keys(CH).forEach(k => {
    const c = CH[k], n = PH.filter(p => p.p === k).length;
    const li = document.createElement('li'), b = document.createElement('button');
    b.innerHTML = `<span class="i-n">${c.n}</span><span class="i-t"${c.tEn ? ` data-i18n="ch-${k}-tt"` : ''}>${c.t}</span><span class="i-s" data-i18n="ch-${k}-s">${c.s}</span><span class="i-m" data-i18n="ch-${k}-m">${c.m}</span><span class="i-c">${String(n).padStart(2, '0')} <span data-i18n="idx-ph">fotos</span></span>`;
    b.addEventListener('click', () => { index.classList.remove('open'); pvStop(); goTo(PH.findIndex(p => p.p === k)); });
    if (FINE) { b.addEventListener('pointerenter', () => pvStart(k)); b.addEventListener('pointerleave', pvStop); }
    li.appendChild(b); list.appendChild(li);
  });
  grid.appendChild(list);
  $('#idx-n').textContent = PH.length;
  $('#open-index').onclick = () => { index.classList.add('open'); index.hidden = false; };
  $('#close-index').onclick = () => index.classList.remove('open');

  /* visor */
  const vImg = $('#v-img');
  let vi = 0;
  function show(i, d = 0) {
    if (i < 0 || i >= PH.length) return; vi = i; const ph = PH[i];
    vImg.src = IMG(ph.src, innerWidth < 760 ? 960 : 1600); vImg.alt = ph.alt;
    $('#v-n').textContent = String(i + 1).padStart(2, '0') + ' / ' + String(PH.length).padStart(2, '0') + ' — ' + TT(ph.p);
    $('#v-p').textContent = (LANG === 'en' && EN['cap-' + i]) || CAPS[i] || '';
    $('#v-prev').style.visibility = i === 0 ? 'hidden' : '';
    $('#v-next').style.visibility = i === PH.length - 1 ? 'hidden' : '';
    if (!RM) vImg.animate([{ opacity: 0, transform: `translateX(${d * 30}px)` }, { opacity: 1, transform: 'none' }], { duration: 500, easing: 'cubic-bezier(.22,.8,.24,1)' });
  }
  function openViewer(i) { cur.classList.remove('on'); viewer.classList.add('open'); show(i); $('#v-close').focus(); req(); }
  const closeViewer = () => { viewer.classList.remove('open'); goTo(vi); req(); };
  $('#v-close').onclick = closeViewer; $('#v-stage').onclick = closeViewer;
  $('#v-prev').onclick = () => show(vi - 1, -1); $('#v-next').onclick = () => show(vi + 1, 1);
  let sx = null;
  vImg.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  vImg.addEventListener('touchend', e => { if (sx == null) return; const dx = e.changedTouches[0].clientX - sx; sx = null; if (Math.abs(dx) > 45) dx < 0 ? show(vi + 1, 1) : show(vi - 1, -1); });

  /* paneles */
  document.addEventListener('click', e => {
    const o = e.target.closest('[data-open]');
    if (o) { const p = document.getElementById(o.dataset.open); p.classList.add('open'); $('.sheet', p).scrollTop = 0; return; }
    const c = e.target.closest('[data-close]');
    if (c) c.closest('.panel').classList.remove('open');
  });
  addEventListener('keydown', e => {
    if (e.key === 'Escape') { $$('.panel.open').forEach(p => p.classList.remove('open')); index.classList.remove('open'); if (viewer.classList.contains('open')) closeViewer(); }
    if (viewer.classList.contains('open')) { if (e.key === 'ArrowRight') show(vi + 1, 1); if (e.key === 'ArrowLeft') show(vi - 1, -1); }
  });

  /* lluvia */
  const snd = $('#sound');
  function setSound(on, fade) {
    reel.muted = !on;
    snd.setAttribute('aria-pressed', String(on));
    $('#sound-t').textContent = soundText();
    reel.play().catch(() => {});
    if (on && fade && !RM) {
      // la lluvia entra poco a poco
      fading = true; let v = 0;
      try { reel.volume = 0; } catch (e) {}
      const iv = setInterval(() => { v = Math.min(RAIN, v + .02); try { reel.volume = v; } catch (e) {} if (v >= RAIN) { clearInterval(iv); fading = false; req(); } }, 70);
    } else if (on) { try { reel.volume = RAIN; } catch (e) {} req(); }
  }
  snd.addEventListener('click', () => setSound(reel.muted, false));

  /* entrada */
  const gate = $('#gate');
  function enter(withSound) {
    body.classList.remove('locked');
    body.classList.add('entered');
    gate.classList.add('out');
    setSound(withSound, true);
    setTimeout(() => { gate.hidden = true; }, RM ? 0 : 1400);
  }
  $('#in-sound').addEventListener('click', () => enter(true));
  $('#in-quiet').addEventListener('click', () => enter(false));
  $('#in-sound').focus({ preventScroll: true });
  scrollTo(0, 0);

  /* gotas: la portada responde al cursor y al tacto */
  let lastDrop = 0;
  function drop(x, y, big) {
    if (RM || !body.classList.contains('cover-on')) return;
    const r = cover.getBoundingClientRect();
    const d = document.createElement('span'); d.className = 'drop' + (big ? ' big' : '');
    d.style.left = (x - r.left) + 'px'; d.style.top = (y - r.top) + 'px';
    cover.appendChild(d); setTimeout(() => d.remove(), 1800);
  }
  cover.addEventListener('pointermove', e => { const t = performance.now(); if (t - lastDrop > 140) { lastDrop = t; drop(e.clientX, e.clientY, false); } });
  cover.addEventListener('pointerdown', e => drop(e.clientX, e.clientY, true));
  // de vez en cuando cae una gota sola
  setInterval(() => { if (!document.hidden && body.classList.contains('entered') && scrollY < innerHeight * .3) drop(innerWidth * (.15 + Math.random() * .7), innerHeight * (.15 + Math.random() * .6), Math.random() > .6); }, 2600);

  /* ---------- idioma: ESP / ENG ---------- */
  const EN = {
    "skip": "Skip to the photographs",
    "gate-q": "This page is meant to be heard.",
    "gate-snd": "Enter with sound",
    "gate-qt": "Enter in silence",
    "gate-hp": "Best with headphones",
    "nav-index": "Index",
    "idx-k": "Index",
    "idx-ph": "photos",
    "idx-f": "photographs · 7 projects",
    "nav-svc": "Services",
    "nav-about": "About",
    "nav-contact": "Contact",
    "bl": "Copywriter &amp; photographer",
    "hint": "Scroll",
    "cur": "View",
    "close": "Close",
    "v-prev": "← Previous",
    "v-next": "Next →",
    "about-k": "About",
    "about-h": "I’m Isabel",
    "about-prose": "<p>I have a certain talent for getting distracted by things I later find hard to explain. A shadow, for instance. I can be late because of a shadow. I’m working on my punctuality; the shadow has good material.</p><p>Everyday life has its own ways of leaving me thinking. I’m going about my day and, suddenly, the light does something and now it’s personal. I like to stay there, looking until I feel. My photographs and my writing usually begin like that: something outside moves something inside me, and I get curious to see how far it goes.</p><p>I studied documentary photography, and I write. I like finding the detail that changes a story, and the words that make someone want to stay and listen.</p><p class=\"s\">Look until you feel. Then, find a way to tell it.</p>",
    "contact-k": "Contact",
    "contact-h": "Write to me",
    "pending": "coming soon",
    "svc-k": "Services",
    "svc-h": "Three ways of paying attention",
    "svc-brand": "<li>Visual identity and logo</li><li>Brand system</li><li>Packaging and applications</li><li>Art direction</li><li>Website design</li>",
    "svc-copy": "<li>Brand voice and writing</li><li>Website copy</li><li>Newsletters and email</li><li>Product naming and microcopy</li><li>Editorial writing and essays</li>",
    "svc-photo-h": "Photography",
    "svc-photo": "<li>Documentary photography</li><li>Travel and editorial</li><li>Products with a story</li><li>Portraits</li><li>Photo and text projects together</li>",
    "svc-cta": "Write to me →",
    "svc-k2": "What I do",
    "bali-k": "01 — Bali · Essay",
    "bali-h": "Life, Walking By",
    "bali-prose": "<p>Indonesia did not come to me as a place.<br>It came as a strange mirror —</p><p>one that does not give back your face,<br>only your trembling.</p><p>Here I have felt that the sacred is not above,<br>not far, not promised.<br>It is low.<br>Street-level.<br>In the smoke rising from an offering.<br>In a woman who carries her balance as if the world on her head<br>were not a weight, but a habit.<br>In a child on a motorbike, looking at me with the eyes some moments have…<br>eyes that do not know they are already someone’s memory.</p><p>I thought I had come to look.<br>To keep images.<br>To gather beauty for later.<br>But some places will not be watched from the outside.<br>Some places ask you to surrender.<br>To die a little.<br>To let go of what you were sure of.<br>To be alive in a barer way.</p><p class=\"s\">Bali hurt me, beautifully.</p><p>I don’t take photographs to remember what I saw…<br>but to try to touch what touched me.</p><p>Because sometimes a camera does not capture a scene.<br>It captures a crack.<br>A tremor.<br>The faintest proof that there was a second<br>when the soul stepped a little out of the body<br>to see more clearly.</p><p>I don’t know who I was before this island.<br>Or I do —<br>but she already feels a little far away.</p><p>As if between temple and wind,<br>between smoke and traffic,<br>between carved gods and tangled wires,<br>I had been leaving old versions of myself<br>along the road… the way you slip out of clothes<br>that no longer belong to you.</p><p>And yet, I have never felt so close.</p><p>To life.<br>To the open weather of things.<br>To God, perhaps.<br>Or to something like God…<br>that sense that everything breathes together,<br>that even chaos has a pulse,<br>that beauty does not always caress —<br>sometimes it undoes you.</p><p>I have a feeling that when I leave,<br>it won’t only be the island I miss.</p><p>I will miss<br>the woman I was here.</p><p>The one who walked among shadows and altars<br>with her heart left a little more open.<br>The one who learned that getting lost<br>is not always a tragedy —<br>sometimes it is a secret way home.</p><p>Indonesia gave me no answers.</p><p>It gave me questions.</p><p class=\"s\">And, strangely,<br>I leave wanting to live inside them.</p>",
    "guate-k": "02 — Guatemala · Essay",
    "guate-h": "Poetry of Places",
    "guate-prose": "<p>Once again I understood that to travel is not to move through the world.<br>It is to let the world move through you.</p><p>Because suddenly a mountain reminds you how small you are.<br>An ancient language makes the past audible.<br>And a stranger’s face hands you back something you thought was only yours…<br>sorrow, joy, hope, weariness, love.</p><p class=\"s\">We go looking for landscapes<br>and come home with kin.</p><p>I love getting lost in places I’ve never called home. Each time I step outside my life, I return to it deeper. As if the soul needed other geographies to remember it belongs to something far larger than itself.<br>Maybe that is what travel is… coming close enough to other lives to find that none of them is truly foreign.</p><p class=\"s\">The farther I go,<br>the more the world feels like home.</p>",
    "table-k": "03 — Branding",
    "table-prose": "<p>A weekly meal brand. The writing starts from a simple gesture: making room for one more at the table.</p>",
    "t-r1": "Tagline",
    "t-r2": "Homepage",
    "t-r3": "Product",
    "t-r4": "Checkout",
    "t-r5": "Website",
    "table-k2": "Concept exercise · Travel publication",
    "t-ed": "Editorial invitation",
    "t-ed-v": "The journey also happens along the way.",
    "t-em": "Email subject line",
    "t-em-v": "I didn’t make it this far without getting distracted.",
    "ch-bali-m": "Photography and essay",
    "ch-bali-s": "Life, Walking By",
    "ch-bali-r": "Read the essay",
    "ch-guate-m": "Photography and essay",
    "ch-guate-s": "Shore of Fire",
    "ch-guate-r": "Read “Poetry of Places”",
    "ch-table-m": "Copy and photography",
    "ch-table-s": "Branding and brand writing",
    "ch-table-r": "See the writing",
    "ch-js-m": "Photography · Civil wedding",
    "ch-js-s": "Jose & Stephanie",
    "ch-nat-m": "Photography · Intimate portrait",
    "ch-nat-s": "Skin and light",
    "ch-car-m": "Photography · Editorial",
    "ch-car-s": "Wash cycle",
    "ch-hil-m": "Photography · Studio portrait",
    "ch-hil-s": "A study in grey",
    "end-big": "Look until you feel.",
    "end-thanks": "Thank you for looking slowly.",
    "end-svc": "Services",
    "end-about": "About",
    "end-contact": "Contact",
    "end-back": "Back to the rain ↑",
    "cap-0": "The sacred is low. Street-level.",
    "cap-1": "Between carved gods and tangled wires.",
    "cap-2": "Eyes that do not know they are already someone’s memory.",
    "cap-3": "Between temple and wind.",
    "cap-4": "To be alive in a barer way.",
    "cap-5": "It captures a crack. A tremor.",
    "cap-6": "To stay, and look.",
    "cap-7": "Even chaos has a pulse.",
    "cap-8": "Suddenly a mountain reminds you how small you are.",
    "cap-9": "To let the world move through you.",
    "cap-10": "Something far larger than itself.",
    "cap-11": "Joy, hope, weariness, love.",
    "cap-12": "I love getting lost in places I’ve never called home.",
    "cap-13": "History began long before you came.",
    "cap-14": "A stranger’s face hands you back something you thought was yours.",
    "cap-15": "Coming close enough to other lives.",
    "cap-16": "None of them is truly foreign.",
    "cap-17": "The farther I go, the more the world feels like home.",
    "cap-23": "Walking inward, hand in hand.",
    "cap-24": "To look at each other like coming home.",
    "cap-25": "The whole forest held its breath.",
    "cap-26": "Some smiles belong to no one else.",
    "cap-27": "What is carried for love weighs nothing.",
    "cap-28": "Between stone and pulse.",
    "cap-29": "Closing your eyes is also a way of seeing.",
    "cap-30": "Joy is a sacred place too.",
    "cap-31": "I was only there. Looking until I felt.",
  };
  Object.keys(CH).forEach(k => { if (CH[k].tEn) { EN[`ch-${k}-t`] = TTL(CH[k].tEn); EN[`ch-${k}-tt`] = CH[k].tEn; } });
  let LANG = 'es';
  function soundText() {
    return reel.muted ? (LANG === 'en' ? 'Listen to the rain' : 'Escuchar la lluvia') : (LANG === 'en' ? 'Mute' : 'Silenciar');
  }
  function setLang(l) {
    LANG = l;
    document.documentElement.lang = l;
    $$('[data-i18n]').forEach(el => {
      if (el.dataset.es === undefined) el.dataset.es = el.innerHTML;
      const v = l === 'en' ? EN[el.dataset.i18n] : el.dataset.es;
      if (v !== undefined && el.innerHTML !== v) el.innerHTML = v;
    });
    $$('[data-al-en]').forEach(el => { if (!el.dataset.alEs) el.dataset.alEs = el.getAttribute('aria-label'); el.setAttribute('aria-label', l === 'en' ? el.dataset.alEn : el.dataset.alEs); });
    if (lastP) $('#w-p').textContent = TT(lastP);
    $$('.langs button').forEach(b => { const on = b.dataset.lang === l; b.classList.toggle('on', on); b.setAttribute('aria-pressed', String(on)); });
    $('#sound-t').textContent = soundText();
    if (viewer.classList.contains('open')) show(vi);
    try { localStorage.setItem('ip-lang', l); } catch (e) {}
  }
  $$('.langs button').forEach(b => b.addEventListener('click', () => setLang(b.dataset.lang)));
  let savedLang = null;
  try { savedLang = localStorage.getItem('ip-lang'); } catch (e) {}
  setLang(savedLang === 'en' || savedLang === 'es' ? savedLang : ((navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en'));
})();
