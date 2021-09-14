# typed-env

Utility functions for type-safe environment variables.

```ts
import { requireEnv, numberEnv, boolEnv } from 'typed-env';

// The type of 'FOO' will be 'string' instead of 'string | null'.
const FOO = requireEnv('FOO');
```

## Installation

npm:

```sh
npm install --save typed-env
```

yarn:

```sh
yarn add typed-env
```

## Usage

### basic

```ts
import { requireEnv, numberEnv, boolEnv } from 'typed-env';

const FOO = requireEnv('FOO');
```

The type of `FOO` is now `string` instead of `string | null`.
If `process.env.FOO` is `null` or `undefined`, an `EnvVarError` will be thrown with a helpful message "`Missing required env var: FOO.`".

```ts
const PORT = numberEnv('SERVER_PORT', 5000);
```

The type of `PORT` is now `number` instead of `string | null`.
If `process.env.SERVER_PORT` is `null` or `undefined`, the value of `PORT` will fall back to `5000`.

```ts
const IS_PRODUCTION = boolEnv(
	'IS_PRODUCTION',
	() => requireEnv('NODE_ENV') === 'production'
);
```

The type of `IS_PRODUCTION` is now `boolean` instead of `string | null`.
If `process.env.IS_PRODUCTION` is `null` or `undefined`, `IS_PRODUCTION` will take the value returned by the function used as the second argument.

For more detailed usage, see the [api docs](#api).

### todo: add more usage docs

## API

TODO
