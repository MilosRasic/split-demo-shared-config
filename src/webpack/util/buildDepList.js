const warns = new Set();

function processDeps(depSet, pkgJson) {
	if (!pkgJson.dependencies) {
		return;
	}

	Object.keys(pkgJson.dependencies).forEach(dep => {
		if (depSet.has(dep)) {
			return;
		}

		depSet.add(dep);

		try {
			const depPkgJson = require(`${process.cwd()}/node_modules/${dep}/package.json`);

			processDeps(depSet, depPkgJson);
		} catch (e) {
			if (!warns.has(e.message)) {
				console.warn('package in package.json but not installed: ', e.message);
				warns.add(e.message);
			}
		}
	});
}

module.exports = function buildDepList(rootPgkJson) {
	const depSet = new Set();

	processDeps(depSet, rootPgkJson);

	return depSet;
};
