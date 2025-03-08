/**
 * Loads a string from cookies.
 *
 * @param key The key to fetch.
 */
export function loadString(key: string): string | null {
  try {
    const match = document.cookie.match(new RegExp(`(^| )${key}=([^;]+)`));
    return match ? decodeURIComponent(match[2]) : null;
  } catch {
    return null;
  }
}

/**
 * Saves a string to cookies.
 *
 * @param key The key to store.
 * @param value The value to store.
 * @param days Expiry in days (default: 7 days).
 */
export function saveString(key: string, value: string, days = 7): boolean {
  try {
    const expires = new Date();
    expires.setDate(expires.getDate() + days);
    document.cookie = `${key}=${encodeURIComponent(value)}; path=/; expires=${expires.toUTCString()}`;
    return true;
  } catch {
    return false;
  }
}

/**
 * Loads something from cookies and runs it through JSON.parse.
 *
 * @param key The key to fetch.
 */
export function load<T = object>(key: string): T | null {
  try {
    const value = loadString(key);
    return value ? JSON.parse(value) : null;
  } catch {
    return null;
  }
}

/**
 * Saves an object to cookies.
 *
 * @param key The key to store.
 * @param value The value to store.
 * @param days Expiry in days (default: 7 days).
 */
export function save(key: string, value: unknown, days = 7): boolean {
  try {
    return saveString(key, JSON.stringify(value), days);
  } catch {
    return false;
  }
}

/**
 * Removes a cookie.
 *
 * @param key The key to remove.
 */
export function remove(key: string): boolean {
  try {
    document.cookie = `${key}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC`;
    return true;
  } catch {
    return false;
  }
}

/**
 * Clears all cookies (WARNING: Affects all stored cookies).
 */
export function clear(): boolean {
  try {
    document.cookie.split(";").forEach((cookie) => {
      const key = cookie.split("=")[0].trim();
      remove(key);
    });
    return true;
  } catch {
    return false;
  }
}

const cookieStorage = {
  loadString,
  saveString,
  load,
  save,
  remove,
  clear,
};

export default cookieStorage;
