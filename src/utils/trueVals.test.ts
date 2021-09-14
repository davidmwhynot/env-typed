import { getTrueVals, setTrueVals } from './trueVals';

it('can get the default true values', () => {
	expect(getTrueVals()).toMatchInlineSnapshot(`
Array [
  "true",
  "1",
]
`);
});

it('can set new true values', () => {
	const newVals = ['new', 'vals'];

	setTrueVals(newVals);

	expect(getTrueVals()).toEqual(newVals);
});
