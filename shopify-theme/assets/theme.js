/*
 * BRAISE — animations au scroll et au survol, sans dépendance (hors Lenis pour le défilement fluide).
 * Tout est désactivé ou simplifié quand l'utilisateur préfère réduire les animations.
 */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const desktop = window.matchMedia('(min-width: 1024px)');
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
  const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
  const map = (v, a, b, c, d) => c + (d - c) * clamp((v - a) / (b - a));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
  // Tâches exécutées à chaque image par la boucle d'animation unique (voir plus bas).
  const frameTasks = [];

  /* ---------- Défilement fluide ---------- */

  let lenis = null;
  if (!reduced && document.body.dataset.smooth !== 'false' && window.Lenis) {
    lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true });
  }

  const header = $('[data-header]');
  const headerOffset = () => (header ? header.offsetHeight + 24 : 0);

  function scrollToTarget(target) {
    if (lenis) {
      lenis.scrollTo(target, { offset: typeof target === 'number' ? 0 : -headerOffset(), force: true, duration: 1.2 });
    } else if (typeof target === 'number') {
      window.scrollTo({ top: target, behavior: reduced ? 'auto' : 'smooth' });
    } else {
      target.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
    }
  }

  // Liens d'ancre de la même page : défilement fluide au lieu d'un saut.
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href*="#"]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    if (url.pathname.replace(/\/$/, '') !== location.pathname.replace(/\/$/, '') || !url.hash) return;
    const target = url.hash === '#top' ? 0 : document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (target === null) return;
    event.preventDefault();
    setMenu(false);
    scrollToTarget(target);
    history.replaceState(null, '', url.hash);
  });

  /* ---------- En-tête ---------- */

  const progressBar = $('[data-progress]');
  const navLinks = $$('[data-nav-link]');
  const navPill = $('[data-nav-pill]');
  let activeLink = null;
  let hoveredLink = null;

  function placePill() {
    if (!navPill) return;
    const link = hoveredLink || activeLink;
    navLinks.forEach((l) => l.classList.toggle('is-on', l === link));
    if (!link) {
      navPill.style.opacity = '0';
      return;
    }
    navPill.style.opacity = '1';
    navPill.style.width = `${link.offsetWidth}px`;
    navPill.style.transform = `translateX(${link.offsetLeft}px)`;
  }

  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => { hoveredLink = link; placePill(); });
    link.addEventListener('focus', () => { hoveredLink = link; placePill(); });
    link.addEventListener('blur', () => { hoveredLink = null; placePill(); });
  });
  $('[data-nav]')?.addEventListener('mouseleave', () => { hoveredLink = null; placePill(); });

  // Scrollspy : met en avant la section visible au centre de l'écran.
  const spyTargets = navLinks
    .map((link) => {
      const hash = new URL(link.href, location.href).hash;
      const section = hash ? document.getElementById(hash.slice(1)) : null;
      return section ? { link, section } : null;
    })
    .filter(Boolean);
  if (spyTargets.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const match = spyTargets.find((t) => t.section === entry.target);
        if (match) {
          activeLink = match.link;
          placePill();
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    spyTargets.forEach((t) => spy.observe(t.section));
  }

  /* ---------- Menu mobile ---------- */

  const burger = $('[data-burger]');
  const mobileMenu = $('[data-mobile-menu]');
  let menuOpen = false;

  function setMenu(open) {
    if (!mobileMenu || open === menuOpen) return;
    menuOpen = open;
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
    header.classList.toggle('menu-open', open);
    if (open) {
      mobileMenu.hidden = false;
      requestAnimationFrame(() => requestAnimationFrame(() => mobileMenu.classList.add('is-open')));
      lenis?.stop();
      document.documentElement.style.overflow = 'hidden';
    } else {
      mobileMenu.classList.remove('is-open');
      lenis?.start();
      document.documentElement.style.overflow = '';
      setTimeout(() => { if (!menuOpen) mobileMenu.hidden = true; }, 700);
    }
  }
  burger?.addEventListener('click', () => setMenu(!menuOpen));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

  /* ---------- Apparitions au scroll ---------- */

  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-in');
      if (entry.target.dataset.counter !== undefined) runCounter(entry.target);
      obs.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px' });

  $$('[data-reveal], [data-reveal-scale], [data-reveal-side], [data-wordmark], [data-stock-fill], [data-counter]').forEach((el) => revealObserver.observe(el));
  $$('[data-reveal-text]').forEach((el) => {
    if (el.hasAttribute('data-immediate')) requestAnimationFrame(() => el.classList.add('is-in'));
    else revealObserver.observe(el);
  });

  function runCounter(el) {
    const target = parseFloat(el.dataset.counter) || 0;
    if (reduced) { el.textContent = target; return; }
    const start = performance.now();
    const tick = (now) => {
      const t = clamp((now - start) / 1800);
      el.textContent = Math.round(target * easeOutExpo(t)).toString();
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Journée d'hiver : chaque point s'allume quand la ligne l'atteint.
  const milestoneObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => entry.target.classList.toggle('is-reached', entry.isIntersecting || entry.boundingClientRect.top < 0));
  }, { rootMargin: '0px 0px -45% 0px' });
  $$('[data-milestone]').forEach((el) => milestoneObserver.observe(el));

  /* ---------- Mot rotatif du hero ---------- */

  $$('[data-rotator]').forEach((rotator) => {
    const words = (rotator.dataset.words || '').split(',').map((w) => w.trim()).filter(Boolean);
    if (words.length < 2 || reduced) return;
    const build = (word, cls) => {
      const span = document.createElement('span');
      span.className = `rotator__word ${cls}`;
      [...word].forEach((char, i) => {
        const c = document.createElement('span');
        c.className = 'rotator__char';
        c.style.transitionDelay = `${i * 0.03}s`;
        c.textContent = char;
        span.appendChild(c);
      });
      return span;
    };
    let index = 0;
    let current = rotator.querySelector('.rotator__word');
    current.replaceWith((current = build(words[0], '')));
    setInterval(() => {
      index = (index + 1) % words.length;
      const from = rotator.offsetWidth;
      const next = build(words[index], 'is-entering');
      current.classList.add('is-leaving');
      rotator.appendChild(next);
      // Anime la largeur de la pilule vers celle du nouveau mot.
      const style = getComputedStyle(rotator);
      const to = next.offsetWidth + parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
      rotator.style.width = `${from}px`;
      requestAnimationFrame(() => {
        rotator.style.width = `${to}px`;
        next.classList.remove('is-entering');
      });
      const leaving = current;
      current = next;
      setTimeout(() => leaving.remove(), 900);
    }, 2600);
  });

  /* ---------- Souris : aimant, inclinaison 3D, curseur ---------- */

  const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
  if (finePointer && !reduced) {
    window.addEventListener('pointermove', (e) => {
      mouse.x = e.clientX / window.innerWidth - 0.5;
      mouse.y = e.clientY / window.innerHeight - 0.5;
    }, { passive: true });

    $$('[data-magnetic]').forEach((el) => {
      const strength = parseFloat(el.dataset.strength) || 0.35;
      const state = { x: 0, y: 0, tx: 0, ty: 0 };
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        state.tx = (e.clientX - (r.left + r.width / 2)) * strength;
        state.ty = (e.clientY - (r.top + r.height / 2)) * strength;
      });
      el.addEventListener('pointerleave', () => { state.tx = 0; state.ty = 0; });
      frameTasks.push(() => {
        state.x = lerp(state.x, state.tx, 0.18);
        state.y = lerp(state.y, state.ty, 0.18);
        el.style.transform = `translate3d(${state.x.toFixed(2)}px, ${state.y.toFixed(2)}px, 0)`;
      });
    });

    $$('[data-tilt]').forEach((el) => {
      const max = 8;
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.classList.add('is-tilting');
        el.style.setProperty('--rx', `${(-py * 2 * max).toFixed(2)}deg`);
        el.style.setProperty('--ry', `${(px * 2 * max).toFixed(2)}deg`);
        el.style.setProperty('--ts', '1.02');
      });
      el.addEventListener('pointerleave', () => {
        el.classList.remove('is-tilting');
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.style.setProperty('--ts', '1');
      });
    });

    const cursor = $('.cursor');
    if (cursor) {
      const label = $('.cursor__label', cursor);
      const pos = { x: -100, y: -100, tx: -100, ty: -100 };
      window.addEventListener('pointermove', (e) => {
        pos.tx = e.clientX;
        pos.ty = e.clientY;
        cursor.classList.add('is-visible');
        const labelled = e.target.closest?.('[data-cursor]');
        cursor.classList.toggle('is-label', Boolean(labelled));
        cursor.classList.toggle('is-hover', !labelled && Boolean(e.target.closest?.('a, button, [role="tab"], label, summary')));
        if (labelled && label.textContent !== labelled.dataset.cursor) label.textContent = labelled.dataset.cursor;
      }, { passive: true });
      document.documentElement.addEventListener('pointerleave', () => cursor.classList.remove('is-visible'));
      frameTasks.push(() => {
        pos.x = lerp(pos.x, pos.tx, 0.35);
        pos.y = lerp(pos.y, pos.ty, 0.35);
        cursor.style.setProperty('--cx', `${pos.x.toFixed(1)}px`);
        cursor.style.setProperty('--cy', `${pos.y.toFixed(1)}px`);
      });
    }
  }

  /* ---------- Effets liés au scroll (une seule boucle d'animation) ---------- */

  const vh = () => window.innerHeight;

  // Hero : le galet monte et pivote doucement au scroll, et suit légèrement la souris.
  const hero = $('[data-hero]');
  const heroWarmer = hero && $('[data-hero-warmer]', hero);
  if (heroWarmer && !reduced) {
    const visual = $('[data-hero-visual]', hero);
    frameTasks.push(() => {
      mouse.sx = lerp(mouse.sx, mouse.x, 0.06);
      mouse.sy = lerp(mouse.sy, mouse.y, 0.06);
      const r = visual.getBoundingClientRect();
      if (r.bottom < 0) return;
      const vp = clamp((vh() - r.top) / (vh() + r.height));
      heroWarmer.style.setProperty('--hw-y', `${(map(vp, 0, 1, 8, -8) + mouse.sy * 4).toFixed(2)}%`);
      heroWarmer.style.setProperty('--hw-r', `${(map(vp, 0, 1, -6, 6) + mouse.sx * 6).toFixed(2)}deg`);
    });
  }

  // Produit : le scroll vertical fait défiler les cartes à l'horizontale (desktop).
  const showcase = $('[data-showcase]');
  if (showcase) {
    const track = $('[data-showcase-track]', showcase);
    const bar = $('[data-showcase-bar]', showcase);
    let distance = 0;
    let current = 0;
    const measure = () => {
      if (desktop.matches && !reduced) {
        showcase.classList.add('is-pinned');
        distance = Math.max(0, track.scrollWidth - window.innerWidth);
        showcase.style.height = `${window.innerHeight + distance}px`;
      } else {
        showcase.classList.remove('is-pinned');
        showcase.style.height = '';
        distance = 0;
        track.style.removeProperty('--sx');
      }
    };
    measure();
    window.addEventListener('resize', measure);
    desktop.addEventListener?.('change', measure);
    if ('ResizeObserver' in window) new ResizeObserver(measure).observe(track);
    frameTasks.push(() => {
      if (!distance) return;
      const r = showcase.getBoundingClientRect();
      const p = clamp(-r.top / (r.height - vh()));
      current = lerp(current, -p * distance, 0.2);
      track.style.setProperty('--sx', `${current.toFixed(1)}px`);
      bar?.style.setProperty('--p', p.toFixed(4));
    });
  }

  // Méthode : chaque carte rétrécit quand les suivantes s'empilent dessus.
  $$('[data-stack]').forEach((stack) => {
    if (reduced) return;
    const cards = $$('[data-stack-card]', stack);
    const total = cards.length;
    frameTasks.push(() => {
      const r = stack.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh()) return;
      const p = clamp(-r.top / Math.max(1, r.height - vh()));
      cards.forEach((card, i) => {
        const target = 1 - (total - 1 - i) * 0.05;
        card.style.setProperty('--s', map(p, i / total, 1, 1, target).toFixed(4));
      });
    });
  });

  // Journée d'hiver : la ligne se dessine au scroll.
  $$('[data-timeline]').forEach((timeline) => {
    const fill = $('[data-timeline-fill]', timeline);
    let current = 0;
    frameTasks.push(() => {
      const r = timeline.getBoundingClientRect();
      const p = clamp((0.7 * vh() - r.top) / (r.height + 0.15 * vh()));
      current = reduced ? p : lerp(current, p, 0.15);
      fill.style.setProperty('--p', current.toFixed(4));
    });
  });

  // Appel final : typographie géante qui glisse en sens inverse.
  $$('[data-final-cta]').forEach((section) => {
    if (reduced) return;
    const left = $('[data-final-row="left"]', section);
    const right = $('[data-final-row="right"]', section);
    frameTasks.push(() => {
      const r = section.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh()) return;
      const p = clamp((vh() - r.top) / (vh() + r.height));
      left.style.setProperty('--fx', `${map(p, 0, 1, 5, -35).toFixed(2)}%`);
      right.style.setProperty('--fx', `${map(p, 0, 1, -40, 0).toFixed(2)}%`);
    });
  });

  // Bandeaux : vitesse et sens suivent le scroll.
  let lastScrollY = window.scrollY;
  let scrollVelocity = 0;
  let scrollDirection = 1;
  $$('[data-vmarquee]').forEach((marquee) => {
    if (reduced) return;
    const track = $('[data-vmarquee-track]', marquee);
    const group = track.firstElementChild;
    const base = parseFloat(marquee.dataset.velocity) || 2;
    let offset = 0;
    let groupWidth = group.offsetWidth;
    window.addEventListener('resize', () => { groupWidth = group.offsetWidth; });
    frameTasks.push((dt) => {
      if (!groupWidth) groupWidth = group.offsetWidth;
      const boost = 1 + Math.min(Math.abs(scrollVelocity) / 400, 6);
      offset += base * scrollDirection * boost * dt * 0.04 * (groupWidth / 100);
      offset = ((offset % groupWidth) + groupWidth) % groupWidth;
      track.style.transform = `translate3d(${(-offset).toFixed(2)}px, 0, 0)`;
    });
  });

  // En-tête, barre de progression, badge flottant.
  const floating = $('[data-floating-order]');
  if (floating) floating.hidden = false;
  // Inutile d'afficher le badge quand le choix des packs est déjà à l'écran.
  let packsVisible = false;
  const packsSection = document.getElementById('packs');
  if (floating && packsSection) {
    new IntersectionObserver(([entry]) => { packsVisible = entry.isIntersecting; }).observe(packsSection);
  }
  let headerHidden = false;
  frameTasks.push(() => {
    const y = window.scrollY;
    const max = document.documentElement.scrollHeight - vh();
    const progress = max > 0 ? y / max : 0;
    if (header) {
      const goingDown = y > lastScrollY;
      if (Math.abs(y - lastScrollY) > 2) {
        const hide = goingDown && y > 240 && !menuOpen;
        if (hide !== headerHidden) {
          headerHidden = hide;
          header.classList.toggle('is-hidden', hide);
        }
      }
      header.classList.toggle('is-scrolled', y > 8);
      if (y < 300 && activeLink) { activeLink = null; placePill(); }
    }
    progressBar?.style.setProperty('--progress', progress.toFixed(4));
    floating?.classList.toggle('is-visible', y > 900 && progress < 0.94 && !packsVisible);
  });

  let lastTime = performance.now();
  function frame(time) {
    const dt = Math.min(64, time - lastTime);
    lastTime = time;
    lenis?.raf(time);
    const y = window.scrollY;
    const delta = y - lastScrollY;
    scrollVelocity = lerp(scrollVelocity, dt > 0 ? (delta / dt) * 1000 : 0, 0.2);
    if (Math.abs(delta) > 0.5) scrollDirection = delta > 0 ? 1 : -1;
    for (const task of frameTasks) task(dt);
    lastScrollY = y;
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

  /* ---------- Niveaux de chaleur (onglets) ---------- */

  $$('[data-heat-section]').forEach((section) => {
    const tabs = $$('[data-heat-tab]', section);
    const panels = $$('[data-heat-panel]', section);
    const pill = $('[data-heat-pill]', section);
    const visual = $('[data-heat-visual]', section);
    const warmerWrap = $('[data-heat-warmer]', section);
    const warmer = $('.hw', warmerWrap);
    const chip = $('[data-heat-chip]', section);
    const chipTemp = $('[data-heat-chip-temp]', section);
    const chipLabel = $('[data-heat-chip-label]', section);
    const colorLabel = $('[data-heat-color-label]', section);
    const AUTOPLAY = 4500;
    let index = 0;
    let autoplay = !reduced;
    let inView = false;
    let timer = null;

    const placeTabPill = () => {
      const tab = tabs[index];
      if (!tab || !pill) return;
      pill.style.width = `${tab.offsetWidth}px`;
      pill.style.transform = `translateX(${tab.offsetLeft}px)`;
    };

    const schedule = () => {
      clearTimeout(timer);
      tabs.forEach((t) => t.classList.remove('is-autoplay'));
      if (!autoplay || !inView) return;
      const tab = tabs[index];
      void tab.offsetWidth;
      tab.classList.add('is-autoplay');
      timer = setTimeout(() => select((index + 1) % tabs.length, false), AUTOPLAY);
    };

    function select(i, fromUser) {
      if (fromUser) autoplay = false;
      index = i;
      tabs.forEach((tab, j) => {
        tab.setAttribute('aria-selected', String(j === i));
        tab.tabIndex = j === i ? 0 : -1;
      });
      panels.forEach((panel, j) => panel.classList.toggle('is-active', j === i));
      const panel = panels[i];
      visual.style.setProperty('--heat', panel.dataset.color);
      warmer.dataset.level = String(Math.min(3, i + 1));
      chipTemp.textContent = `${panel.dataset.temp}°`;
      chipLabel.textContent = panel.dataset.label;
      chip.classList.remove('is-pop');
      void chip.offsetWidth;
      chip.classList.add('is-pop');
      placeTabPill();
      schedule();
    }

    tabs.forEach((tab, i) => tab.addEventListener('click', () => select(i, true)));
    $('[data-heat-tabs]', section).addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const next = (index + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      select(next, true);
      tabs[next].focus();
    });

    $$('[data-heat-color]', section).forEach((input) => {
      input.addEventListener('change', () => {
        colorLabel.textContent = input.dataset.label;
        warmerWrap.classList.add('is-swapping');
        setTimeout(() => {
          warmer.dataset.color = input.value;
          warmerWrap.classList.remove('is-swapping');
        }, reduced ? 0 : 250);
      });
    });

    new IntersectionObserver(([entry]) => {
      inView = entry.isIntersecting;
      schedule();
    }, { rootMargin: '-20% 0px -20% 0px' }).observe(section);

    window.addEventListener('resize', placeTabPill);
    document.fonts?.ready.then(placeTabPill);
    select(0, false);
    chip.classList.remove('is-pop');
  });

  /* ---------- FAQ ---------- */

  $$('[data-faq]').forEach((item, _, all) => {
    const button = $('button', item);
    button.addEventListener('click', () => {
      const open = !item.classList.contains('is-open');
      all.forEach((other) => {
        other.classList.remove('is-open');
        $('button', other).setAttribute('aria-expanded', 'false');
      });
      item.classList.toggle('is-open', open);
      button.setAttribute('aria-expanded', String(open));
    });
  });

  /* ---------- Compte à rebours ---------- */

  $$('[data-countdown]').forEach((el) => {
    const target = new Date(`${el.dataset.countdown}T00:00:00`).getTime();
    if (Number.isNaN(target)) return;
    const values = $$('[data-unit]', el);
    const tick = () => {
      const diff = Math.max(0, target - Date.now());
      const parts = [
        Math.floor(diff / 86400000),
        Math.floor((diff / 3600000) % 24),
        Math.floor((diff / 60000) % 60),
        Math.floor((diff / 1000) % 60),
      ];
      parts.forEach((value, i) => {
        const text = String(Math.min(99, value)).padStart(2, '0');
        $$('.digit__col', values[i]).forEach((col, j) => col.style.setProperty('--n', text[j]));
      });
    };
    tick();
    setInterval(tick, 1000);
  });

  /* ---------- Offre limitée (date de fin fixe) ---------- */

  const promos = $$('[data-promo-end]');
  if (promos.length) {
    const tickPromos = () => {
      promos.forEach((el) => {
        const end = new Date(`${el.dataset.promoEnd}T23:59:59`).getTime();
        const diff = end - Date.now();
        if (Number.isNaN(end) || diff <= 0) { el.hidden = true; return; }
        const parts = [Math.floor(diff / 86400000), Math.floor((diff / 3600000) % 24), Math.floor((diff / 60000) % 60), Math.floor((diff / 1000) % 60)];
        const left = $('[data-promo-left]', el);
        if (left) left.textContent = `${parts[0]} j ${String(parts[1]).padStart(2, '0')} h ${String(parts[2]).padStart(2, '0')} min ${String(parts[3]).padStart(2, '0')} s`;
        $$('[data-promo-unit]', el).forEach((u, i) => { u.textContent = String(parts[i]).padStart(2, '0'); });
      });
    };
    tickPromos();
    setInterval(tickPromos, 1000);
  }

  /* ---------- Choix du pack + coloris ---------- */

  function formatMoney(cents, format) {
    const value = cents / 100;
    const fmt = (n, decimals, thousands, decimal) => {
      const [int, dec] = n.toFixed(decimals).split('.');
      return int.replace(/\B(?=(\d{3})+(?!\d))/g, thousands) + (dec ? decimal + dec : '');
    };
    const replacements = {
      amount: () => fmt(value, 2, ',', '.'),
      amount_no_decimals: () => fmt(value, 0, ',', '.'),
      amount_with_comma_separator: () => fmt(value, 2, '.', ','),
      amount_no_decimals_with_comma_separator: () => fmt(value, 0, '.', ','),
      amount_with_space_separator: () => fmt(value, 2, ' ', ','),
      amount_no_decimals_with_space_separator: () => fmt(value, 0, ' ', ','),
      amount_with_apostrophe_separator: () => fmt(value, 2, "'", '.'),
    };
    const template = format || '{{amount_with_comma_separator}} €';
    return template.replace(/\{\{\s*(\w+)\s*\}\}/, (_, key) => (replacements[key] || replacements.amount)());
  }

  $$('[data-buybox]').forEach((box) => {
    const product = JSON.parse($('[data-product-json]', box).textContent);
    const packIndex = parseInt(box.dataset.packIndex, 10) || 0;
    const colorIndex = parseInt(box.dataset.colorIndex, 10) || 0;
    const moneyFormat = box.dataset.moneyFormat;
    let photos = {};
    try { photos = JSON.parse(box.dataset.photos || '{}'); } catch (e) { photos = {}; }
    const variantInput = $('[data-variant-id]', box);
    const submit = $('[data-submit]', box);
    const ctaLabels = $$('[data-cta-label]', box);
    const colorLabel = $('[data-color-label]', box);
    const packs = $$('[data-pack]', box);
    const form = $('[data-buybox-form]', box) || $('form', box);
    const error = $('[data-buybox-error]', box);

    const selectedPack = () => $('[data-pack-input]:checked', box)?.value;
    const selectedColor = () => $('[data-color-input]:checked', box)?.value;
    const optionOf = (variant, index) => (index ? variant.options[index - 1] : null);
    const findVariant = (pack, color) =>
      product.variants.find((v) =>
        (!packIndex || optionOf(v, packIndex) === pack) && (!colorIndex || optionOf(v, colorIndex) === color));
    const handleize = (s) => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

    function update() {
      const color = selectedColor();
      // Prix de référence : le pack ×1 du coloris choisi.
      const unitVariant = packs.map((p) => findVariant($('[data-pack-input]', p).value, color)).find((v, i) => v && parseInt(packs[i].dataset.qty, 10) === 1);
      const unitPrice = unitVariant ? unitVariant.price : null;

      packs.forEach((packEl) => {
        const input = $('[data-pack-input]', packEl);
        const qty = parseInt(packEl.dataset.qty, 10) || 1;
        const variant = findVariant(input.value, color);
        packEl.classList.toggle('is-selected', input.checked);
        if (!variant) return;
        $('[data-pack-price]', packEl).textContent = formatMoney(variant.price, moneyFormat);
        $('[data-pack-unit]', packEl).textContent = formatMoney(Math.round(variant.price / qty), moneyFormat);
        const savingEl = $('[data-pack-saving]', packEl);
        if (unitPrice && qty > 1) {
          const full = unitPrice * qty;
          const saving = full - variant.price;
          savingEl.hidden = saving <= 0;
          $('[data-pack-saving-amount]', packEl).textContent = formatMoney(saving, moneyFormat);
          $('[data-pack-saving-percent]', packEl).textContent = Math.round((saving / full) * 100);
        }
        if (color) {
          const photo = $('[data-color-photo]', packEl);
          const src = photos[handleize(color)];
          if (photo && src && !photo.src.endsWith(src.replace(/^https?:/, ''))) {
            photo.classList.add('is-swapping');
            setTimeout(() => { photo.src = src; photo.alt = `Chauffe-mains coloris ${color}`; photo.classList.remove('is-swapping'); }, reduced ? 0 : 200);
          }
        }
      });

      if (colorLabel && color) colorLabel.textContent = color;
      const pack = selectedPack();
      const variant = findVariant(pack, color);
      if (!variant) {
        submit.disabled = true;
        ctaLabels.forEach((l) => { l.textContent = 'Indisponible'; });
        return;
      }
      variantInput.value = variant.id;
      submit.disabled = !variant.available;
      const packName = packIndex ? pack.split('×')[0].trim() : '';
      const label = variant.available
        ? `Commander${packName ? ` le pack ${packName}` : ''} — ${formatMoney(variant.price, moneyFormat)}`
        : 'Épuisé';
      ctaLabels.forEach((l) => { l.textContent = label; });
    }

    box.addEventListener('change', (e) => {
      if (e.target.matches('[data-pack-input], [data-color-input]')) update();
    });

    // Ajout au panier puis paiement direct. Repli : envoi classique du formulaire (return_to=/checkout).
    form?.addEventListener('submit', async (e) => {
      if (!window.fetch) return;
      e.preventDefault();
      error.hidden = true;
      submit.disabled = true;
      try {
        const root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || '/';
        const res = await fetch(`${root}cart/add.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ items: [{ id: Number(variantInput.value), quantity: 1 }] }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.description || data.message || 'Impossible d\'ajouter ce pack au panier.');
        }
        window.location.href = `${root}checkout`;
      } catch (err) {
        error.textContent = err.message;
        error.hidden = false;
        submit.disabled = false;
      }
    });

    update();
  });
})();
