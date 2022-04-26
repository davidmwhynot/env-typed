let prefix_ = '';

export const getPrefixedKey = (name: string, disablePrefix = false): string =>
	`${disablePrefix ? '' : prefix_}${name}`;
export const setPrefix = (prefix: string): void => {
	prefix_ = prefix;
};
