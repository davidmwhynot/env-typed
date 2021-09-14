import { EnvVarError } from '../EnvVarError';

export const missingEnvVar = (name: string): EnvVarError =>
	new EnvVarError(`Missing required env var: ${name}.`);
