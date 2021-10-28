const path = require('path');
const webpack = require('webpack');
let FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
let MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');

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
            resolve: {
                extensions: [".ts", ".tsx", ".js"]
            },
            target: ['web','es5'],
        };
        // Uglify & Compress JS
        if (this.isProduction()) {
            this.webpackConfig.optimization = {
                minimize: true,
                minimizer: [new TerserPlugin({
                    extractComments: false,
                })],
            };
        }
    }

    isProduction() {
        return (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') ? true : false;
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
            './asset/typescript/main.ts',
            './asset/sass/style.scss'
        ];

        return this;
    }

    /**
     * Build the output object.
     */
    buildOutput() {
        this.webpackConfig.output = {
            path: path.resolve(__dirname, this.config.publicPath + '/js'),
            filename: 'script.min.js',
            publicPath: '',
        };

        return this;
    }

    /**
     * Build the rules array.
     */
    buildRules() {
        // Copy Fonts to Public dir
        this.webpackConfig.module.rules.push({
            test: /\.(woff2?|ttf|eot|svg|otf)/,
            type: 'asset',
            generator: {
                filename: path => {
                    path = path.filename;
                    if (!/node_modules|bower_components/.test(path)) {
                        return '../fonts/[name][ext][query]'.replace(/@/g, '');
                    }

                    return '../fonts/' + path
                        .replace(/\\/g, '/')
                        .replace(/@/g, '')
                        .replace(
                            /((.*(node_modules|bower_components))|fonts|font|assets)\//g, ''
                        ) + '[query]';
                }
            }
        });
        // Copy Images to Public dir
        this.webpackConfig.module.rules.push({
            test: /\.(png|jpe?g|gif)$/,
            type: 'asset',
            generator: {
                filename: path => {
                    path = path.filename;
                    if (!/node_modules|bower_components/.test(path)) {
                        return '../img/layout/[name][ext][query]'.replace(/@/g, '');
                    }

                    return '../img/vendor/' + path
                        .replace(/\\/g, '/')
                        .replace(/@/g, '')
                        .replace(
                            /((.*(node_modules|bower_components))|fonts|font|assets)\//g, ''
                        ) + '[query]';
                }
            }
        });
        // JavaScript & TYPESCRIPT HANDLER
        this.webpackConfig.module.rules.push({
            test: /\.(ts|js)x?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        ['@babel/preset-env', {
                            "corejs": { "version":3 },
                            "useBuiltIns": "usage",
                            "targets": {
                                "edge": "90",
                                "firefox": "90",
                                "chrome": "91",
                                "safari": "14.1",
                                // "ie": "11"
                            }
                        }],
                        ['@babel/typescript']
                    ],
                }
            }
        });
        // sass / scss loader for webpack
        this.webpackConfig.module.rules.push({
            test: /\.(sa|sc|c)ss$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../../",
                    },
                },
                {loader: 'css-loader'},
                {loader: 'sass-loader'},
            ],
        });

        return this;
    }

    /**
     * Build the plugins array.
     */
    buildPlugins() {
        // Add Frindly Errors
        this.webpackConfig.plugins.push(
            new FriendlyErrorsWebpackPlugin({
                clearConsole: true
            })
        );
        this.webpackConfig.plugins.push(
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        );
        // say ExtractTextPlugin to export his results to style.css
        this.webpackConfig.plugins.push(
            new MiniCssExtractPlugin({ // define where to save the file
                filename: '../css/style.css',
            })
        );

        return this;
    }
}
module.exports = new WebpackConfig().build();