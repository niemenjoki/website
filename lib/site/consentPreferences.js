// Googlen suostumusikkuna (Funding Choices) avataan uudelleen, jos se on ladattu.
export function openConsentPreferences() {
  try {
    const googlefc = globalThis.window?.googlefc;
    if (typeof googlefc?.showRevocationMessage !== 'function') return false;
    googlefc.showRevocationMessage();
    return true;
  } catch {
    return false;
  }
}
