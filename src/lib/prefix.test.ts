import { getPrefixedKey, setPrefix } from './prefix';

beforeEach(() => {
	jest.resetModules();
});

it('can get the default prefix', () => {
	expect(getPrefixedKey('TEST_KEY')).toStrictEqual('TEST_KEY');
});

it('can set a new prefix', () => {
	const newPrefix = 'PREFIX_';

	setPrefix(newPrefix);

	expect(getPrefixedKey('TEST_KEY')).toStrictEqual('PREFIX_TEST_KEY');
});

it('can disable the prefix', () => {
	const newPrefix = 'PREFIX_';

	setPrefix(newPrefix);

	expect(getPrefixedKey('TEST_KEY', true)).toStrictEqual('TEST_KEY');
});
