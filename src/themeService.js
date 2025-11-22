export function cleanThemes(themes) {
  return [...new Set(themes.map((t) => t.trim().toLowerCase()))];
}