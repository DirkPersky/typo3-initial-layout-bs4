const path = require('path');
let FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
let UglifyJSPlugin = require('uglifyjs-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

// console.log(process.env.NODE_ENV);
class WebpackConfig {
    /**
     * Create a new instance.
     */
    constructor() {
        this.config = {
            publicPath: 'app/Resources/Public'
        };

        this.webpackConfig = {
            entry: '',
            output: {},
            plugins: [],
            module: {
                rules: []
            },
            devServer: {
                headers: {
                    "Access-Control-Allow-Origin": "*"
                },
                contentBase:  path.join(__dirname, this.config.publicPath),
                historyApiFallback: true,
                open: true,
                overlay: true,
                port: 9000,
                inline: false,
                // hot: true,
                lazy: false,
                quiet: true,
                watchOptions: {
                    aggregateTimeout: 300,
                    poll: 1000
                }
            }
        };
    }
    /**
     * Build the Webpack configuration object.
     */
    build() {
        this.buildEntry()
            .buildOutput()
            .buildRules()
            .buildPlugins()
        ;

        return this.webpackConfig;
    }
    /**
     * Build the entry object.
     */
    buildEntry() {
        this.webpackConfig.entry = [
            './'+this.config.publicPath+'/js/script.min.js',
            './'+this.config.publicPath+'/css/style.css',
            './'+this.config.publicPath+'/index.html'
        ];

        return this;
    }
    /**
     * Build the output object.
     */
    buildOutput() {
        this.webpackConfig.output = {
            path: path.resolve(__dirname,  this.config.publicPath),
        };

        return this;
    }
    /**
     * Build the rules array.
     */
    buildRules() {
        // sass / scss loader for webpack
        this.webpackConfig.module.rules.push({
            test: /\.(css|html|js)$/,
            loader: 'file-loader',
        });

        return this;
    }
    /**
     * Build the plugins array.
     */
    buildPlugins() {
        this.webpackConfig.plugins.push(
            new FriendlyErrorsWebpackPlugin({
                clearConsole: true
            })
        );

        return this;
    }
}
module.exports = new WebpackConfig().build();