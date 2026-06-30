// A SINGLE shared requestAnimationFrame loop.
// Every animated component subscribes here instead of starting its own rAF, so
// multiple canvases share one loop (much kinder to phone batteries/CPUs).

const subscribers = new Set();
let running = false;
let last = 0;

function frame(now) {
  const dt = last ? (now - last) / 1000 : 0;
  last = now;
  // Clamp dt so a backgrounded tab returning doesn't jump animations.
  const delta = Math.min(dt, 0.05);
  for (const fn of subscribers) {
    try { fn(delta, now); } catch (e) { console.error('[raf] subscriber error', e); }
  }
  if (subscribers.size > 0) {
    requestAnimationFrame(frame);
  } else {
    running = false;
    last = 0;
  }
}

/** Add a tick function (delta seconds, timestamp ms). Returns an unsubscribe fn. */
export function addTick(fn) {
  subscribers.add(fn);
  if (!running) {
    running = true;
    requestAnimationFrame(frame);
  }
  return () => removeTick(fn);
}

export function removeTick(fn) {
  subscribers.delete(fn);
}
