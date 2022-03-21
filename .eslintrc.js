module.exports = {
	parserOptions: {
		ecmaVersions: 2018,
		sourceType: 'module',
	},
	env: {
		jest: true,
	},
	extends: ['eslint:recommended', 'prettier'],
	rules: {
		'comma-dangle': ['error', 'never'],
		'no-underscore-dangle': 'error',
		semi: ['error', 'always'],
		'semi-spacing': ['error', { before: false, after: true }],
		'semi-style': ['error', 'last'],
		// 'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
		'no-trailing-spaces': 'error',
		'no-console': 'off',
		'no-unused-vars': 'warn',
		'no-undef': 'off',
		'no-useless-escape': 'warn',
		'no-prototype-builtins': 'warn',
		'no-fallthrough': 'warn',
		'no-func-assign': 'warn',
		'no-empty': 'warn',
		'no-self-assign': 'warn',
		'no-cond-assign': 'warn',
		'no-constant-condition': 'warn',
		'no-unsafe-finally': 'warn',
		'no-redeclare': 'warn',
	},
};
