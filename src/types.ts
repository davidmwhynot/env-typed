/**
 * If the specified environment variable is missing, instead of throwing, this
 * value will be used. If a function is provided, it will be called and the
 * return value will be used.
 */
export type FallbackValue<T> = T | (() => T);

/**
 * Note that these values (and the value of the environment variable) are not
 * case sensitive. So, in the following example, `FOO` will still be true even
 * if you have `FOO=TrUe` in your `.env` file:
 * ```ts
 * const FOO = boolEnv('FOO', { trueVals: ['TRUE'] })
 * ```
 */
type BoolVals = string[];

/**
 * TODO
 */
export type BoolValsOptions = {
	/**
	 * TODO
	 */
	trueVals?: BoolVals;
	/**
	 * TODO
	 */
	falseVals?: BoolVals;
};

/**
 * TODO
 */
export type BoolOptions = BoolValsOptions & {
	/**
	 * TODO
	 */
	override?: BoolValsOptions;
};

/**
 * TODO
 */
export type BaseOptions<T> = {
	/**
	 * TODO
	 */
	fallback?: FallbackValue<T>;
};

/**
 * TODO
 */
export type BoolEnvOptions = BoolOptions & BaseOptions<boolean>;

/**
 * TODO
 */
export type Config = BoolOptions;
