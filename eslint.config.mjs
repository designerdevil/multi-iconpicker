// eslint.config.js
import eslint from '@eslint/js';

export default [
	eslint.configs.recommended,
	{
		languageOptions: {
			globals: {
				jQuery: false,
				document: false,
				console: false,
			},
		},
		rules: {
			'no-unused-vars': 'warn',
			'no-undef': 'warn',
		},
	},
	{
		ignores: [
			'.prettierrc.js',
			'.stylelintrc.js',
			'script/jquery-2.2.4.min.js',
		],
	},
];
