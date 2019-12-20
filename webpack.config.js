const path = require('path');
const webpack = require('webpack');
let FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let ModernizrWebpackPlugin = require('modernizr-webpack-plugin');

class WebpackConfig {
    /**
     * Create a new instance.
     */
    constructor() {
        this.config = {
            publicPath: 'app/Resources/Public',
            modernizr: {
                filename: 'modernizr.min.js',
                classPrefix: "",
                options: [
                    "addTest",
                    "atRule",
                    "domPrefixes",
                    "hasEvent",
                    "load",
                    "mq",
                    "prefixed",
                    "prefixes",
                    "prefixedCSS",
                    "setClasses",
                    "testAllProps",
                    "testProp",
                    "testStyles"
                ],
                'feature-detects': [
                    "css/flexbox",
                    "svg",
                    "svg/smil"
                ]
            }
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
            }
        };
        // Uglify & Compress JS
        if (this.isProduction()) {
            this.webpackConfig.optimization = {
                minimize: true
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
            filename: 'script.min.js'
        };

        return this;
    }

    /**
     * Build the rules array.
     */
    buildRules() {
        // JavaScript & TYPESCRIPT HANDLER
        this.webpackConfig.module.rules.push({
            test: /\.(ts|js)x?$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-env', '@babel/typescript'],
                }
            }
        });
        // sass / scss loader for webpack
        this.webpackConfig.module.rules.push({
            test: /\.(sass|scss)$/,
            exclude: /(node_modules|bower_components)/,
            loader: ExtractTextPlugin.extract([
                'css-loader', 'sass-loader'
            ])
        });
        // Copy Fonts to Public dir
        this.webpackConfig.module.rules.push({
            test: /\.(woff2?|ttf|eot|svg|otf)$/,
            loader: 'file-loader',
            options: {
                name: path => {
                    if (!/node_modules|bower_components/.test(path)) {
                        return '../fonts/[name].[ext]?[hash]'.replace(/@/g, '');
                    }

                    return '../fonts/' + path
                        .replace(/\\/g, '/')
                        .replace(/@/g, '')
                        .replace(
                            /((.*(node_modules|bower_components))|fonts|font|assets)\//g, ''
                        ) + '?[hash]';
                },
                publicPath: ''
            }
        });
        // Copy Images to Public dir
        this.webpackConfig.module.rules.push({
            test: /\.(png|jpe?g|gif)$/,
            loaders: [
                {
                    loader: 'file-loader',
                    options: {
                        name: path => {
                            if (!/node_modules|bower_components/.test(path)) {
                                return '../img/layout/[name].[ext]?[hash]';
                            }

                            return '../img/vendor/' + path
                                .replace(/\\/g, '/')
                                .replace(
                                    /((.*(node_modules|bower_components))|images|image|img|assets)\//g, ''
                                ) + '?[hash]';
                        },
                        publicPath: ''
                    }
                }
            ]
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
        // Generate Moderniz
        this.webpackConfig.plugins.push(
            new ModernizrWebpackPlugin(
                this.config.modernizr
            )
        );
        this.webpackConfig.plugins.push(
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery'
            })
        );
        // say ExtractTextPlugin to export his results to style.css
        this.webpackConfig.plugins.push(
            new ExtractTextPlugin({ // define where to save the file
                filename: '../css/style.css',
                allChunks: true,
            })
        );

        return this;
    }
}

module.exports = new WebpackConfig().build();
