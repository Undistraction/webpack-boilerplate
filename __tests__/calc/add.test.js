import add from '../../app/js/calc/add';


describe('addition', () => {
  it('Adds 1 + 2 to equal 3', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('Adds -1 + -5 to equal -6', () => {
    expect(add(-1, -5)).toBe(-6);
  });

  it('Adds 0 + 0 to equal 0', () => {
    expect(add(0, 0)).toBe(0);
  });
});
