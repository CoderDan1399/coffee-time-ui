import { newId } from './new-id';

describe('newId tests', () => {
  it('generates unique ids', () => {
    expect(newId()).not.toEqual(newId());
  });
});
