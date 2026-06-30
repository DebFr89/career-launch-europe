// Abstract "EMEA reach" constellation for the map/network motif.
// Coordinates are in a 0–100 box (not a literal geographic map — intentionally
// abstract, which is more on-brand and avoids geography nitpicks). Paris is the hub.
export const HUB = 'Paris';

export const CITIES = [
  { name: 'Paris',     x: 40, y: 53, hub: true },
  { name: 'London',    x: 31, y: 39 },
  { name: 'Dublin',    x: 20, y: 34 },
  { name: 'Amsterdam', x: 45, y: 33 },
  { name: 'Brussels',  x: 42, y: 43 },
  { name: 'Frankfurt', x: 53, y: 44 },
  { name: 'Munich',    x: 57, y: 55 },
  { name: 'Geneva',    x: 48, y: 61 },
  { name: 'Milan',     x: 56, y: 67 },
  { name: 'Madrid',    x: 22, y: 77 },
  { name: 'Stockholm', x: 62, y: 18 },
  { name: 'Dubai',     x: 88, y: 75 },
];
