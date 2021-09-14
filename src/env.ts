/**
 * TODO
 */
export const env = (name: string): string | undefined => {
	const raw = process.env[name];

	return raw;
};
