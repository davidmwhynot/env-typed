import { env } from './env';
import { defined } from './lib/defined';
import { missingEnvVar } from './lib/missingEnvVar';
import { getPrefixedKey } from './lib/prefix';
import { RequireEnvOptions, FallbackValue } from './types';

/**
 * TODO
 */
export function requireEnv(name: string, options?: RequireEnvOptions): string;
/**
 * TODO
 */
export function requireEnv(
	name: string,
	fallback?: FallbackValue<string>
): string;
/**
 * TODO
 */
export function requireEnv(
	name: string,
	fallbackOrOptions?: FallbackValue<string> | RequireEnvOptions
): string {
	let disablePrefix: boolean | undefined;
	let fallback: FallbackValue<string> | undefined;

	if (defined(fallbackOrOptions)) {
		if (typeof fallbackOrOptions === 'object') {
			disablePrefix = fallbackOrOptions.disablePrefix;
			fallback = fallbackOrOptions.fallback;
		} else {
			fallback = fallbackOrOptions;
		}
	}

	const raw = env(name, disablePrefix);

	if (defined(raw) && raw !== '') {
		return raw;
	}

	if (fallback === undefined) {
		throw missingEnvVar(getPrefixedKey(name, disablePrefix));
	}

	if (typeof fallback === 'string') return fallback;

	return fallback();
}
