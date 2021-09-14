import { requireEnv } from './requireEnv';

it('can get the value of an environment variable', () => {
	process.env = {
		FOO: 'bar'
	};

	expect(requireEnv('FOO')).toBe('bar');
});

it('returns a fallback when an environment variable is missing', () => {
	process.env = {};

	expect(requireEnv('FOO', 'bar')).toBe('bar');
});

it('calls the fallback function and returns its value when an environment variable is missing', () => {
	const fallbackFunction = jest.fn(() => 'bar');

	process.env = {};

	expect(requireEnv('FOO', fallbackFunction)).toBe('bar');
	expect(fallbackFunction).toBeCalledTimes(1);
});

it('throws if environment variable and fallback are missing', () => {
	process.env = {};

	expect(requireEnv.bind(this, 'FOO')).toThrowErrorMatchingInlineSnapshot(
		`"Missing required env var: FOO."`
	);
});

it('throws if environment variable is set to an empty string and fallback is missing', () => {
	process.env = {
		FOO: ''
	};

	expect(requireEnv.bind(this, 'FOO')).toThrowErrorMatchingInlineSnapshot(
		`"Missing required env var: FOO."`
	);
});
