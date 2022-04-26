import { getFalseVals, setFalseVals } from './falseVals';

it('can get the default false values', () => {
	expect(getFalseVals()).toMatchInlineSnapshot(`
Array [
  "false",
  "0",
]
`);
});

it('can set new false values', () => {
	const newVals = ['new', 'vals'];

	setFalseVals(newVals);

	expect(getFalseVals()).toEqual(newVals);
});
