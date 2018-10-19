const babelOptions = {
	plugins: [
		[
			'@babel/plugin-transform-runtime',
			{
				corejs: 2,
				helpers: false,
				regenerator: true,
			},
		],
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-proposal-function-bind',
		'@babel/transform-react-jsx-source',
		'@babel/plugin-syntax-dynamic-import',
		'react-hot-loader/babel',
	],
	presets: ['@babel/env', '@babel/react'],
	babelrc: false,
};

//eslint-disable-next-line prefer-template
module.exports = ['babel-loader?' + JSON.stringify(babelOptions)];
