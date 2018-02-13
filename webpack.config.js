const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = env => {
    let plugins = [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            "process.env.NODE_ENV": JSON.stringify(env.NODE_ENV)
        }),
    ];


    const productionVars = {
        plugins: [
            new ExtractTextPlugin({
                filename: "styles.css"
            })
        ],
        publicPath: "/"
    };

    const pluginsAnalyze = [
        new BundleAnalyzerPlugin()
    ];


    if(env.NODE_ENV === "production") {
        plugins = plugins.concat(productionVars.plugins);
    }

    if (env.ANALYZE_BUNDLE) {
        plugins = plugins.concat(pluginsAnalyze);
    }


    return {
        context: path.resolve(__dirname, "./src"),
        entry: "./index.js",
        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "main.js",
            publicPath: env.NODE_ENV === "production" ? productionVars.publicPath : ""
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    include: [path.resolve(__dirname, "src")],
                    exclude: /node_modules/
                },
                {test: /\.css$/, use: ExtractTextPlugin.extract({fallback: "style-loader", use: ["css-loader"]})},
                {
                    test: /\.scss$/,
                    exclude: /node_modules/,
                    use:
                        env.NODE_ENV === "production"
                            ? ExtractTextPlugin.extract({
                                fallback: "style-loader",
                                use: ["css-loader", "postcss-loader", "sass-loader"]
                            })
                            : ["style-loader", "css-loader", "postcss-loader", "sass-loader"]
                },
                {
                    test: /\.(jpe?g|png|gif)$/i,
                    use: [
                        {loader: "file-loader?name=[path][name].[ext]"}
                    ]
                },
                {
                    test: /\.(ttf|eot|svg|otf)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                    use: [
                        {loader: "file-loader?name=[path][name].[ext]"}
                    ],

                }

            ]
        },
        devtool: env.NODE_ENV === "production" ? false : "source-map",
        target: "web",
        plugins,
        devServer: {
            contentBase: path.join(__dirname, "/dist/"),
            publicPath: "/",
            compress: true,
            hot: true,
            port: 9000,
            historyApiFallback: true,
        },
    };

};