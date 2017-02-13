const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

var PROD = process.env.NODE_ENV === 'production';

let plugins = []

let config = {
	context: __dirname + '/src',
	entry: {
		main: './js/main'
	},
	output: {
		path: './public/js',
		filename: '[name].min.js'
	},
	module: {
		loaders: [
			{
				test: /\.scss$/,
        		loader: ExtractTextPlugin.extract(['css?sourceMap&localIdentName=[local]','postcss','sass?sourceMap']),
			},
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
      			loader: 'babel-loader?presets[]=es2015',
			},
			{ 
				test: /\.tpl\.jade$/, 
				loaders: ['html?removeRedundantAttributes=false', 'jade-html'],
			},
			{ 
				test: /\.svg$/, 
				loader: 'svg-sprite?name=[name]',
			},
		]
	},
	plugins: [
		new ExtractTextPlugin('../css/[name].min.css'),
		new webpack.EnvironmentPlugin([
			"NODE_ENV"
		]),
	],
	target: 'node',
};

if (PROD) {
	config.plugins = [
		...config.plugins,
		new webpack.optimize.UglifyJsPlugin({
	      compress: { warnings: false }
	    }),
	];
}
else {
	config.plugins = [
		...config.plugins,
		new LiveReloadPlugin(),
		// new webpack.SourceMapDevToolPlugin({
		// 	// exclude the index entry point
		// 	exclude: [/.*index.*$/],
		// 	columns: false,
		// 	filename: '[file].map[query]',
		// 	lineToLine: false,
		// 	module: false
		// }),
	];
	config.devtool = 'source-map';
}

module.exports = config; 