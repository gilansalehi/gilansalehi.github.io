(() => {
  const storageKey = 'gilansalehi:settings';
  const defaults = Object.freeze({
    themeColor1: '#ffffff',
    themeColor2: '#95adb2',
    themeColor3: '#9a6565',
    menuPosition: 'top-left',
    reduceMotion: false,
  });

  const colorPattern = /^#[0-9a-f]{6}$/i;
  const menuPositions = new Set(['top-left', 'top-right', 'bottom-left', 'bottom-right']);

  const normalize = value => ({
    themeColor1: colorPattern.test(value?.themeColor1) ? value.themeColor1 : defaults.themeColor1,
    themeColor2: colorPattern.test(value?.themeColor2) ? value.themeColor2 : defaults.themeColor2,
    themeColor3: colorPattern.test(value?.themeColor3) ? value.themeColor3 : defaults.themeColor3,
    menuPosition: menuPositions.has(value?.menuPosition) ? value.menuPosition : defaults.menuPosition,
    reduceMotion: value?.reduceMotion === true,
  });

  const read = () => {
    try {
      return normalize(JSON.parse(localStorage.getItem(storageKey)));
    } catch {
      return { ...defaults };
    }
  };

  const apply = (value = read()) => {
    const settings = normalize(value);
    const root = document.documentElement;

    root.style.setProperty('--theme-color-1', settings.themeColor1);
    root.style.setProperty('--theme-color-2', settings.themeColor2);
    root.style.setProperty('--theme-color-3', settings.themeColor3);
    root.dataset.menuPosition = settings.menuPosition;
    root.toggleAttribute('data-reduce-motion', settings.reduceMotion);

    return settings;
  };

  const save = changes => {
    const settings = normalize({ ...read(), ...changes });

    try {
      localStorage.setItem(storageKey, JSON.stringify(settings));
    } catch {}

    return apply(settings);
  };

  const reset = () => {
    try {
      localStorage.removeItem(storageKey);
    } catch {}

    return apply(defaults);
  };

  window.siteSettings = Object.freeze({ defaults, read, apply, save, reset });
  apply();
})();
