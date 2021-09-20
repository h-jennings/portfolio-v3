import * as add from './add';
// @ponicode
describe('add.add', () => {
  test('0', () => {
    let result: any = add.add(-100, 0);
    expect(result).toBe(-100);
  });

  test('1', () => {
    let result: any = add.add(110, -5.48);
    expect(result).toBe(104.52);
  });

  test('2', () => {
    let callFunction: any = () => {
      add.add(-6.48, -6.48);
    };

    expect(callFunction).not.toThrow();
  });

  test('3', () => {
    let callFunction: any = () => {
      add.add(-100, -100);
    };

    expect(callFunction).not.toThrow();
  });

  test('4', () => {
    let callFunction: any = () => {
      add.add(100, 1);
    };

    expect(callFunction).not.toThrow();
  });

  test('5', () => {
    let result: any = add.add(Infinity, Infinity);
    expect(result).toBe(Infinity);
  });
});
