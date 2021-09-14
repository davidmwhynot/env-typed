import { boolEnv } from './boolEnv';

it('can get an environment variable and parse it as true', () => {
	process.env = {
		FOO: 'true'
	};

	expect(boolEnv('FOO')).toBe(true);
});

it('can get an environment variable and parse it as false', () => {
	process.env = {
		FOO: 'false'
	};

	expect(boolEnv('FOO')).toBe(false);
});

it('returns a fallback value when an environment variable is missing', () => {
	process.env = {};

	expect(boolEnv('FOO', true)).toBe(true);
});

it('calls the fallback function and returns its value when an environment variable is missing', () => {
	const fallbackFunction = jest.fn(() => true);

	process.env = {};

	expect(boolEnv('FOO', fallbackFunction)).toBe(true);
	expect(fallbackFunction).toBeCalledTimes(1);
});

it('can pass the fallback value in as an option', () => {
	const fallbackFunction = jest.fn(() => true);

	process.env = {};

	expect(boolEnv('FOO', { fallback: fallbackFunction })).toBe(true);
	expect(fallbackFunction).toBeCalledTimes(1);
});

it('can add additional true values via options param', () => {
	process.env = {
		FOO: 'yes'
	};

	expect(boolEnv('FOO', { trueVals: ['yes'] })).toBe(true);
});

it('can add override the true values via options param', () => {
	process.env = {
		FOO: 'yes',
		BAR: 'true'
	};

	expect(boolEnv('FOO', { override: { trueVals: ['yes'] } })).toBe(true);
	expect(
		boolEnv('BAR', { fallback: false, override: { trueVals: ['yes'] } })
	).toBe(false);
});

it('can add additional false values via options param', () => {
	process.env = {
		FOO: 'no'
	};

	expect(boolEnv('FOO', { falseVals: ['no'] })).toBe(false);
});

it('can add override the false values via options param', () => {
	process.env = {
		FOO: 'no',
		BAR: 'false'
	};

	expect(boolEnv('FOO', { override: { falseVals: ['no'] } })).toBe(false);
	expect(
		boolEnv('BAR', { fallback: true, override: { falseVals: ['no'] } })
	).toBe(true);
});

it('throws when the specified environment variable is missing', () => {
	process.env = {};

	expect(boolEnv.bind(this, 'FOO')).toThrowErrorMatchingInlineSnapshot(
		`"Missing required env var: FOO."`
	);
});

it('throws when the specified environment variable is not a number', () => {
	process.env = {
		FOO: 'bar'
	};

	expect(boolEnv.bind(this, 'FOO')).toThrowErrorMatchingInlineSnapshot(
		`"Expected boolean value (one of \\"true\\", \\"1\\", \\"false\\", or, \\"0\\") for env var: FOO."`
	);
});
