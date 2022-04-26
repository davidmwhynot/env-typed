import { env } from './env';
import { EnvVarError } from './EnvVarError';
import { defined } from './lib/defined';
import { missingEnvVar } from './lib/missingEnvVar';
import { getPrefixedKey } from './lib/prefix';
import { NumberEnvOptions, FallbackValue } from './types';

/**
 * TODO
 */
export function numberEnv(name: string, options?: NumberEnvOptions): number;
/**
 * TODO
 */
export function numberEnv(
	name: string,
	fallback?: FallbackValue<number>
): number;
/**
 * TODO
 */
export function numberEnv(
	name: string,
	fallbackOrOptions?: NumberEnvOptions | FallbackValue<number>
): number {
	let disablePrefix: boolean | undefined;
	let fallback: FallbackValue<number> | undefined;

	if (defined(fallbackOrOptions)) {
		if (typeof fallbackOrOptions === 'object') {
			disablePrefix = fallbackOrOptions.disablePrefix;
			fallback = fallbackOrOptions.fallback;
		} else {
			fallback = fallbackOrOptions;
		}
	}

	const raw = env(name, disablePrefix);
	const num = Number(raw);

	if (!isNaN(num)) {
		return num;
	}

	if (fallback === undefined) {
		const key = getPrefixedKey(name, disablePrefix);

		if (raw === undefined || raw === null || raw === '') {
			throw missingEnvVar(key);
		}

		throw new EnvVarError(
			`Expected a number for the environment variable ${key}.`
		);
	}

	if (typeof fallback === 'number') return fallback;

	return fallback();
}
