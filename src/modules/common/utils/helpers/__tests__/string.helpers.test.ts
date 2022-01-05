import * as string_helpers from '@common/utils/helpers/string.helpers';
// @ponicode
describe('string_helpers.parseTagsToString', () => {
  test('0', () => {
    let result: any = string_helpers.parseTagsToString([
      'Pierre Edouard',
      'Michael',
    ]);
    expect(result).toBe('Pierre Edouard + Michael');
  });

  test('1', () => {
    let result: any = string_helpers.parseTagsToString([
      'George',
      'Edmond',
      'George',
      'Jean-Philippe',
    ]);
    expect(result).toBe('George + Edmond + George + Jean-Philippe');
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
    expect(result).toBe('Michael + Edmond + Michael + Jean-Philippe + Edmond');
  });
});

// @ponicode
describe('string_helpers.commaSeparated', () => {
  test('0', () => {
    let result: any = string_helpers.commaSeparated([
      'foo bar',
      'This is a Text',
      'Foo bar',
    ]);
    expect(result).toBe('foo bar, This is a Text, Foo bar');
  });

  test('1', () => {
    let result: any = string_helpers.commaSeparated([
      'Hello, world!',
      'Foo bar',
    ]);
    expect(result).toBe('Hello, world!, Foo bar');
  });

  test('2', () => {
    let result: any = string_helpers.commaSeparated([
      'This is a Text',
      'Hello, world!',
      'Hello, world!',
    ]);
    expect(result).toBe('This is a Text, Hello, world!, Hello, world!');
  });

  test('3', () => {
    let result: any = string_helpers.commaSeparated([]);
    expect(result).toBe('');
  });

  test('4', () => {
    let result: any = string_helpers.commaSeparated(
      undefined as unknown as any[],
    );
    expect(result).toBe('');
  });
});
