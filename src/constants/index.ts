export const QUAYS_USER = "QUAYS_USER";
export const QUAYS_USER_TOKEN = "QUAYS_USER_TOKEN";
export const QUAYS_USER_REFRESH_TOKEN = "QUAYS_USER_REFRESH_TOKEN";
export const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
export const FILE_SIZE = 5_000_000;

export const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 1023px)");
export const dayMaxAge = { maxAge: 24 * 60 * 60 * 1000 };

// Detect if device is mobile
export const isMobileDevice =
  typeof window !== "undefined" &&
  (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i));
