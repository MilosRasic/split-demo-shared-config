const webpack = require('webpack');
const path = require('path');

const Visualizer = require('webpack-visualizer-plugin');
const CustomModuleIdsPlugin = require('custom-module-ids-webpack-plugin');
const GenerateAssetPlugin = require('generate-asset-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const constants = require('../constants');
const cssLoaders = require('./loaders/css');
const otherLoaders = require('./loaders/other');

const PROJECT_PREFIX = constants.projectPrefix;

const packageJson = require(`${process.cwd()}/package.json`);

const jsLoaders = require('./loaders/babel');
const customModuleIdsPlugin = require('./pluginOptions/customModuleIds');
const uglifyJsPlugin = require('./pluginOptions/uglify');
const getModuleNameFromContext = require('./util/getModuleNameFromContext');
const buildDepList = require('./util/buildDepList');

let sharedDepsPkgJson = null;

try {
	sharedDepsPkgJson = require(`${process.cwd()}/node_modules/${PROJECT_PREFIX}shared-deps/package.json`);
} catch (e) {}

const sharedDepSet = sharedDepsPkgJson ? buildDepList(sharedDepsPkgJson) : new Set();

const appDepSet = buildDepList(packageJson);

module.exports = function(chunkName, options = {}) {
	const vendorChunkName = `${chunkName}.vendor`;

	const appCacheGroups = {
		[chunkName]: {
			name: chunkName,
			test: function(module) {
				const include = !module.context || module.context.indexOf('node_modules') === -1;

				return include;
			},
		},
		[vendorChunkName]: {
			name: vendorChunkName,
			test: function(module) {
				if (!module.context) {
					return false;
				}

				if (!module.context.includes('node_modules')) {
					return false;
				}

				const moduleName = getModuleNameFromContext(module.context);

				if (moduleName.startsWith(PROJECT_PREFIX)) {
					return false;
				}

				if (sharedDepSet.has(moduleName)) {
					return false;
				}

				return appDepSet.has(moduleName);
			},
		},
	};

	return {
		mode: 'none',
		node: {
			fs: 'empty',
		},
		entry: { main: options.app ? './src/App.jsx' : './index.js' },
		devtool: 'source-map',
		output: {
			path: path.resolve('./dist'),
			publicPath: '',
			filename: '[name].[hash].js',
			chunkFilename: '[name].[hash].js',
		},
		module: {
			rules: [
				{
					enforce: 'pre',
					test: /\.jsx?$/,
					exclude: /node_modules/,
					loader: 'eslint-loader',
					options: {
						useEslintrc: false,
						configFile: '.eslintrc',
					},
				},
				{
					test: /\.js$/,
					exclude: /node_modules\/(?!(split-demo@\/(.)*)\/).*/,
					loaders: jsLoaders,
				},
				{
					test: /\.jsx$/,
					exclude: /node_modules\/(?!(split-demo@\/(.)*)\/).*/,
					loaders: jsLoaders,
				},
				{
					test: /\.css$/,
					loader: [MiniCssExtractPlugin.loader, ...cssLoaders.cssLoaders],
				},
				{
					test: /\.scss$/,
					loader: [MiniCssExtractPlugin.loader, ...cssLoaders.scssLoaders],
				},
				...otherLoaders,
				{
					test: /\.(otf|eot|svg|ttf|woff)/,
					loader: 'url-loader?limit=100000',
				},
			],
		},
		resolve: {
			extensions: ['.js', '.jsx', '.sass', '.scss', '.less', '.css', '.json'],
			alias: {
				react: path.resolve('./node_modules/react'),
				apps: path.resolve('./apps.js'),
			},
		},
		optimization: {
			runtimeChunk: 'single',
			splitChunks: {
				chunks: 'all',
				minSize: 1,
				automaticNameDelimiter: '.',
				maxInitialRequests: 100,
				maxAsyncRequests: 100,
				name: true,
				cacheGroups: {
					default: false,
					vendors: false,
					...(options.app
						? appCacheGroups
						: {
								[chunkName]: {
									name: chunkName,
									test: function(module) {
										const include = !module.context || module.context.indexOf('node_modules') === -1;

										return include;
									},
								},
						  }),
				},
			},
		},
		plugins: [
			//chunk and module id format we need for split build
			new webpack.NamedChunksPlugin(),
			new CustomModuleIdsPlugin(customModuleIdsPlugin),

			//minify the code
			new UglifyJsPlugin(uglifyJsPlugin),
			//extract css into css files
			new MiniCssExtractPlugin({
				filename: '[name].[hash].css',
				chunkFilename: '[id].[hash].css',
			}),
			//generate hash file
			new GenerateAssetPlugin({
				filename: 'hash',
				fn: (compilation, cb) => {
					cb(null, compilation.hash);
				},
			}),
			//build visualizer page
			new Visualizer({
				filename: './stats.html',
			}),
		],
	};
};
