import type { Configuration as DevServerConfiguration } from 'webpack-dev-server'
import { IBuildOptions } from './types'

export function buildDevServer(options:IBuildOptions):DevServerConfiguration {
    return {
        port: options.port ?? 3000,
        open: true,

        // Нужно для того, чтоб работал реакт роутер
        // только для дев сервера, если раздавать статику через nginx то надо будет настраивать проксирование
        historyApiFallback: true,
        hot: true
    }
}