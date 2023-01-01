const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const srcPath = path.join(__dirname, 'src');
const dstPath = path.join(__dirname, 'dist');

module.exports = (env, argv) => {
    const MODE = argv.mode;
    const isDevelop = MODE === 'development';
    
    const proxy = { '/api': {
                        target: 'http://localhost:3000',
                        pathRewrite: {"^/api": ""},
                    },
                };
    
    const config = {
        entry: path.join(srcPath, 'index.js'),
        mode: MODE,
        devtool: isDevelop ? 'eval-source-map' : 'hidden-source-map',
        devServer: {
            static: dstPath,
            historyApiFallback: true,
            hot: isDevelop,        
            port: 8000,  
            proxy: isDevelop ? proxy : {},
        },
        
        plugins: [
            new HtmlWebpackPlugin({
                title: 'HTML'
                //template: path.join(srcPath, 'index.html'),
            }),        
        ],
        output: {
            filename: 'script.js',
        },
        module: {
            rules: [
              {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
              },
              {
                test: /\.js$/i,
                exclude: "/node_modules/",
                use: ["eslint-loader"],
              },
            ],
        }
    };
    return config;
};