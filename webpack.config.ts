import { resolve } from 'path';
import { Configuration } from 'webpack';
import * as CopyPlugin from 'copy-webpack-plugin';


export const configuration: Configuration = {
    mode: 'development',
    entry: {
        index: './src/client/index.ts'
    },
    output: {
        path: resolve(__dirname, 'dist/public'),
        filename: 'index.js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ]
    },
    resolve:{
        extensions: [ '.tsx', '.ts', '.js' ]
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: resolve(__dirname, 'src/client', 'index.css'), to: resolve(__dirname, 'dist/public/index.css')
                }
            ]
        })
    ]
};