// Easing functions (t in [0,1] → eased [0,1]).
export const easeOutCubic   = (t) => 1 - Math.pow(1 - t, 3);
export const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
export const easeOutQuart   = (t) => 1 - Math.pow(1 - t, 4);
export const easeOutExpo    = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
