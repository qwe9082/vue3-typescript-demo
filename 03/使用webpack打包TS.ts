// 1.生成配置文件package.json
// npm init

// 2.生成配置文件tsconfig.json
// tsc --init
// 修改tsconfig.json配置 "strict": false,

// 3.下载依赖
// npm i typescript webpack webpack-cli webpack-dev-server html-webpack-plugin clean-webpack-plugin ts-loader cross-env -D

// 4.入口JS: src/main.ts
// document.write('Hello Webpack TS!')


// 5.index页面: public/index.html
// <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8">
//   <meta name="viewport" content="width=device-width, initial-scale=1.0">
//   <meta http-equiv="X-UA-Compatible" content="ie=edge">
//   <title>webpack & TS</title>
// </head>
// <body>
// </body>
// </html>

// 6.build/webpack.config.js
// const {CleanWebpackPlugin} = require('clean-webpack-plugin')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const path = require('path')
// const isProd = process.env.NODE_ENV === 'production' // 是否生产环境
// function resolve (dir) {
//   return path.resolve(__dirname, '..', dir)
// }
// module.exports = {
//   mode: isProd ? 'production' : 'development',
//   entry: {
//     app: './src/main.ts'
//   },
//   output: {
//     path: resolve('dist'),
//     filename: '[name].[contenthash:8].js'
//   },
//   module: {
//     rules: [
//       {
//         test: /\.tsx?$/,
//         use: 'ts-loader',
//         include: [resolve('src')]
//       }
//     ]
//   },
//   plugins: [
//     new CleanWebpackPlugin({
//     }),
//     new HtmlWebpackPlugin({
//       template: './public/index.html'
//     })
//   ],
//   resolve: {
//     extensions: ['.ts', '.tsx', '.js']
//   },
//   devtool: isProd ? 'cheap-module-source-map' : 'eval-cheap-module-source-map',
//   devServer: {
//     host: 'localhost', // 主机名\
//     port: 8081,
//     open: true
//   },
//   stats: 'errors-only', // 打包日志输出输出错误信息
// }

// 7.配置打包命令
// "dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.js",
// "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"

// 8.运行与打包
// npm run dev
// npm run build
