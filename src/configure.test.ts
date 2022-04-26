import { configure } from './configure';

import { requireEnv } from './requireEnv';
import { numberEnv } from './numberEnv';
import { boolEnv } from './boolEnv';

import { getTrueVals } from './lib/trueVals';
import { getFalseVals } from './lib/falseVals';

describe('prefix tests', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it('can configure a prefix for env variables', async () => {
		const setPrefix = jest.fn();

		jest.doMock('./lib/prefix', () => ({
			setPrefix
		}));

		const { configure: scopedConfigure } = await import('./configure');
		scopedConfigure({ prefix: 'PREFIX_' });

		expect(setPrefix).toHaveBeenCalledWith('PREFIX_');
	});

	it('can get a prefixed env var with requireEnv', () => {
		process.env = {
			PREFIX_FOO: 'bar'
		};

		configure({ prefix: 'PREFIX_' });

		expect(requireEnv('FOO')).toStrictEqual('bar');
	});

	it('can get a prefixed env var with numberEnv', () => {
		process.env = {
			PREFIX_FOO: '1'
		};

		configure({ prefix: 'PREFIX_' });

		expect(numberEnv('FOO')).toStrictEqual(1);
	});

	it('can get a prefixed env var with boolEnv', () => {
		process.env = {
			PREFIX_FOO: 'true'
		};

		configure({ prefix: 'PREFIX_' });

		expect(boolEnv('FOO')).toStrictEqual(true);
	});

	it('can disable global prefix with requireEnv', () => {
		process.env = {
			PREFIX_FOO1: 'bar1',
			FOO: 'bar'
		};

		configure({ prefix: 'PREFIX_' });

		expect(requireEnv('FOO1')).toStrictEqual('bar1');
		expect(requireEnv('FOO', { disablePrefix: true })).toStrictEqual('bar');
	});

	it('can disable global prefix with numberEnv', () => {
		process.env = {
			PREFIX_FOO1: '2',
			FOO: '1'
		};

		configure({ prefix: 'PREFIX_' });

		expect(numberEnv('FOO1')).toStrictEqual(2);
		expect(numberEnv('FOO', { disablePrefix: true })).toStrictEqual(1);
	});

	it('can disable global prefix with boolEnv', () => {
		process.env = {
			PREFIX_FOO1: 'false',
			FOO: 'true'
		};

		configure({ prefix: 'PREFIX_' });

		expect(boolEnv('FOO1')).toStrictEqual(false);
		expect(boolEnv('FOO', { disablePrefix: true })).toStrictEqual(true);
	});

	describe('the global prefix should be present in error messages', () => {
		test('requireEnv', () => {
			process.env = {
				FOO: 'bar'
			};

			configure({ prefix: 'PREFIX_' });

			expect(
				requireEnv.bind(this, 'FOO')
			).toThrowErrorMatchingInlineSnapshot(
				`"Missing required env var: PREFIX_FOO."`
			);
		});

		test('numberEnv', () => {
			process.env = {
				PREFIX_FOO: 'bar',
				BAR: 'baz'
			};

			configure({ prefix: 'PREFIX_' });

			expect(
				numberEnv.bind(this, 'FOO')
			).toThrowErrorMatchingInlineSnapshot(
				`"Expected a number for the environment variable PREFIX_FOO."`
			);
			expect(
				numberEnv.bind(this, 'BAR')
			).toThrowErrorMatchingInlineSnapshot(
				`"Missing required env var: PREFIX_BAR."`
			);
		});

		test('boolEnv', () => {
			process.env = {
				PREFIX_FOO: 'bar',
				BAR: 'true'
			};

			configure({ prefix: 'PREFIX_' });

			expect(
				boolEnv.bind(this, 'FOO')
			).toThrowErrorMatchingInlineSnapshot(
				`"Expected boolean value (one of \\"true\\", \\"1\\", \\"false\\", or, \\"0\\") for env var: PREFIX_FOO."`
			);

			expect(
				boolEnv.bind(this, 'BAR')
			).toThrowErrorMatchingInlineSnapshot(
				`"Missing required env var: PREFIX_BAR."`
			);
		});
	});

	describe('the global prefix should not be present in error messages if the prefix is disabled', () => {
		test('requireEnv', () => {
			process.env = {
				PREFIX_FOO: 'bar'
			};

			configure({ prefix: 'PREFIX_' });

			expect(() =>
				requireEnv('FOO', { disablePrefix: true })
			).toThrowErrorMatchingInlineSnapshot(
				`"Missing required env var: FOO."`
			);
		});

		test('numberEnv', () => {
			process.env = {
				FOO: 'bar',
				PREFIX_BAR: 'baz'
			};

			configure({ prefix: 'PREFIX_' });

			expect(() =>
				numberEnv('FOO', { disablePrefix: true })
			).toThrowErrorMatchingInlineSnapshot(
				`"Expected a number for the environment variable FOO."`
			);
			expect(() =>
				numberEnv('BAR', { disablePrefix: true })
			).toThrowErrorMatchingInlineSnapshot(
				`"Missing required env var: BAR."`
			);
		});

		test('boolEnv', () => {
			process.env = {
				FOO: 'bar',
				PREFIX_BAR: 'true'
			};

			configure({ prefix: 'PREFIX_' });

			expect(() =>
				boolEnv('FOO', { disablePrefix: true })
			).toThrowErrorMatchingInlineSnapshot(
				`"Expected boolean value (one of \\"true\\", \\"1\\", \\"false\\", or, \\"0\\") for env var: FOO."`
			);

			expect(() =>
				boolEnv('BAR', { disablePrefix: true })
			).toThrowErrorMatchingInlineSnapshot(
				`"Missing required env var: BAR."`
			);
		});
	});
});

describe('boolOptions tests', () => {
	beforeEach(() => {
		jest.resetModules();
	});

	it('can add additional values', () => {
		configure({
			boolOptions: {
				trueVals: ['yes'],
				falseVals: ['no']
			}
		});

		expect(getTrueVals()).toMatchInlineSnapshot(`
	Array [
	  "true",
	  "1",
	  "yes",
	]
	`);
		expect(getFalseVals()).toMatchInlineSnapshot(`
	Array [
	  "false",
	  "0",
	  "no",
	]
	`);
	});

	it('can override true vals', () => {
		configure({
			boolOptions: {
				override: {
					trueVals: ['yes']
				}
			}
		});

		expect(getTrueVals()).toMatchInlineSnapshot(`
	Array [
	  "yes",
	]
	`);
		expect(getFalseVals()).toMatchInlineSnapshot(`
	Array [
	  "false",
	  "0",
	  "no",
	]
	`);
	});

	it('can override false vals', () => {
		configure({
			boolOptions: {
				override: {
					falseVals: ['no']
				}
			}
		});

		expect(getTrueVals()).toMatchInlineSnapshot(`
	Array [
	  "yes",
	]
	`);
		expect(getFalseVals()).toMatchInlineSnapshot(`
	Array [
	  "no",
	]
	`);
	});
});
