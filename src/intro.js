// Resolves when the opening loader has lifted (immediately if there is none),
// so the hero can choreograph its entrance to follow it.
let resolve;
export const introDone = new Promise((r) => (resolve = r));
export const finishIntro = () => resolve();
