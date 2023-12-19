import webpack, { DefinePlugin } from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { IBuildOptions } from './types'
import {BundleAnalyzerPlugin} from 'webpack-bundle-analyzer'
import ForkTsCheckerWebpackPlugin  from 'fork-ts-checker-webpack-plugin'
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin'
import CopyPlugin from 'copy-webpack-plugin'
import path from 'path'

export function buildPlugins(options: IBuildOptions):webpack.Configuration['plugins'] {
    const isDev = options.mode === 'development'

    const plugin: webpack.Configuration['plugins'] = [
         // Также автоматически будут подключаться js бандл к html
            // Без этого плагина div id=root не появиться в сборке так как вебпак отчистит пустые теги
        new HtmlWebpackPlugin({
            // Точнее без этой строки (к строке выше)
            template: options.paths.html,

            // Для отображения и подгрузки favicon
            favicon: options.paths.public + '/favicon.ico',

            publicPath: '/'
        }),
        new DefinePlugin({
            __PLATFORM__: JSON.stringify(options.platform)
        }),

        
        
    ]

    if (isDev) {
            // Показывает процент готовности сборки, для удобства
            // В проде не стоит использовать, может замедлят сборку
        plugin.push((new webpack.ProgressPlugin()))

        // // параллельная проверка типов
        // plugin.push(new ForkTsCheckerWebpackPlugin())

        // для hot reload в react
        plugin.push(new ReactRefreshWebpackPlugin())
    } else {
        plugin.push(new MiniCssExtractPlugin({
            filename: 'css/[name].[contenthash:8].css',
            chunkFilename: 'css/[name].[contenthash:8].css',
        }))
        options.analyzer && plugin.push(new BundleAnalyzerPlugin())

        plugin.push(new CopyPlugin({
            patterns: [
                { from: path.resolve(options.paths.public, 'locales'), to: path.resolve(options.paths.output, 'locales') },
            ]
        }))
    }

    return plugin
}