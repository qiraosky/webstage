//webpack.config.js  
var webpack = require('webpack'); 
const path = require('path');
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