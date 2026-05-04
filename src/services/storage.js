const STORAGE_PREFIX = 'makerscript:';

export function getStoredValue(key, fallback) {
  try {
    const rawValue = window.localStorage.getItem(`${STORAGE_PREFIX}${key}`);
    return rawValue ? JSON.parse(rawValue) : fallback;
  } catch (error) {
    console.warn(`Could not read ${key} from localStorage`, error);
    return fallback;
  }
}

export function setStoredValue(key, value) {
  try {
    window.localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
  } catch (error) {
    console.warn(`Could not save ${key} to localStorage`, error);
  }
}

export function toggleStoredId(key, id) {
  const currentIds = getStoredValue(key, []);
  const nextIds = currentIds.includes(id)
    ? currentIds.filter((item) => item !== id)
    : [...currentIds, id];

  setStoredValue(key, nextIds);
  return nextIds;
}
