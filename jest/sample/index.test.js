import { add } from "./index";

it('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});


it('adds undefined + 2 to equal NaN', () => {
  expect(add(undefined, 2)).toBe(NaN);
});
