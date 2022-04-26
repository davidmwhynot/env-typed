import { missingEnvVar } from './missingEnvVar';

it('returns a new copy of EnvVarError each time it is called', () => {
	const a = missingEnvVar('FOO');
	const b = a;
	const c = missingEnvVar('FOO');

	expect(a === b).toBe(true);
	expect(a === c).toBe(false);
});
