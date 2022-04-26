import { numberEnv } from './numberEnv';

it('can get an environment variable and parse it as a number', () => {
	process.env = {
		FOO: '5000'
	};

	expect(numberEnv('FOO')).toBe(5000);
});

it('returns a fallback value when an environment variable is missing', () => {
	process.env = {};

	expect(numberEnv('FOO', 5000)).toBe(5000);
});

it('calls the fallback function and returns its value when an environment variable is missing', () => {
	const fallbackFunction = jest.fn(() => 5000);

	process.env = {};

	expect(numberEnv('FOO', fallbackFunction)).toBe(5000);
	expect(fallbackFunction).toBeCalledTimes(1);
});

it('throws when the specified environment variable is missing', () => {
	process.env = {};

	expect(numberEnv.bind(this, 'FOO')).toThrowErrorMatchingInlineSnapshot(
		`"Missing required env var: FOO."`
	);
});

it('throws when the specified environment variable is not a number', () => {
	process.env = {
		FOO: 'bar'
	};

	expect(numberEnv.bind(this, 'FOO')).toThrowErrorMatchingInlineSnapshot(
		`"Expected a number for the environment variable FOO."`
	);
});
