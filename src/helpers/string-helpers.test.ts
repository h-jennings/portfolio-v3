import * as string_helpers from '@/helpers/string-helpers';
// @ponicode
describe('string_helpers.parseTagsToString', () => {
  test('0', () => {
    let result: any = string_helpers.parseTagsToString([
      'Pierre Edouard',
      'Michael',
    ]);
    expect(result).toBe('Pierre Edouard /  Michael');
  });

  test('1', () => {
    let result: any = string_helpers.parseTagsToString([
      'George',
      'Edmond',
      'George',
      'Jean-Philippe',
    ]);
    expect(result).toBe('George / Edmond / George /  Jean-Philippe');
  });

  test('2', () => {
    let result: any = string_helpers.parseTagsToString([]);
    expect(result).toBe('');
  });

  test('3', () => {
    let result: any = string_helpers.parseTagsToString([
      'Jean-Philippe',
      'Michael',
      'Edmond',
      'Michael',
      'Edmond',
    ]);
    expect(result).toBe('Michael / Edmond / Michael / Jean-Philippe /  Edmond');
  });
});
