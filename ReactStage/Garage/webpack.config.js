//webpack.config.js  
var webpack = require('webpack'); 
const path = require('path');
const apiMocker = require('webpack-api-mocker');
//const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    //'vendor': './src/vendor.js',
    'bundle': './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["react", "es2015","stage-0"]
        }
      },{
        test: /\.css$/,
        //exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]  
  },
  plugins: [
    //webpack.optimize.CommonsChunkPlugin has been removed, please use config.optimization.splitChunks instead.
    //new webpack.optimize.CommonsChunkPlugin({ name: 'vendor'}),
    new webpack.HotModuleReplacementPlugin()
    /*,new HtmlWebpackPlugin({
      title: 'react walkthrough',
      template: "./src/index.html",
      filename: "./index.html",
    })*/
  ],
  /* 生成MAP文件，方便调试，生产去除 */
  devtool: 'source-map', 
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: "127.0.0.1",
    port: 3001,
    compress: true,
    historyApiFallback: true,
    stats: 'normal',
    inline: true,
    hot: true,
    open: true,
    before(app) {
        apiMocker(app, path.resolve('./mocker.js'), {
        // 'GET /api/users/list': 'http://localhost:3000',
        // 'GET /api/userinfo/:id': 'http://localhost:3000',
        })
    }
  }
};  