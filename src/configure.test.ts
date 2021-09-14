import { configure } from './configure';

import { getTrueVals } from './utils/trueVals';
import { getFalseVals } from './utils/falseVals';

beforeEach(() => {
	jest.resetModules();
});

it('can add additional values', () => {
	configure({
		trueVals: ['yes'],
		falseVals: ['no']
	});

	expect(getTrueVals()).toMatchInlineSnapshot(`
Array [
  "true",
  "1",
  "yes",
]
`);
	expect(getFalseVals()).toMatchInlineSnapshot(`
Array [
  "false",
  "0",
  "no",
]
`);
});

it('can override true vals', () => {
	configure({
		override: {
			trueVals: ['yes']
		}
	});

	expect(getTrueVals()).toMatchInlineSnapshot(`
Array [
  "yes",
]
`);
	expect(getFalseVals()).toMatchInlineSnapshot(`
Array [
  "false",
  "0",
  "no",
]
`);
});

it('can override false vals', () => {
	configure({
		override: {
			falseVals: ['no']
		}
	});

	expect(getTrueVals()).toMatchInlineSnapshot(`
Array [
  "yes",
]
`);
	expect(getFalseVals()).toMatchInlineSnapshot(`
Array [
  "no",
]
`);
});
