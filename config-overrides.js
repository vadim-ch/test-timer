const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const webpack = require('webpack');
const pkgJson = require('./package');

module.exports = function override(config, env) {
    const isProduction = process.env.NODE_ENV === 'production';
    config = {
        ...config,
        devtool: isProduction ? 'hidden-source-map' : 'source-map',
        plugins: [
            ...config.plugins,
            isProduction ? new SentryWebpackPlugin({
                release: `react@${pkgJson.version}`,
                include: './build',
                ignoreFile: '.sentrycliignore',
                ignore: ['node_modules', 'webpack.config.js'],
                urlPrefix: process.env.URL_PREFIX ? process.env.URL_PREFIX : '~/',
                // dryRun: true,
                // configFile: 'sentry.properties'
            }) : [],
            new webpack.DefinePlugin({
                __VERSION__: JSON.stringify(pkgJson.version),
            })
        ]
    };
    return config;
};
