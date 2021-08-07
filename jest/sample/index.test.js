import { add, n } from "./index";

it('adds 1 + 2 to equal 3', () => {
  expect(add(1, 2)).toBe(3);
});

it('adds 1 + 2 to equal 3', () => {
  expect(add("a", 2)).toHaveProperty("a");
});


it('adds undefined + 2 to equal NaN', () => {
  expect(n({a: "a"})).toHaveProperty("a");
});


test("1+2が3になること", () => {
  const result = add(1, 2);

  expect(result).toBe(3);
})