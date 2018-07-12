const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let cleanOptions = {
  root: __dirname,
  exclude: [],
  verbose: true,
}

module.exports = {
  entry: {
    app: path.resolve(__dirname, './src/app.js'),
    anotherApp: './src/SubModules/index.js',
    thirdApp: './src/thirdApp.js',
  },
  output: {
    path: path.resolve(__dirname, './build'),
    filename: "[name].js",
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common1',
      chunks: ['app', 'thirdApp'],
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common2',
      chunks: ['app', 'anotherApp'],
    }),
    /**
     * Очищает сборочную директорию перед новой сборкой
     */
    new CleanWebpackPlugin('build', cleanOptions),
    /**
     * Если в случае сборки происходит хоть какая-либо ошибка webpack, то фалы не собираются
     */
    new webpack.NoEmitOnErrorsPlugin(),
    /**
     * Возвращает в бандл файлам имена, вместо index`ов в бандле webpack.
     * Нужен только для разработки, для удобного дебага и анализа бандла.
     */
    // new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin()
  ]
};