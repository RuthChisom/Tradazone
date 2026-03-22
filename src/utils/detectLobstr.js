// utils/detectLobstr.js
// We wait for window.lobstr to appear.
export function waitForLobstr(timeout = 3000) {
  return new Promise((resolve) => {
    if (window.lobstr) {
      return resolve(true);
    }

    const interval = setInterval(() => {
      if (window.lobstr) {
        clearInterval(interval);
        clearTimeout(timer);
        resolve(true);
      }
    }, 100);

    const timer = setTimeout(() => {
      clearInterval(interval);
      resolve(false);
    }, timeout);
  });
}
