// Client-side behavior for the house: light switch, project modals, room slide-in, nav scrollspy.

const THEME_KEY = 'house-theme';
const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ---- Light switch ----
function syncSwitches() {
  const on = root.dataset.theme === 'light';
  document.querySelectorAll<HTMLButtonElement>('[data-light-switch]').forEach((b) => {
    b.setAttribute('aria-pressed', String(on));
    b.setAttribute('aria-label', on ? 'Turn the lights off' : 'Turn the lights on');
  });
}

function setTheme(theme: 'light' | 'dark') {
  if (theme === 'light') root.dataset.theme = 'light';
  else delete root.dataset.theme;
  try {
    localStorage.setItem(THEME_KEY, theme);
  } catch {}
  syncSwitches();
}

document.addEventListener('click', (e) => {
  const sw = (e.target as Element).closest('[data-light-switch]');
  if (!sw) return;
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  if (reduceMotion) return setTheme(next);
  // Flicker, swap mid-flicker, settle
  root.classList.add('is-flickering');
  setTimeout(() => setTheme(next), 260);
  setTimeout(() => root.classList.remove('is-flickering'), 680);
});
syncSwitches();

// ---- Project modals ----
function openModal(id: string) {
  const dialog = document.getElementById(id);
  if (!(dialog instanceof HTMLDialogElement)) return false;
  dialog.querySelectorAll<HTMLIFrameElement>('iframe[data-src]').forEach((f) => {
    if (!f.src || f.src === 'about:blank') f.src = f.dataset.src!;
  });
  dialog.showModal();
  (window as any).Prism?.highlightAllUnder?.(dialog);
  return true;
}

document.addEventListener('click', (e) => {
  const trigger = (e.target as Element).closest<HTMLElement>('[data-open-modal]');
  if (!trigger) return;
  if (openModal(trigger.dataset.openModal!)) e.preventDefault();
});

document.querySelectorAll<HTMLDialogElement>('dialog.modal').forEach((dialog) => {
  // Click on the backdrop (the dialog box itself, outside the sheet) closes it
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });
  // Stop any playing videos
  dialog.addEventListener('close', () => {
    dialog.querySelectorAll<HTMLIFrameElement>('iframe[data-src]').forEach((f) => (f.src = 'about:blank'));
    if (location.hash === `#${dialog.id}`) history.replaceState(null, '', location.pathname + location.search);
  });
});

// Deep link: /#five-mics opens that project
if (location.hash) openModal(decodeURIComponent(location.hash.slice(1)));

// ---- Rooms slide in as you reach them ----
const rooms = [...document.querySelectorAll<HTMLElement>('[data-room]')];
if (rooms.length && 'IntersectionObserver' in window && !reduceMotion) {
  const reveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.remove('is-pending');
          reveal.unobserve(en.target);
        }
      });
    },
    { rootMargin: '0px 0px -12% 0px' },
  );
  rooms.forEach((el) => {
    if (el.getBoundingClientRect().top < innerHeight * 0.9) return;
    el.classList.add('is-pending');
    reveal.observe(el);
  });
}

// ---- Nav: underline the room you're standing in ----
const links = new Map<string, HTMLElement>();
document.querySelectorAll<HTMLElement>('[data-room-link]').forEach((a) => links.set(a.dataset.roomLink!, a));
if (rooms.length && links.size && 'IntersectionObserver' in window) {
  const spy = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (!en.isIntersecting) return;
        links.forEach((a) => a.classList.remove('is-current'));
        links.get(en.target.id)?.classList.add('is-current');
      });
    },
    { rootMargin: '-45% 0px -50% 0px' },
  );
  rooms.forEach((r) => spy.observe(r));
}
