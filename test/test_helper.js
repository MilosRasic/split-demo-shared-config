import '@babel/polyfill';
import chai from 'chai';

const babelRegister = require('@babel/register');
const path = require('path');

const PROJECT_PREFIX = '@split-demo/';

babelRegister({
	babelrcRoots: true,
	ignore: [
		function(modulePath) {
			const escapedPath = path.resolve('..').replace(/\\/g, '\\\\');
			const include =
				modulePath.startsWith(path.resolve('test')) ||
				modulePath.startsWith(path.resolve('src')) ||
				(modulePath.includes(`node_modules${path.sep}${PROJECT_PREFIX}`) &&
					!modulePath.match(`${PROJECT_PREFIX}.*\\${path.sep}node_modules`)) ||
				modulePath.match(`${escapedPath}\\${path.sep}[a-zA-Z-]+\\${path.sep}index.js`) ||
				modulePath.match(`${escapedPath}\\${path.sep}[a-zA-Z-]+\\${path.sep}src\\${path.sep}.*`);

			return !include;
		},
	],
	only: null,
});

global.expect = chai.expect;
