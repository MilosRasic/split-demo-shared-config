module.exports = [
	{
		test: /\.png$/,
		loader: 'url-loader?limit=100000&mimetype=image/png',
	},
	{
		test: /\.svg$/,
		exclude: /font/,
		loader: 'file-loader',
	},
	{
		test: /\.gif$/,
		loader: 'url-loader?limit=100000&mimetype=image/gif',
	},
	{
		test: /\.jpg$/,
		loader: 'file-loader',
	},
];
