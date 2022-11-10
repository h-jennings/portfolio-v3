export function parseTagsToString(tags: string[]): string {
  return tags.reduce((acc, curr, idx) => {
    if (tags.length === 0) return '';
    if (tags.length === 1) {
      return `${curr}`;
    }
    if (idx === tags.length - 1) {
      return `${acc}${curr}`;
    }
    return `${curr} + ${acc}`;
  }, '');
}
