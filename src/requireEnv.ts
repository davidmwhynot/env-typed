import { FallbackValue } from './types';
import { env } from './env';
import { defined } from './utils/defined';
import { missingEnvVar } from './utils/missingEnvVar';

/**
 * TODO
 */
export const requireEnv = (
	name: string,
	fallback?: FallbackValue<string>
): string => {
	const raw = env(name);

	if (defined(raw) && raw !== '') {
		return raw;
	}

	if (fallback === undefined) {
		throw missingEnvVar(name);
	}

	if (typeof fallback === 'string') return fallback;

	return fallback();
};
