const path = require('path');

module.exports = function getModuleNameFromContext(context) {
	const moduleNameInPathStart = context.lastIndexOf('node_modules') + 13;
	let pathSepAfterModuleName = context.indexOf(path.sep, moduleNameInPathStart);

	if (pathSepAfterModuleName < moduleNameInPathStart) {
		pathSepAfterModuleName = undefined;
	}
	//handle namespaced modules
	else if (context.charAt(moduleNameInPathStart) == '@') {
		pathSepAfterModuleName = context.indexOf(path.sep, pathSepAfterModuleName + 1);
	}

	return context.substring(moduleNameInPathStart, pathSepAfterModuleName).replace(path.sep, '/');
};
