import { getPrefixedKey } from './lib/prefix';

/**
 * TODO
 */
export const env = (
	name: string,
	disablePrefix = false
): string | undefined => {
	const raw = process.env[getPrefixedKey(name, disablePrefix)];

	return raw;
};
