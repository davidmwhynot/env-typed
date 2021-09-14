import { env } from './env';
import { EnvVarError } from './EnvVarError';
import { missingEnvVar } from './utils/missingEnvVar';
import { FallbackValue } from './types';

/**
 * TODO
 */
export const numberEnv = (
	name: string,
	fallback?: FallbackValue<number>
): number => {
	const raw = env(name);
	const num = Number(raw);

	if (!isNaN(num)) {
		return num;
	}

	if (fallback === undefined) {
		if (raw === undefined || raw === null || raw === '') {
			throw missingEnvVar(name);
		}

		throw new EnvVarError(
			`Expected a number for the environment variable "${name}".`
		);
	}

	if (typeof fallback === 'number') return fallback;

	return fallback();
};
