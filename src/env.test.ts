import { env } from './env';

it('can get an environment variables', () => {
	process.env = { FOO: 'bar' };

	expect(env('FOO')).toBe('bar');
});
