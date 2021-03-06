var webpack = require('webpack'),
	path = require('path');

var srcPath = path.join(__dirname, '/../src/js'),
	distPath = path.join(__dirname, '/../dist/js');

module.exports = {
	cache: true,
	context: srcPath,
	entry: {
		app: './app.js'
	},
	output: {
		path: distPath,
		filename: '[name].bundle.js'
	},
	resolve: {
		modules: ['node_modules'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'vue-router': 'vue-router/dist/vue-router.esm.js'
		}
	},
	module: {
		rules: [{
			test: /\.js$/,
			exclude: /(node_modules)/,
			use: {
				loader: 'babel-loader',
				options: {
					presets: ['es2015']
				}
			}
		},
		{
			test: /\.vue$/,
			loader: 'vue-loader',
			options: {
				loaders: {
					scss: 'vue-style-loader!css-loader!sass-loader'
				}
			}
		},
		{
			test: /\.json$/,
			use: 'json-loader'
		}]
	},
	plugins: [
		new webpack.EnvironmentPlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV)
		}),
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify(process.env.NODE_ENV)
			}
		})
	]
};