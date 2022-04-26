import { env } from './env';

import { defined } from './lib/defined';
import { getTrueVals } from './lib/trueVals';
import { getFalseVals } from './lib/falseVals';
import { missingEnvVar } from './lib/missingEnvVar';
import { EnvVarError } from './EnvVarError';
import { BoolEnvOptions, FallbackValue } from './types';
import { getPrefixedKey } from './lib/prefix';

/**
 * TODO
 */
export function boolEnv(name: string, options?: BoolEnvOptions): boolean;
/**
 * TODO
 */
export function boolEnv(
	name: string,
	fallback?: FallbackValue<boolean>
): boolean;
/**
 * TODO
 */
export function boolEnv(
	name: string,
	fallbackOrOptions?: BoolEnvOptions | FallbackValue<boolean>
): boolean {
	let disablePrefix: boolean | undefined;
	let fallback: FallbackValue<boolean> | undefined;
	let trueVals = getTrueVals();
	let falseVals = getFalseVals();

	if (defined(fallbackOrOptions)) {
		if (typeof fallbackOrOptions === 'object') {
			disablePrefix = fallbackOrOptions.disablePrefix;
			fallback = fallbackOrOptions.fallback;

			if (defined(fallbackOrOptions.trueVals)) {
				trueVals = [...trueVals, ...fallbackOrOptions.trueVals];
			}

			if (defined(fallbackOrOptions.falseVals)) {
				falseVals = [...falseVals, ...fallbackOrOptions.falseVals];
			}

			if (defined(fallbackOrOptions.override)) {
				if (defined(fallbackOrOptions.override.trueVals)) {
					trueVals = fallbackOrOptions.override.trueVals;
				}

				if (defined(fallbackOrOptions.override.falseVals)) {
					falseVals = fallbackOrOptions.override.falseVals;
				}
			}
		} else {
			fallback = fallbackOrOptions;
		}
	}

	const raw = env(name, disablePrefix);

	if (defined(raw)) {
		const normalizedEnv = raw.toLowerCase();

		if (trueVals.some(val => val.toLowerCase() === normalizedEnv)) {
			return true;
		}

		if (falseVals.some(val => val.toLowerCase() === normalizedEnv)) {
			return false;
		}
	}

	if (defined(fallback)) {
		if (typeof fallback === 'boolean') return fallback;

		return fallback();
	}

	const key = getPrefixedKey(name, disablePrefix);

	if (!defined(raw)) {
		throw missingEnvVar(key);
	}

	let possibleValuesList = [...trueVals, ...falseVals].map(
		value => `"${value}"`
	);

	possibleValuesList = [
		...possibleValuesList.slice(0, -1),
		'or',
		...possibleValuesList.slice(-1)
	];

	throw new EnvVarError(
		`Expected boolean value (one of ${possibleValuesList.join(
			', '
		)}) for env var: ${key}.`
	);
}
