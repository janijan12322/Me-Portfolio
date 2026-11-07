/* ============================================================
   Kashif Hussain portfolio - main.js

   PART 1  CONTENT      edit your text, projects and links here
   PART 2  HELPERS
   PART 3  FEATURES     loader, hero, nav, projects, pages, effects
   ============================================================ */

/* ---------- PART 1: CONTENT (edit this part) ---------- */

// Words that cycle in the hero: "A ____ building for the web."
const ROLES = ['Shopify Developer', 'WordPress Developer', 'Frontend Developer', 'UI/UX Designer'];

// Words in the scrolling strip under the hero
const SKILLS = 'Shopify \u2726 Liquid \u2726 WooCommerce \u2726 WordPress \u2726 JavaScript \u2726 React \u2726 Figma \u2726 Responsive Design \u2726 ';

// Each project is used 3 times: a card in "Featured projects" (first 4),
// a row in "Recent thoughts" and its own full page when clicked.
// To add one: copy a block, change the text and add a new image to /images.
const PROJECTS = [
  {
    slug: 'realtex',
    name: 'Realtex Property',
    title: 'Designing a property search that feels calm',
    tag: 'Real estate',
    read: '5 min read',
    image: './project-1.jpg',
    lead: 'Buying a home is stressful enough. The Realtex interface is built so the search never adds to it.',
    text: [
      'The page opens with one large architectural photo and a short headline. Nothing competes with the building, so visitors know what the site is for within a second.',
      'Below it sits a single search panel: what they are looking for, price range, property type and location. I kept every field on one row so people can filter without scrolling or opening extra menus.',
      'The dark listing card next to the hero adds contrast and gives a clear next step. On mobile the same layout stacks into one column and keeps its spacing.'
    ],
    points: [
      'One clear search panel with four filters',
      'Large photography with soft rounded corners',
      'A dark call-to-action card that stands out on a light page',
      'Fully responsive layout from phone to desktop'
    ]
  },
  {
    slug: 'homestead',
    name: 'Homestead',
    title: 'A bold blue hero that sells the future home',
    tag: 'Landing page',
    read: '4 min read',
    image: './project-2.jpg',
    lead: 'Homestead uses one strong colour and big type so the message lands before anyone reads a paragraph.',
    text: [
      'The hero is a full block of saturated blue with a two-line headline. It is loud on purpose: a property company needs to feel confident and modern.',
      'Two numbers sit beside the headline, capital raised and happy customers, followed by a single Get Started button. Visitors see proof and the action together.',
      'Further down, the black feature card and the three project cards give the eye a rest. The FAQ-style list at the end turns common questions into links people can open.'
    ],
    points: [
      'High-contrast blue, white and black palette',
      'Large headline with proof points beside it',
      'Project cards that show the address and name clearly',
      'Question list that doubles as navigation'
    ]
  },
  {
    slug: 'furniture-world',
    name: 'Furniture World',
    title: 'Letting interiors do the talking',
    tag: 'Interior design',
    read: '6 min read',
    image: './project-3.jpg',
    lead: 'For a furniture brand the rooms are the product, so the layout stays quiet and lets the photos lead.',
    text: [
      'A dark hero with a yellow accent frames the first view. Yellow is used only for the logo and the main button, which keeps it memorable.',
      'The services block turns into a plain list on a yellow band: interior design, sticky chair, consultant. Thin lines separate the items, so it reads like a menu.',
      'Projects alternate image and text from left to right. That rhythm keeps a long page interesting, and each project ends with a small Projects link.'
    ],
    points: [
      'One accent colour used with restraint',
      'Alternating project rows for a steady rhythm',
      'Wide room photos that fill the frame',
      'Footer with address, phone and policies in one place'
    ]
  },
  {
    slug: 'supermarket-fashion',
    name: 'Supermarket Fashion',
    title: 'Making a fashion store easy to browse',
    tag: 'Online store',
    read: '5 min read',
    image: './project-4.jpg',
    lead: 'A clothing shop lives or dies by how quickly people can find something they like.',
    text: [
      'The homepage opens with a seasonal banner: Summer Collection, large and right-aligned, over a soft blue photo. It tells shoppers what is new without any extra copy.',
      'Product grids use the same card size throughout, with name and price directly under each photo. Arrows let people page through without leaving the section.',
      'Look-book sections such as Shop the Look and the tailored collection add a more editorial feel, and a newsletter block near the footer captures visitors who are not ready to buy.'
    ],
    points: [
      'Seasonal banner that sets the tone',
      'Consistent product cards with visible prices',
      'Editorial look-book sections',
      'Newsletter sign-up before the footer'
    ]
  },
  {
    slug: 'eslla-handbags',
    name: 'ESLLA Handbags',
    title: 'Building a store around one strong product',
    tag: 'Online store',
    read: '7 min read',
    image: './project-5.jpg',
    lead: 'ESLLA sells plant-based leather handbags, so the page has to show craft and values together.',
    text: [
      'A full-width photo of a bag in use opens the page, with a short headline and two buttons: Shop Now and View Lookbook. The product is the hero.',
      'The collection grid uses clean white backgrounds, so every colour and chain detail can be compared at a glance. Names and prices stay small and consistent.',
      'Trust comes next: social videos, customer testimonials, the brand promise and a Featured On row of press logos. The black footer keeps account, policy and newsletter links easy to find.'
    ],
    points: [
      'Product photography on plain backgrounds',
      'Social proof through videos and testimonials',
      'A clear brand promise about ethical materials',
      'Press logos to build trust'
    ]
  }
];

// Which project images appear in the floating gallery (index into PROJECTS)
const GALLERY = [0, 1, 2, 3, 4, 0];


/* ---------- PART 2: HELPERS ---------- */

const $  = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasMouse     = matchMedia('(hover: hover)').matches;
const hasGsap      = Boolean(window.gsap);


/* ---------- PART 3: FEATURES ---------- */

/* 1. Loading screen: counts 000 to 100, then reveals the page */
function startLoader() {
  const words = ['Design', 'Create', 'Inspire'];
  const word = $('#word'), count = $('#count'), bar = $('#bar i');
  let wordIndex = 0, startTime = null;

  word.textContent = words[0];
  word.style.transition = 'opacity .15s';

  const wordTimer = setInterval(() => {
    wordIndex = (wordIndex + 1) % words.length;
    word.style.opacity = 0;
    setTimeout(() => { word.textContent = words[wordIndex]; word.style.opacity = 0.8; }, 150);
  }, 900);

  function tick(now) {
    if (startTime === null) startTime = now;
    const progress = Math.min((now - startTime) / 2700, 1);
    count.textContent = String(Math.round(progress * 100)).padStart(3, '0');
    bar.style.transform = `scaleX(${progress})`;
    if (progress < 1) requestAnimationFrame(tick);
    else setTimeout(finish, 400);
  }

  function finish() {
    clearInterval(wordTimer);
    const loader = $('#loader');
    loader.style.opacity = 0;
    setTimeout(() => loader.remove(), 500);
    playHeroEntrance();
  }

  requestAnimationFrame(tick);
}

/* 2. Hero: entrance animation and rotating role word */
function playHeroEntrance() {
  document.body.classList.add('ready');   // CSS does the word reveal and the fade-in
}

function startRoleCycle() {
  let el = $('#role'), index = 0;
  setInterval(() => {
    index = (index + 1) % ROLES.length;
    const fresh = el.cloneNode();          // new node restarts the CSS animation
    fresh.textContent = ROLES[index];
    el.replaceWith(fresh);
    el = fresh;
  }, 2000);
}

/* 3. Navbar: shadow after scrolling, highlight the current section, progress bar */
function setupNavigation() {
  const pill = $('#pill'), progress = $('#prog');
  const links = $$('.nl[href^="#"]:not(.sayhi)');
  const sections = ['home', 'work', 'profile'];

  function onScroll() {
    pill.classList.toggle('s', scrollY > 100);
    const max = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${scrollY / (max || 1)})`;

    let current = 'home';
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top < innerHeight * 0.4) current = id;
    });
    links.forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + current));
  }
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* 4. Build the project cards and the thoughts list from PROJECTS */
function renderProjects() {
  const spans = ['c7', 'c5', 'c5', 'c7'];

  $('#bento').innerHTML = PROJECTS.slice(0, 4).map((p, i) => `
    <a class="card ${spans[i]} rv" href="#thought-${p.slug}">
      <div class="img" style="background:#111 url(${p.image}) center/cover"></div>
      <div class="ht"></div>
      <div class="hv"><span class="lab">View \u2014 <i class="disp">${p.name}</i></span></div>
    </a>`).join('');

  $('#jl').innerHTML = PROJECTS.map(p => `
    <a class="je rv" href="#thought-${p.slug}">
      <div class="th" style="background:#111 url(${p.image}) center/cover"></div>
      <h3>${p.title}</h3>
      <span class="m">${p.read}</span>
      <span class="m d">${p.tag}</span>
    </a>`).join('');
}

/* 5. Full "thought" pages: #thought-<slug> opens one, with a wipe transition */
function setupThoughtPages() {
  const page = $('#post'), wipe = $('#wipe');
  const isThought = hash => /^#thought-/.test(hash);
  let previousHash = location.hash;

  function showPage() {
    const slug = (location.hash.match(/^#thought-(.+)$/) || [])[1];
    const index = PROJECTS.findIndex(p => p.slug === slug);
    if (index < 0) {
      page.classList.remove('on');
      document.body.style.overflow = '';
      return;
    }
    const p = PROJECTS[index], next = PROJECTS[(index + 1) % PROJECTS.length];
    page.innerHTML = `
      <div class="pw">
        <a class="btn outl" href="#resume">\u2190 Back to thoughts</a>
        <p class="eyebrow" style="margin:0">${p.tag}, ${p.read}</p>
        <h1 class="disp">${p.title}</h1>
        <div class="pi" style="background:#111 url(${p.image}) center/cover"></div>
        <p class="lead">${p.lead}</p>
        ${p.text.map(t => `<p>${t}</p>`).join('')}
        <h3>What I focused on</h3>
        <ul>${p.points.map(t => `<li>${t}</li>`).join('')}</ul>
        <div class="nx"><a href="#resume">All thoughts</a><a href="#thought-${next.slug}">Next: ${next.name} \u2192</a></div>
      </div>`;
    page.scrollTop = 0;
    page.classList.add('on');
    document.body.style.overflow = 'hidden';
  }

  addEventListener('hashchange', () => {
    const involvesPage = isThought(previousHash) || isThought(location.hash);
    previousHash = location.hash;
    if (!involvesPage) return showPage();
    wipe.classList.remove('go');
    void wipe.offsetWidth;               // restart the CSS animation
    wipe.classList.add('go');
    setTimeout(showPage, 380);           // swap content while the screen is covered
  });
  showPage();
}

/* 6. 3D scroll reveal for cards, rows and stats (.rv), simple fade for the rest (.rvs) */
function setupReveal() {
  const fades = $$('.rvs'), items = $$('.rv');
  if (reduceMotion) { [...fades, ...items].forEach(el => el.classList.add('in', 'done')); return; }

  const seen = new Map();                       // stagger 90ms, in groups of four
  items.forEach(el => {
    const i = seen.get(el.parentElement) || 0;
    seen.set(el.parentElement, i + 1);
    el.style.setProperty('--d', (i % 4) * 90 + 'ms');
  });

  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      reveal.unobserve(el);
      el.classList.add('in');
      const delay = parseFloat(el.style.getPropertyValue('--d')) || 0;
      setTimeout(() => el.classList.add('done'), 1000 + delay + 50);   // then fast 0.2s hover transition
    });
  }, { threshold: 0.15 });
  items.forEach(el => reveal.observe(el));

  const fade = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('in'); fade.unobserve(entry.target); }
    });
  }, { threshold: 0.15 });
  fades.forEach(el => fade.observe(el));
}

/* 7. Explorations: pinned heading, parallax image columns, lightbox */
function setupGallery() {
  const rotations = [-4, 3, 5, -3, 4, -5];
  const lightbox = $('#lb'), lightboxImage = $('#lb div');

  $$('.col').forEach((column, c) => {
    for (let i = 0; i < 3; i++) {
      const k = c * 3 + i, src = PROJECTS[GALLERY[k]].image;
      const tile = document.createElement('div');
      tile.className = 'ex';
      tile.dataset.src = src;
      tile.style.background = `#111 url(${src}) center/cover`;
      tile.style.transform = `rotate(${rotations[k]}deg)`;
      column.appendChild(tile);
    }
  });

  document.addEventListener('click', e => {
    const tile = e.target.closest('.ex');
    if (tile) {
      lightboxImage.style.background = `#111 url(${tile.dataset.src}) center/cover`;
      lightbox.classList.add('on');
    } else if (e.target.closest('#lb')) {
      lightbox.classList.remove('on');
    }
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') lightbox.classList.remove('on'); });

  if (hasGsap && window.ScrollTrigger && !reduceMotion) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.create({ trigger: '#exp', start: 'top top', end: 'bottom bottom', pin: '#pin', pinSpacing: false });
    $$('.col').forEach(column => {
      gsap.to(column, {
        y: parseFloat(column.dataset.s), ease: 'none',
        scrollTrigger: { trigger: '#exp', start: 'top bottom', end: 'bottom top', scrub: true }
      });
    });
  }
}

/* 8. Text strips: skills band and the contact marquee */
function setupMarquees() {
  $('#sk').textContent = SKILLS.repeat(8);
  $('#mq').textContent = 'CONTACT US \u2022 '.repeat(10);
  if (hasGsap && !reduceMotion) gsap.to('#mq', { xPercent: -50, duration: 40, ease: 'none', repeat: -1 });
}

/* 9. "Send love" button: bursts of hearts */
function setupLoveButton() {
  const button = $('#love'), counter = $('#lc');
  let total = 0;
  button.addEventListener('click', () => {
    counter.textContent = ++total;
    const box = button.getBoundingClientRect();
    for (let i = 0; i < 8; i++) {
      const heart = document.createElement('span');
      heart.className = 'fh';
      heart.textContent = '\u2665';
      heart.style.left = box.left + box.width / 2 + Math.random() * 80 - 40 + 'px';
      heart.style.top = box.top + 'px';
      heart.style.fontSize = 14 + Math.random() * 18 + 'px';
      heart.style.animationDelay = i * 60 + 'ms';
      heart.style.setProperty('--dx', Math.random() * 120 - 60 + 'px');
      document.body.appendChild(heart);
      setTimeout(() => heart.remove(), 2400);
    }
  });
}

/* 10. About photo: 3D tilt that follows the mouse (gentle sway when idle) */
function setupAboutTilt() {
  const stage = $('#stage'), card = $('#c3');
  if (!stage || reduceMotion) return;
  stage.addEventListener('pointermove', e => {
    const r = stage.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    card.style.animation = 'none';
    card.style.transition = 'transform .12s ease-out';
    card.style.transform = `rotateY(${x * 26}deg) rotateX(${-y * 20}deg)`;
  });
  stage.addEventListener('pointerleave', () => {
    card.style.transition = card.style.transform = card.style.animation = '';
  });
}

/* 11. Mouse-only extras: cursor glow and magnetic buttons */
function setupDesktopEffects() {
  if (reduceMotion || !hasMouse) return;

  const glow = $('#glow');
  addEventListener('pointermove', e => {
    glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    glow.style.opacity = 1;
  }, { passive: true });

  document.addEventListener('pointermove', e => {
    const el = e.target.closest && e.target.closest('.btn, .nl');
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.translate = `${(e.clientX - r.left - r.width / 2) * 0.2}px ${(e.clientY - r.top - r.height / 2) * 0.3}px`;
    el._pulled = true;
  }, { passive: true });
  document.addEventListener('pointerout', e => {
    const el = e.target.closest && e.target.closest('.btn, .nl');
    if (el && el._pulled) { el.style.translate = ''; el._pulled = false; }
  });

}



/* 12. Headline: split into words, each inside an overflow:hidden mask */
function splitHeadline() {
  const h1 = $('#name');
  h1.innerHTML = h1.textContent.trim().split(/\s+/)
    .map((word, i) => `<span class="w" aria-hidden="true"><span style="--i:${i}">${word}</span></span>`)
    .join(' ');
}

/* 13. Hero left pane: the project list twice, so the CSS loop is seamless */
function renderStream() {
  const card = (p, copy) => `
    <a class="sc" href="#thought-${p.slug}" ${copy ? 'aria-hidden="true" tabindex="-1"' : ''}>
      <div class="img" style="background:#111 url(${p.image}) center/cover"></div>
      <div class="scm"><b>${p.name}</b><span>${p.tag}</span></div>
    </a>`;
  $('#track').innerHTML = PROJECTS.map(p => card(p, false)).join('') + PROJECTS.map(p => card(p, true)).join('');
}

/* 14. 3D tilt with a moving shine: stream cards 14deg, work cards 10deg, not for touch */
function setupTilt() {
  if (reduceMotion) return;
  document.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const el = e.target.closest && e.target.closest('.sc, .card');
    if (!el) return;
    const max = el.classList.contains('sc') ? 14 : 10;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--ry', (x - 0.5) * 2 * max + 'deg');
    el.style.setProperty('--rx', -(y - 0.5) * 2 * max + 'deg');
    el.style.setProperty('--mx', x * 100 + '%');
    el.style.setProperty('--my', y * 100 + '%');
  });
  document.addEventListener('pointerout', e => {
    const el = e.target.closest && e.target.closest('.sc, .card');
    if (el && !el.contains(e.relatedTarget)) { el.style.setProperty('--rx', '0deg'); el.style.setProperty('--ry', '0deg'); }
  });
}

/* 15. Hero "doors": the two panes swing open as you scroll (0 to 1 over 90% of the screen) */
function setupDoors() {
  if (reduceMotion) return;
  const left = $('#paneL'), right = $('#paneR'), phone = matchMedia('(max-width: 768px)');
  let waiting = false;
  function update() {
    waiting = false;
    const p = Math.min(Math.max(scrollY / (innerHeight * 0.9), 0), 1), scale = 1 - p * 0.1;
    if (phone.matches) {
      left.style.transform = right.style.transform = `perspective(1400px) rotateX(${p * 14}deg) scale(${scale})`;
    } else {
      left.style.transform  = `perspective(1400px) rotateY(${p * 38}deg) scale(${scale})`;
      right.style.transform = `perspective(1400px) rotateY(${-p * 38}deg) scale(${scale})`;
    }
    left.style.opacity = 1 - p * 0.5;     // fades to 50%
    right.style.opacity = 1 - p * 0.7;    // fades to 30%
  }
  addEventListener('scroll', () => { if (!waiting) { waiting = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener('resize', update);
  update();
}

/* 16. Cube: its rotation follows its distance from the middle of the screen */
function setupCube() {
  const cube = $('#cube'), wrap = $('#cubewrap');
  if (!cube || reduceMotion) return;
  let waiting = false;
  function update() {
    waiting = false;
    const r = wrap.getBoundingClientRect();
    const c = Math.max(-1, Math.min(1, (r.top + r.height / 2 - innerHeight / 2) / innerHeight));
    cube.style.transform = `rotateX(${-20 - c * 160}deg) rotateY(${30 + c * 220}deg)`;
  }
  addEventListener('scroll', () => { if (!waiting) { waiting = true; requestAnimationFrame(update); } }, { passive: true });
  update();
}

/* 17. Count-up numbers: start when 60% visible, 1.4s, ease-out cubic, keep the "+" */
function setupCountUp() {
  const els = $$('[data-count]');
  if (reduceMotion) return;                       // the final numbers are already in the HTML
  els.forEach(el => {
    el._target = parseFloat(el.dataset.count);
    el._suffix = el.dataset.suffix || '';
    el._decimals = (el.dataset.count.split('.')[1] || '').length;
    el.textContent = (0).toFixed(el._decimals) + el._suffix;
  });
  function run(el) {
    const start = performance.now();
    (function frame(now) {
      const k = Math.min((now - start) / 1400, 1);
      el.textContent = (el._target * (1 - Math.pow(1 - k, 3))).toFixed(el._decimals) + el._suffix;
      if (k < 1) requestAnimationFrame(frame);
    })(start);
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { observer.unobserve(entry.target); run(entry.target); } });
  }, { threshold: 0.6 });
  els.forEach(el => observer.observe(el));
}

/* 18. Round Menu button (magnetic) and the spring bottom dock */
function setupDock() {
  const dock = $('#dock'), backdrop = $('#dockbg'), button = $('#menu'), closeButton = $('#dockclose');

  // thumbnails: project pictures and your photo
  $$('#dock [data-t]').forEach(link => {
    const t = link.dataset.t;
    const src = t === 'me' ? $('#me').getAttribute('src') : PROJECTS[Number(t)].image;
    link.querySelector('.dt').style.backgroundImage = `url(${src})`;
  });

  const isOpen = () => dock.classList.contains('on');
  function open() {
    dock.classList.add('on'); backdrop.classList.add('on');
    dock.inert = false; dock.removeAttribute('aria-hidden');
    button.setAttribute('aria-expanded', 'true');
    closeButton.focus({ preventScroll: true });
  }
  function close(giveFocusBack = true) {
    dock.classList.remove('on'); backdrop.classList.remove('on');
    dock.inert = true; dock.setAttribute('aria-hidden', 'true');
    button.setAttribute('aria-expanded', 'false');
    if (giveFocusBack) button.focus({ preventScroll: true });
  }

  button.addEventListener('click', () => (isOpen() ? close() : open()));
  closeButton.addEventListener('click', () => close());
  backdrop.addEventListener('click', () => close());
  addEventListener('keydown', e => {
    if (!isOpen()) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'Tab') {                         // keep focus inside the dock
      const items = $$('button, a[href]', dock);
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
  $$('.dock-l a', dock).forEach(link => link.addEventListener('click', () => {
    close(false);                                  // tapping a link closes the dock ...
    const target = document.querySelector(link.getAttribute('href'));
    if (target) { target.setAttribute('tabindex', '-1'); target.focus({ preventScroll: true }); }   // ... and moves focus to that section
  }));

  // magnetic pull: inside 150px the button moves 30% of the distance towards the cursor
  if (reduceMotion) return;
  let offsetX = 0, offsetY = 0;
  document.addEventListener('pointermove', e => {
    if (e.pointerType === 'touch') return;
    const r = button.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2 - offsetX);
    const dy = e.clientY - (r.top + r.height / 2 - offsetY);
    const near = Math.hypot(dx, dy) < 150;
    offsetX = near ? dx * 0.3 : 0;
    offsetY = near ? dy * 0.3 : 0;
    button.style.setProperty('--mx', offsetX + 'px');
    button.style.setProperty('--my', offsetY + 'px');
  });
}


/* ---------- START ---------- */
splitHeadline();

startLoader();
startRoleCycle();
setupNavigation();
renderProjects();       // must run before setupReveal and setupDock
renderStream();
setupThoughtPages();
setupReveal();
setupGallery();
setupMarquees();
setupLoveButton();
setupAboutTilt();
setupDesktopEffects();
setupTilt();
setupDoors();
setupCube();
setupCountUp();
setupDock();
