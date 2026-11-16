export const SNIPPET_MAX = 60;

export function snippet(text: string) {
  if (text.length <= SNIPPET_MAX) return text;
  return `${text.slice(0, SNIPPET_MAX).trimEnd()}...`;
}
