const makeWepbackConfigOther = require('./src/webpack/other');
const cssLoaders = require('./src/webpack/loaders/css');
const jsLoaders = require('./src/webpack/loaders/babel');
const otherLoaders = require('./src/webpack/loaders/other');
const customModuleIdsPlugin = require('./src/webpack/pluginOptions/customModuleIds');
const manifestChunkPlugin = require('./src/webpack/pluginOptions/manifestChunk');
const uglifyJsPlugin = require('./src/webpack/pluginOptions/uglify');
const extractTextPlugin = require('./src/webpack/pluginOptions/extractText');
const extractCssForProduction = require('./src/webpack/util/extractCssForProduction');
const constants = require('./src/constants');
const buildDepList = require('./src/webpack/util/buildDepList');
const getModuleNameFromContext = require('./src/webpack/util/getModuleNameFromContext');

const exp = {
	makeWepbackConfigOther,
	cssLoaders,
	jsLoaders,
	otherLoaders,
	customModuleIdsPlugin,
	manifestChunkPlugin,
	uglifyJsPlugin,
	extractTextPlugin,
	extractCssForProduction,
	...constants,
	buildDepList,
	getModuleNameFromContext,
};

module.exports = exp;
