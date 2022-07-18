module.exports = {
	env: {
		es2021: true,
	},
	root: true,
	parser: '@typescript-eslint/parser',
	settings: {
		'import/resolver': {
			// this loads <rootdir>/tsconfig.json to eslint
			typescript: {},
		},
	},
	plugins: ['@typescript-eslint', 'import'],
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		'@typescript-eslint/member-ordering': 'error',
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'variable',
				format: ['PascalCase', 'camelCase', 'UPPER_CASE'],
			},
		],
		'@typescript-eslint/quotes': ['error', 'single'],
		'@typescript-eslint/semi': ['error', 'always'],
		'@typescript-eslint/type-annotation-spacing': 'error',
		'comma-dangle': [
			'error',
			{
				objects: 'always-multiline',
				arrays: 'always-multiline',
				functions: 'always-multiline',
				imports: 'always-multiline',
				exports: 'always-multiline',
			},
		],
		'max-len': [
			'warn',
			{
				code: 120,
				comments: 200,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
				ignoreRegExpLiterals: true,
				ignoreUrls: true,
			},
		],
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'internal'],
				pathGroups: [
					{
						pattern: 'react',
						group: 'external',
						position: 'before',
					},
				],
				pathGroupsExcludedImportTypes: ['react'],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: true,
				},
			},
		],
		'import/no-extraneous-dependencies': [
			'error',
			{
				devDependencies: true,
				// Only check the root package.json
				packageDir: './',
			},
		],
		// 'import/extensions': [
		// 	'error',
		// 	'ignorePackages',
		// 	{
		// 		js: 'never',
		// 		jsx: 'never',
		// 		ts: 'never',
		// 		tsx: 'never',
		// 	},
		// ],
		'import/no-cycle': 'error',
		'import/prefer-default-export': 'off',
	},
};
