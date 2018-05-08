//webpack.config.js  
var webpack = require('webpack');
const path = require('path');
module.exports = {
  entry: path.resolve(__dirname, './src/main.js'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["es2015", "react"]
        }
      },{
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }
    ]  
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  /* 生成MAP文件，方便调试，生产去除 */
  devtool: '#cheap-source-map', 
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    host: "127.0.0.1",
    port: 3001,
    compress: true,
    historyApiFallback: true,
    stats: 'normal',
    inline: true,
    hot: true,
    open: true
  }
};  