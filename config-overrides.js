const path = require('path');
const { addWebpackAlias, useBabelRc } = require('customize-cra');

module.exports = function override(config) {
    config = addWebpackAlias({
        ['~actions']: path.resolve(__dirname, 'src', 'store', 'actions'),
        ['~common']: path.resolve(__dirname, 'src', 'view', 'components', 'common'),
        ['~components']: path.resolve(__dirname, 'src', 'view', 'components'),
        ['~models']: path.resolve(__dirname, 'src', 'models'),
        ['~pages']: path.resolve(__dirname, 'src', 'view', 'containers', 'pages'),
        ['~reducers']: path.resolve(__dirname, 'src', 'store', 'reducers'),
        ['~routing']: path.resolve(__dirname, 'src', 'routing'),
        ['~modules']: path.resolve(__dirname, 'src', 'modules'),
        ['~store']: path.resolve(__dirname, 'src', 'store'),
        ['~form']: path.resolve(__dirname, 'src', 'view', 'form'),
        ['~utils']: path.resolve(__dirname, 'src', 'utils'),
    })(config);

    useBabelRc();
    return config
};
