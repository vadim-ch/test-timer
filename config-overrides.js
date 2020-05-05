const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const webpack = require('webpack');
const pkgJson = require('./package');

module.exports = function override(config, env) {
    config = {
        ...config,
        devtool: 'hidden-source-map',
        plugins: [
            ...config.plugins,
            new SentryWebpackPlugin({
                release: `react@${pkgJson.version}`,
                include: '~/build',
                ignoreFile: '.sentrycliignore',
                ignore: ['node_modules', 'webpack.config.js'],
                // urlPrefix: '~/static/js',
                // dryRun: true,
                // configFile: 'sentry.properties'
            }),
            new webpack.DefinePlugin({
                __VERSION__: JSON.stringify(pkgJson.version),
            })
        ]
    };
    return config;
};
