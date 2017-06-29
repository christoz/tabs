const path = require('path')
const webpack = require('webpack')

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

const extractStyles = new ExtractTextPlugin({filename: '[name].css', allChunks: true});
const DEV = true

module.exports = {
  devtool: DEV ? 'source-map' : '',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: extractStyles.extract({
          use: ['css-loader', 'postcss-loader'],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.less$/i,
        use: ['css-hot-loader'].concat(extractStyles.extract({
          use: [{loader: 'css-loader', options: { minimize: true, sourceMap: true }}, 'less-loader'],
          fallback: 'style-loader'
        }))
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  devServer: {
    hot: DEV,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    extractStyles,
    new HtmlWebpackPlugin({
      title: 'Firefly test',
      filename: 'index.html',
      template: 'src/index.tpl.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}