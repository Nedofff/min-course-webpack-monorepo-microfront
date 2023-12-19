import path from 'path'
import webpack from 'webpack'
import { buildWebpack } from '@packages/build-config'
import type {IBuildOptions, IBuildPaths, TBuildMode, TBuildPlatform} from '@packages/build-config'
import packageJson from './package.json'

interface IEnvVariables {
  mode: TBuildMode
  port?: number
  analyzer?: boolean
  platform?: TBuildPlatform
}

export default (env: IEnvVariables) => {
  const paths: IBuildPaths = {
    entry: path.resolve(__dirname, 'src',  'index.tsx'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    output: path.resolve(__dirname, 'build'),
    src: path.resolve(__dirname, 'src'),
    public: path.resolve(__dirname, 'public')
  }
  
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? 'development',
    port: env.port ?? 3002,
    paths,
    analyzer: env.analyzer,
    platform: env.platform ?? 'desktop'
  })

  config.plugins.push(new webpack.container.ModuleFederationPlugin({
    name: 'admin',
    filename: 'remoteEntry.js',
    exposes: {
      './Router': './src/router/Router.tsx'
    },
    shared: {
      ...packageJson.dependencies,
      react: {
        eager: true,
        requiredVersion: packageJson.dependencies['react']
      },
      'react-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-dom']
      },
      'react-router-dom': {
        eager: true,
        requiredVersion: packageJson.dependencies['react-router-dom']
      }
    }
  }))

  return config
}