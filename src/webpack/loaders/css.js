const path = require('path');

//babel for css
const postcssLoader = {
	loader: 'postcss-loader',
	options: {
		sourceMap: true,
		config: {
			path: path.resolve('./postcss.config.js'),
		},
	},
};

//allows es6 and AMD imports of css as modules, also treats @import in css files the same
const cssLoader = {
	loader: 'css-loader',
	options: {
		sourceMap: true,
		// alias: {
		//     './fonts': '../../fonts',
		//     '../fonts': '../../../assets/fonts',
		// },
		alias: {
			'./fonts': '../../../assets/fonts',
			'../fonts': '../../../assets/fonts',
		},
	},
};

//resolves urls in css url() relative to the file
const resolveUrlLoader = {
	loader: 'resolve-url-loader',
	options: {
		sourceMap: true,
		fail: true,
	},
};

//compiles sass files
const sassLoader = {
	loader: 'sass-loader',
	options: {
		outputStyle: 'expanded',
		sourceMap: true,
		sourceMapContents: true,
	},
};

const baseLoaders = [cssLoader, postcssLoader];

module.exports = {
	cssLoader: cssLoader,
	resolveUrlLoader: resolveUrlLoader,
	sassLoader: sassLoader,
	postcssLoader: postcssLoader,
	cssLoaders: baseLoaders,
	scssLoaders: [...baseLoaders, resolveUrlLoader, sassLoader],
};
