module.exports = function extractForProduction(extract, loaders) {
	return extract({
		fallback: 'style-loader',
		use: loaders,
	});
};
