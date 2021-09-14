import { defined } from './defined';

const tests: [input: unknown, expected: boolean][] = [
	[undefined, false],
	[null, false],
	['', true],
	['foo', true],
	[0, true],
	[{}, true],
	[1, true],
	[new Error(), true]
];

it.each(tests)('returns the expected value', (input, expected) => {
	expect(defined(input)).toBe(expected);
});
