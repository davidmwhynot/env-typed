module.exports = {
	env: {
		node: true
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'plugin:jest/recommended'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 12,
		sourceType: 'module'
	},
	ignorePatterns: ['*.js'],
	plugins: ['@typescript-eslint', 'prettier', 'jest'],
	rules: {
		'prettier/prettier': 'error',
		'@typescript-eslint/no-explicit-any': ['error']
	}
};
