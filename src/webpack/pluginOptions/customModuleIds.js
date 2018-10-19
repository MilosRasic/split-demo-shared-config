var PROJECT_PREFIX = require('../../constants').projectPrefix;

var CI_PREFIX = null;

module.exports = {
	callWhenMissingLibident: true,
	idFunction: function(libIdent, module) {
		var id = libIdent;

		//web of links
		if (libIdent) {
			if (libIdent.startsWith('../')) {
				if (libIdent.includes('node_modules') && libIdent.includes(PROJECT_PREFIX)) {
					var lastProjectPrefixPos = libIdent.lastIndexOf(PROJECT_PREFIX);
					var lastNodeModules = libIdent.lastIndexOf('node_modules');

					if (lastNodeModules > lastProjectPrefixPos) {
						id = '.' + libIdent.substr(lastNodeModules + 12);
					} else {
						id = libIdent.substr(lastProjectPrefixPos + PROJECT_PREFIX.length);
					}
				} else if (libIdent.includes('node_modules')) {
					var lastNodeModules = libIdent.lastIndexOf('node_modules');
					id = './' + libIdent.substr(lastNodeModules);
				} else {
					id = libIdent.substr(3);
				}
			} else if (libIdent.startsWith('./')) {
				//not web of links
				var firstDir = libIdent.substring(2, libIdent.indexOf('/', 2));

				//hoisted node_modules with links
				if (firstDir == 'platform' || firstDir.startsWith('app-') || firstDir.startsWith('shared-')) {
					id = libIdent.substr(2);

					if (id.startsWith('platform')) {
						id = id.replace('platform', '.');
					}
				} else if (libIdent.includes('node_modules') && libIdent.includes(PROJECT_PREFIX)) {
					//no links
					var lastProjectPrefixPos = libIdent.lastIndexOf(PROJECT_PREFIX);
					var lastNodeModules = libIdent.lastIndexOf('node_modules');

					if (lastNodeModules > lastProjectPrefixPos) {
						id = '.' + libIdent.substr(lastNodeModules + 12);
					} else {
						id = libIdent.substr(lastProjectPrefixPos + PROJECT_PREFIX.length);
					}
				} else {
					//app build maybe
					var cwd = process.cwd();

					//app build
					if (!cwd.endsWith('platform') && !libIdent.includes('node_modules')) {
						var app = cwd.substr(cwd.lastIndexOf('/') + 1);

						id = libIdent.replace('./', app + '/');

						//check if CI and fix if yes
						if (CI_PREFIX && id.startsWith(CI_PREFIX)) {
							var idSplit = id.substr(CI_PREFIX.length).split('/');

							idSplit[0] = idSplit[0].replace('_', '-');

							id = idSplit.join('/');
						}
					}
				}
			}
		} else if (module.sourceStr && module.sourceStr.indexOf('ignore') >= 0) {
			id = 'ignored';
		}

		return id;
	},
};
